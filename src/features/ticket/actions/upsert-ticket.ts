"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  ActionState,
  formErrorToActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

const upsertTicketSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(191),
  content: z.string().min(1, { message: "Content is required" }).max(1024),
});

export const upsertTicket = async (
  id: string | undefined,
  _actionState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  try {
    const data = upsertTicketSchema.parse({
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    });

    await prisma.ticket.upsert({
      where: { id: id || "" },
      create: data,
      update: data,
    });
  } catch (error) {
    return formErrorToActionState(error, formData);
  }

  revalidatePath(ticketsPath());

  if (id) {
    redirect(ticketsPath());
  }

  return { message: "Ticket created", fieldErrors: {} };
};
