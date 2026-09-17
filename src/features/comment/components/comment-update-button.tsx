"use client";

import { LucideEdit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateComment } from "../actions/update-comment";
import { useCommentUpdateFormDialog } from "./comment-update-form-dialog";

type CommentUpdateButtonProps = {
  id: string;
  content: string;
};

const CommentUpdateButton = ({ id, content }: CommentUpdateButtonProps) => {
  const [updateButton, updateDialog] = useCommentUpdateFormDialog({
    action: updateComment.bind(null, id),
    defaultValue: content,
    trigger: (
      <Button variant="outline" size="icon">
        <LucideEdit className="w-4 h-4" />
      </Button>
    ),
  });

  return (
    <>
      {updateButton}
      {updateDialog}
    </>
  );
};

export { CommentUpdateButton };
