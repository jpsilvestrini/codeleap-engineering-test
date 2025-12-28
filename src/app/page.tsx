import { MainSection } from "@/components/main-section";

export default function Home() {
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
