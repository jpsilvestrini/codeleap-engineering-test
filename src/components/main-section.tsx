"use client";

import { PostForm } from "./forms/post-form";
import { PostList } from "./posts/list";

export function MainSection() {
  return (
    <div className="flex flex-col w-full gap-6 py-7 px-9">
      <div className="border rounded-2xl py-7 px-9 space-y-6">
        <h3 className="text-2xl font-bold">What’s on your mind?</h3>
        <PostForm />
        <PostList />
      </div>
    </div>
  );
}
