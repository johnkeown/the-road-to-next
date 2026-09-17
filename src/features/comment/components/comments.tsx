import { CardCompact } from "@/components/card-compact";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { CommentWithMetadata } from "../types";
import { CommentCreateForm } from "./comment-create-form";
import { CommentDeleteButton } from "./comment-delete-button";
import { CommentItem } from "./comment-item";
import { CommentUpdateButton } from "./comment-update-button";

type CommentsProps = {
  ticketId: string;
  comments?: CommentWithMetadata[];
};

const Comments = async ({ ticketId, comments = [] }: CommentsProps) => {
  const { user } = await getAuth();

  return (
    <div className="flex flex-col gap-y-8">
      <CardCompact
        title="Create Comment"
        description="A new comment will be created"
        content={<CommentCreateForm ticketId={ticketId} />}
      />

      <div className="flex flex-col gap-y-2 ml-8">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={[
              ...(isOwner(user, comment)
                ? [
                    <CommentDeleteButton key="0" id={comment.id} />,
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
    </div>
  );
};

export { Comments };
