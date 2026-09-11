import { SearchParams } from "@/features/ticket/search-params";
import { prisma } from "@/lib/prisma";

export const getTickets = async (
  userId: string | undefined,
  searchParams: SearchParams,
) => {
  return await prisma.ticket.findMany({
    where: {
      userId,
      ...(typeof searchParams.search === "string" && {
        title: {
          contains: searchParams.search,
          mode: "insensitive",
        },
      }),
    },
    orderBy: {
      ...(searchParams.sort === undefined && { createdAt: "desc" }),
      ...(searchParams.sort === "bounty" && { bounty: "desc" }),
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
};
