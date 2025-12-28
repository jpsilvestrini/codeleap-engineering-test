"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function DeleteModal({ postId }: { postId: number }) {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (postId: number) => {
      return fetch(`https://dev.codeleap.co.uk/careers/${postId}/`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list"] });

      toast.success("Post deleted successfully");
    },
  });

  function deletePost() {
    mutate(postId);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon-lg">
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="gap-10">
        <AlertDialogTitle>
          Are you sure you want to delete this item?
        </AlertDialogTitle>
        <AlertDialogDescription className="flex justify-end items-center gap-4">
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction
            asChild
            className="bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20"
            onClick={() => deletePost()}
          >
            <Button>Delete</Button>
          </AlertDialogAction>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
}
