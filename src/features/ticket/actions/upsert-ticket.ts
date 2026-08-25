"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { setCookieByKey } from "@/actions/cookies";
import {
  ActionState,
  formErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { toCent } from "@/utils/currency";

const upsertTicketSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(191),
  content: z.string().min(1, { message: "Content is required" }).max(1024),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Deadline is required"),
  bounty: z.coerce.number().positive({ message: "Bounty is required" }),
});

export const upsertTicket = async (
  id: string | undefined,
  _actionState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  try {
    const data = upsertTicketSchema.parse({
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      deadline: formData.get("deadline") as string,
      bounty: formData.get("bounty") as string,
    });

    const dbData = {
      ...data,
      bounty: toCent(Number(data.bounty)), // Convert dollars to cents
    };

    await prisma.ticket.upsert({
      where: { id: id || "" },
      create: dbData,
      update: dbData,
    });
  } catch (error) {
    return formErrorToActionState(error, formData);
  }

  revalidatePath(ticketsPath());

  if (id) {
    await setCookieByKey("toast", "Ticket updated");
    redirect(ticketsPath());
  }

  return toActionState("SUCCESS", "Ticket created");
};
