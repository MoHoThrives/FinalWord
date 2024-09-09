// import { Button } from "@/components/ui/button";
import Banner from "@/components/home/banner";
import Header from "@/components/home/header";
import { Dot } from "lucide-react";

export default function Home() {
  return (
    <main className="
    mx-auto w-full inset-0 h-full
    bg-[radial-gradient(#fdf5b7_1px), transparent_1px)]
    [background-size:16px_16px]">
      {/* <div className="bg-gradient-to-br from-yellow-300 via-white to-white"></div> */}
      <Header/>
      <Banner/>
      <div className="flex items-center justify-center">
        <Dot className="text-orange-400"></Dot>
        <Dot className="text-orange-400"></Dot>
        <Dot className="text-orange-400"></Dot>
      </div>
      { /* < HowItWorks/>
      <Divider/>
      <Pricing/>
      <Divider/>
      <Footer/> */}
    </main>
  );
}

// bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] 
//     from-red-200 via-yellow-200 to-yellow-300