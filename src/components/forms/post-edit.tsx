'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const FormSchema = z.object({
  title: z.string().min(5).max(30),
  content: z.string().min(10).max(500),
});

export function PostEdit({ setModalShow, postId }: { setModalShow: (show: boolean) => void; postId: number }) {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { title: "", content: "" },
  });

  const { mutate } = useMutation({
    mutationFn: async (values: z.infer<typeof FormSchema>) => {
      await fetch(`https://dev.codeleap.co.uk/careers/${postId}/`, {
        method: "PATCH",
        body: JSON.stringify({
          title: values.title,
          content: values.content,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["list"] });
      setModalShow(false)
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values);

    mutate(values);
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
          <Button type="button" onClick={() => setModalShow(false)}>Cancel</Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  )
}
