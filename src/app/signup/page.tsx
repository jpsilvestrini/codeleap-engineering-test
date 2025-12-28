import { SignUpForm } from "@/components/forms/signup-form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const jar = await cookies();
  const session = jar.get("session");

  if(session) return redirect("/")

  return (
    <main className="min-h-screen flex justify-center items-center">
      <div className="bg-white border border-[#CCCCCC] rounded-4xl space-y-6 w-full max-w-125 p-6">
        <h1 className="text-2xl font-bold">Welcome to CodeLeap network!</h1>
        <SignUpForm />
      </div>
    </main>
  );
}
