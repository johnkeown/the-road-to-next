"use client";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { CardCompact } from "@/components/card-compact";
import { PaginatedDataType } from "@/components/pagination/types/pagination";
import { getComments } from "../queries/get-comments";
import { CommentWithMetadata } from "../types";
import { CommentCreateForm } from "./comment-create-form";
import { CommentDeleteButton } from "./comment-delete-button";
import { CommentItem } from "./comment-item";
import { CommentUpdateButton } from "./comment-update-button";

type CommentCursor = {
  id: string;
  createdAt: number;
};

type CommentsProps = {
  ticketId: string;
  paginatedComments: PaginatedDataType<CommentWithMetadata, CommentCursor>;
};

const Comments = ({ ticketId, paginatedComments }: CommentsProps) => {
  const queryKey = ["comments", ticketId];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: queryKey,
      queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
      initialPageParam: undefined as CommentCursor | undefined,
      initialData: {
        pages: [
          {
            list: paginatedComments.list,
            metadata: paginatedComments.metadata,
          },
        ],
        pageParams: [undefined],
      },
      getNextPageParam: (lastPage) =>
        lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
    });

  const comments = data.pages.flatMap((page) => page.list);

  const queryClient = useQueryClient();

  const handleDeleteComment = () => queryClient.invalidateQueries({ queryKey });

  const handleCreateComment = () => queryClient.invalidateQueries({ queryKey });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  return (
    <div className="flex flex-col gap-y-8">
      <CardCompact
        title="Create Comment"
        description="A new comment will be created"
        content={
          <CommentCreateForm
            ticketId={ticketId}
            onCreateComment={handleCreateComment}
          />
        }
      />

      <div className="flex flex-col gap-y-2 ml-8">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={[
              ...(comment.isOwner
                ? [
                    <CommentDeleteButton
                      key="0"
                      id={comment.id}
                      onDeleteComment={handleDeleteComment}
                    />,
                    <CommentUpdateButton
                      key="1"
                      id={comment.id}
                      content={comment.content}
                    />,
                  ]
                : []),
            ]}
          />
        ))}
      </div>

      <div ref={ref}>
        {!hasNextPage && (
          <p className="text-right text-sx italic">No more comments.</p>
        )}
      </div>
    </div>
  );
};

export { Comments };
