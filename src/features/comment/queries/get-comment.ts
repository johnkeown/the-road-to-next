import { prisma } from "@/lib/prisma";

export const getComment = async (id: string) => {
  return await prisma.comment.findFirst({
    where: {
      id,
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
