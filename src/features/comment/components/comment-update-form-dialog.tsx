"use client";

import { cloneElement, useActionState, useState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import {
  ActionState,
  EMPTY_ACTION_STATE,
} from "@/components/form/utils/to-action-state";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";

type UseConfirmDialogProps = {
  action: (
    _actionState: ActionState,
    formData: FormData,
  ) => Promise<ActionState>;
  trigger: React.ReactElement<{ onClick?: () => void }>;
  defaultValue?: string;
};

const useCommentUpdateFormDialog = ({
  action,
  trigger,
  defaultValue = "",
}: UseConfirmDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const dialogTrigger = cloneElement(trigger, {
    onClick: () => setIsOpen((state) => !state),
  });

  const [actionState, formAction] = useActionState(action, EMPTY_ACTION_STATE);

  const handleSuccess = () => {
    setIsOpen(false);
  };

  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update Comment</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogAction asChild>
          <Form
            action={formAction}
            actionState={actionState}
            onSuccess={handleSuccess}
          >
            <Textarea
              name="content"
              placeholder="What's on your mind ..."
              defaultValue={defaultValue}
            />
            <FieldError actionState={actionState} name="content" />

            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <SubmitButton label="Update" />
          </Form>
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [dialogTrigger, dialog] as const;
};

export { useCommentUpdateFormDialog };
