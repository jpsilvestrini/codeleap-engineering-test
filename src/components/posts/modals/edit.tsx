"use client";

import { Edit } from "lucide-react";
import { useState } from "react";
import { PostEdit } from "@/components/forms/post-edit";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function EditModal({ postId }: { postId: number }) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Dialog modal={true} open={modalShow} onOpenChange={setModalShow}>
      <DialogTrigger asChild>
        <Button size="icon-lg">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit item</DialogTitle>
        <PostEdit postId={postId} setModalShow={setModalShow} />
      </DialogContent>
    </Dialog>
  );
}
