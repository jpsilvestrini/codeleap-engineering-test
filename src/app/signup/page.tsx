import { SignUpForm } from "@/components/forms/signup-form";

export default function Page() {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <div className="bg-white border border-[#CCCCCC] rounded-4xl space-y-6 w-full max-w-125 p-6">
        <h1 className="text-2xl font-bold">Welcome to CodeLeap network!</h1>
        <SignUpForm />
      </div>
    </main>
  );
}
