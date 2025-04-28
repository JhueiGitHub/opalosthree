// root/src/app/(website)/page.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Stars, Zap } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-5xl py-20">
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              OrionOS
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            A revolutionary browser-based operating system that transcends the boundaries of traditional computing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/docs">
              <Button className="bg-[#7320DD] hover:bg-[#7320DD]/80 text-white px-8 py-6 rounded-full text-lg flex items-center gap-2">
                Explore Documentation
                <ArrowRight size={20} />
              </Button>
            </Link>
            <Link href="/auth/sign-in">
              <Button variant="outline" className="border-[#7320DD] text-[#7320DD] px-8 py-6 rounded-full text-lg">
                Try It Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="w-full max-w-5xl py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20">
            <div className="w-12 h-12 bg-[#7320DD]/20 rounded-full flex items-center justify-center mb-4">
              <Stars className="text-[#7320DD]" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Flow System</h3>
            <p className="text-gray-400">
              A living design system with Core and Config Flows that act as electricity through crystal structures.
            </p>
          </div>
          
          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20">
            <div className="w-12 h-12 bg-[#7320DD]/20 rounded-full flex items-center justify-center mb-4">
              <Zap className="text-[#7320DD]" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Cosmos Architecture</h3>
            <p className="text-gray-400">
              Create isolated environments with shared resources through our nested universe structure.
            </p>
          </div>
          
          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20">
            <div className="w-12 h-12 bg-[#7320DD]/20 rounded-full flex items-center justify-center mb-4">
              <Globe className="text-[#7320DD]" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Community-Centric</h3>
            <p className="text-gray-400">
              Share and discover Flows in a vibrant ecosystem of creators and designers.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-5xl py-16">
        <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-900/30 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to explore the cosmos?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Dive into our comprehensive documentation to understand the architecture and design principles behind OrionOS.
          </p>
          <Link href="/docs">
            <Button className="bg-[#7320DD] hover:bg-[#7320DD]/80 text-white px-8 py-6 rounded-full text-lg">
              Read the Documentation
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}