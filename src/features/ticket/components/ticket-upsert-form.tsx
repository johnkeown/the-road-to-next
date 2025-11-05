"use client";

import { Ticket } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertTicket } from "../actions/upsert-ticket";
import { useTransition } from "react";
import { LucideLoaderCircle } from "lucide-react";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [isPending, startTransition] = useTransition();

  const upsertTicketAction = async (formData: FormData) => {
    startTransition(
      async () => await upsertTicket.bind(null, ticket?.id)(formData)
    );
  };

  return (
    <form action={upsertTicketAction} className="flex flex-col gap-y-2">
      <Label htmlFor="title">Title</Label>
      <Input
        type="text"
        id="title"
        name="title"
        defaultValue={ticket?.title}
        required
      />

      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        defaultValue={ticket?.content}
        required
      />

      <Button disabled={isPending} type="submit">
        {isPending && (
          <LucideLoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        )}
        {ticket ? "Edit" : "Create"}
      </Button>
    </form>
  );
};

export default TicketUpsertForm;
