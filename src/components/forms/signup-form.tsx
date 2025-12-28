"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  username: z
    .string()
    .min(2, { error: "Username must be between 2 and 12 characters" })
    .max(12, { error: "Username must be between 2 and 12 characters" }),
});

export function SignUpForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { username: "" },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values);

    redirect(`/api/signup?username=${values.username}`);
  };

  const username = form.watch("username");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[16px] font-normal">
                Please enter your username
              </FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-2.5">
          <Button
            disabled={!username}
            variant={!username ? "secondary" : "default"}
            type="submit"
          >
            ENTER
          </Button>
        </div>
      </form>
    </Form>
  );
}
