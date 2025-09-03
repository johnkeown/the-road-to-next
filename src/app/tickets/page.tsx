import { initialTickets } from "@/data";
import Heading from "@/components/heading";
import { TicketComponent } from "@/features/ticket/components/ticket-item";

const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets in one place" />
      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
        {initialTickets.map((ticket) => (
          <TicketComponent key={ticket.id} ticket={ticket} isDetail={false} />
        ))}
      </div>
    </div>
  );
};

export default TicketsPage;
