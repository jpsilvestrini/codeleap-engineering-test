'use client'

import { userStore } from "@/common/user";
import { MainSection } from "@/components/main-section";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const user = userStore();
  const router = useRouter();

  useEffect(() => {
    if (!user?.username) router.push("/signup");
  }, [user]);

  return (
    <main className="min-h-screen flex justify-center items-center">
      <div className="bg-white border border-[#CCCCCC] min-h-screen w-full max-w-200">
        <div className="py-7 px-9 bg-[#7695ec]">
          <h1 className="text-[22px] font-bold text-white">CodeLeap Network</h1>
        </div>
        <MainSection />
      </div>
    </main>
  );
}
