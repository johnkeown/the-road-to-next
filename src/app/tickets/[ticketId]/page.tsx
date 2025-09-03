import Placeholder from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { initialTickets } from "@/data";
import { TicketComponent } from "@/features/ticket/components/ticket-item";
import { ticketsPath } from "@/path";
import Link from "next/link";

type TicketPageProps = {
  params: {
    ticketId: string;
  };
};

const TicketsPage = ({ params }: TicketPageProps) => {
  const ticket = initialTickets.find((ticket) => ticket.id === params.ticketId);

  if (!ticket) {
    return (
      <Placeholder
        label="Ticket not found"
        button={
          <Button asChild variant="outline">
            <Link href={ticketsPath()}>Go to Tickets</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex justify-center animate-fade-from-top">
      <TicketComponent ticket={ticket} isDetail={true} />
    </div>
  );
};

export default TicketsPage;
