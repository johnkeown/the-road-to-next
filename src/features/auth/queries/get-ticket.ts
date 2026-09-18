import { prisma } from "@/lib/prisma";
import { isOwner } from "../utils/is-owner";
import { getAuth } from "./get-auth";

export const getTicket = async (id: string) => {
  const { user } = await getAuth();

  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  if (!ticket) {
    return null;
  }

  return { ...ticket, isOwner: isOwner(user, ticket) };
};
