"use client";

import { userStore } from "@/common/user";
import { cacheOptions, getData } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

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
  const user = userStore();
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
            {user?.username === post.username && (
              <button className="bg-white text-[#7695EC] font-bold text-lg rounded-full px-4 py-2">Edit</button>
            )}
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-[#777777] font-bold text-lg">@{post.username}</p>
              <span className="text-[#777777] text-lg font-normal">{new Date(post.created_datetime).toString()}</span>
            </div>
            <p className="text-lg font-normal">{post.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
