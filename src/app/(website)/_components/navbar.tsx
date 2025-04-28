// root/src/app/(website)/_components/navbar.tsx

import { Button } from "@/components/ui/button";
import { Book, Menu, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import React from "react";

const LandingPageNavBar = () => {
  return (
    <div className="flex w-full justify-between items-center">
      <div className="text-3xl font-semibold flex items-center gap-x-3">
        <Menu className="w-8 h-8" />
        <Image alt="logo" src="/system/stallion.png" width={40} height={40} />
        Opal
      </div>
      <div className="hidden gap-x-10 items-center lg:flex">
        <Link
          href="/"
          className="py-2 px-5 font-semibold text-lg rounded-full hover:bg-gray-800/10"
        >
          Home
        </Link>
        <Link 
          href="/docs"
          className="bg-[#7320DD] py-2 px-5 font-semibold text-lg rounded-full hover:bg-[#7320DD]/80 flex items-center gap-2"
        >
          <Book size={18} />
          Documentation
        </Link>
        <Link href="/">Pricing</Link>
        <Link href="/">Contact</Link>
      </div>
      <Link href="/auth/sign-in">
        <Button className="text-base flex gap-x-2">
          <User fill="#000" />
          Login
        </Button>
      </Link>
    </div>
  );
};

export default LandingPageNavBar;