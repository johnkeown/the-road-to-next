import * as z from "zod/v4";

export type ActionState = {
  message: string;
  payload?: FormData;
  fieldErrors: Record<string, string[] | undefined>;
};

export const formErrorToActionState = (
  error: unknown,
  formData?: FormData
): ActionState => {
  if (error instanceof z.ZodError) {
    return {
      message: "",
      fieldErrors: z.flattenError(error).fieldErrors,
      payload: formData,
    };
  } else if (error instanceof Error) {
    return { message: error.message, fieldErrors: {}, payload: formData };
  } else {
    return {
      message: "An unknown error occurred",
      fieldErrors: {},
      payload: formData,
    };
  }
};
