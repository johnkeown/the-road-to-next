import { Prisma } from "@prisma/client";

export type TicketStatus = "OPEN" | "DONE" | "IN_PROGRESS";

export type TicketWithMetadata = Prisma.TicketGetPayload<{
  include: {
    user: {
      select: {
        username: true;
      };
    };
  };
}> & { isOwner: boolean };
