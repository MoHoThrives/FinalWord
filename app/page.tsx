// import { Button } from "@/components/ui/button";
import BgGradient from "@/components/common/bg-gradient";
import Banner from "@/components/home/banner";
import Header from "@/components/home/header";
import HowItWorks from "@/components/home/howitworks";
import Pricing from "@/components/home/pricing";
import { Dot } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main
      className="
    mx-auto w-full inset-0 h-full
    bg-[radial-gradient(#fdf5b7_1px, transparent_1px)]
    [background-size:16px_16px]"
    >
      {/* <div className="bg-gradient-to-br from-yellow-300 via-white to-white"></div> */}
      <BgGradient />
      <Header />
      <Banner />
      <div className="flex items-center justify-center">
        <Dot className="text-orange-400"></Dot>
        <Dot className="text-orange-400"></Dot>
        <Dot className="text-orange-400"></Dot>
      </div>
      <HowItWorks />
      <div className="flex items-center justify-center">
        <Dot className="text-orange-400"></Dot>
        <Dot className="text-orange-400"></Dot>
        <Dot className="text-orange-400"></Dot>
      </div>
      <Pricing />
      <div className="flex items-center justify-center">
        <Dot className="text-orange-400"></Dot>
        <Dot className="text-orange-400"></Dot>
        <Dot className="text-orange-400"></Dot>
      </div>
      <footer className="bg-gray-200/20 flex h-20 py-24 px-12 z-20 relative overflow-hidden">
        <p>All rights reserved {new Date().getFullYear()}</p>
        <p className="flex lg:justify-end lg:flex-1"><a href="https://mohanad.dev" target="_blank">Built by Mohanad 👨‍💻</a></p>
      </footer>
    </main>
  );
}
