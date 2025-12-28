import z from "zod";

export const PostFormSchema = z.object({
  title: z
    .string()
    .min(5, { error: "Title must be between 5 and 30 characters" })
    .max(30, { message: "Title must be between 5 and 30 characters" }),
  content: z
    .string()
    .min(10, { error: "Content must be between 10 and 500 characters" })
    .max(500, { message: "Content must be between 10 and 500 characters" }),
});
