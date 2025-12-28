"use client";

import { cacheOptions, getData } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "next-client-cookies";
import DeleteModal from "./modals/delete";
import EditModal from "./modals/edit";

interface Post {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    id: number;
    username: string;
    created_datetime: Date;
    title: string;
    content: string;
  }[];
}

export function PostList() {
  const cookies = useCookies();
  const user = cookies.get("session");

  const { data, isLoading, error } = useQuery<Post>({
    queryFn: () => getData(),
    queryKey: ["list"],
    ...cacheOptions,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data?.results.map((post) => (
        <div
          key={post.id}
          className="border border-[#999999] rounded-2xl space-y-6"
        >
          <div className="bg-[#7695EC] p-6 rounded-t-2xl flex justify-between items-center">
            <h1 className="text-white font-bold text-[22px]">{post.title}</h1>
            {user === post.username && (
              <div className="flex gap-2 items-center">
                <DeleteModal postId={post.id} />
                <EditModal postId={post.id} />
              </div>
            )}
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-[#777777] font-bold text-lg">
                @{post.username}
              </p>
              <span className="text-[#777777] text-lg font-normal">
                {timeAgo(new Date(post.created_datetime))}
              </span>
            </div>
            <p className="text-lg font-normal">{post.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function timeAgo(date: Date | string): string {
  const now = new Date();
  const past = typeof date === "string" ? new Date(date) : date;

  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} second${diffInSeconds !== 1 ? "s" : ""} ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
}
