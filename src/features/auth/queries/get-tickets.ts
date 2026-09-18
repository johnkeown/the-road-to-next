import { Prisma } from "@prisma/client";
import { ParsedSearchParams } from "@/features/ticket/search-params";
import { prisma } from "@/lib/prisma";
import { isOwner } from "../utils/is-owner";
import { getAuth } from "./get-auth";

export const getTickets = async (
  userId: string | undefined,
  searchParams: ParsedSearchParams,
) => {
  const { user } = await getAuth();

  const where: Prisma.TicketWhereInput = {
    userId,
    title: {
      contains: searchParams.search,
      mode: "insensitive",
    },
  };

  const skip = searchParams.page * searchParams.size;
  const take = searchParams.size;

  const [tickets, count] = await prisma.$transaction([
    prisma.ticket.findMany({
      where,
      skip,
      take,
      orderBy: {
        [searchParams.sortKey]: searchParams.sortValue,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    }),
    prisma.ticket.count({
      where,
    }),
  ]);

  return {
    list: tickets.map((ticket) => ({
      ...ticket,
      isOwner: isOwner(user, ticket),
    })),
    metadata: {
      count,
      hasNextPage: count > skip + take,
    },
  };
};
