import * as z from "zod/v4";

export type ActionState = { message: string; payload?: FormData };

export const fromErrorToActionState = (
  error: unknown,
  formData?: FormData
): ActionState => {
  if (error instanceof z.ZodError) {
    return { message: error.issues[0].message, payload: formData };
  } else if (error instanceof Error) {
    return { message: error.message, payload: formData };
  } else {
    return { message: "An unknown error occurred", payload: formData };
  }
};
