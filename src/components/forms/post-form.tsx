"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "next-client-cookies";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { PostFormSchema } from "./post-form.schema";

export function PostForm() {
  const cookies = useCookies();
  const user = cookies.get("session");
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof PostFormSchema>>({
    resolver: zodResolver(PostFormSchema),
    defaultValues: { title: "", content: "" },
  });

  const title = form.watch("title");
  const content = form.watch("content");

  const { mutate } = useMutation({
    mutationFn: (values: z.infer<typeof PostFormSchema>) => {
      return fetch("https://dev.codeleap.co.uk/careers/", {
        method: "POST",
        body: JSON.stringify({
          username: user,
          title: values.title,
          content: values.content,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list"] });

      toast.success("Post created successfully");
    },
  });

  const onSubmit = (values: z.infer<typeof PostFormSchema>) => {
    console.log(values);

    mutate(values);

    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[16px] font-normal">Title</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[16px] font-normal">Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your content here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-2.5">
          <Button
            type="submit"
            disabled={!title || !content}
            variant={!title || !content ? "secondary" : "default"}
          >
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}
