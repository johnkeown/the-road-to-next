import Placeholder from "@/components/placeholder";
import { getTickets } from "../../auth/queries/get-tickets";
import { ParsedSearchParams } from "../search-params";
import { TicketItem } from "./ticket-item";
import { TicketPagination } from "./ticket-pagination";
import { TicketSearchInput } from "./ticket-search-input";
import { TicketSortSelect } from "./ticket-sort-select";

type TicketListProps = {
  userId?: string;
  searchParams: ParsedSearchParams;
};

const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const { list: tickets, metadata: ticketMetadata } = await getTickets(
    userId,
    searchParams,
  );

  return (
    <div className="flex-1 flex flex-col self-center gap-y-4 animate-fade-from-top">
      <div className="flex w-full max-w-[420px] gap-2">
        <TicketSearchInput placeholder="Search tickets ..." />
        <TicketSortSelect
          options={[
            { sortKey: "createdAt", sortValue: "desc", label: "Newest" },
            { sortKey: "createdAt", sortValue: "asc", label: "Oldest" },
            { sortKey: "bounty", sortValue: "desc", label: "Bounty" },
          ]}
        />
      </div>

      {tickets.length ? (
        tickets.map((ticket) => (
          <TicketItem
            key={ticket.id}
            ticket={ticket}
            isDetail={false}
            comments={null}
          />
        ))
      ) : (
        <Placeholder label="No tickets found" />
      )}
      <div className="w-full max-w-[420px]">
        <TicketPagination paginatedTicketMetadata={ticketMetadata} />
      </div>
    </div>
  );
};

export { TicketList };
