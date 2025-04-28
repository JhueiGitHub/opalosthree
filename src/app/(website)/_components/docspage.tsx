"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  FolderGit,
  Menu,
  Moon,
  Search,
  SunMoon,
  X,
  Star,
  Code,
  FileText,
  Database,
  Users,
  Monitor,
  Layers,
  Settings,
  BookOpen,
  Terminal,
  ExternalLink,
  Zap,
  Globe,
  PanelRight,
} from "lucide-react";

const DocsPage = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [animateCosmos, setAnimateCosmos] = useState(false);

  useEffect(() => {
    // Start cosmos animation after initial render
    setAnimateCosmos(true);

    // Handle deep linking from URL
    const hash = window.location.hash.replace("#", "");
    if (hash && navItems.some((item) => item.id === hash)) {
      setActiveSection(hash);
      // Scroll to section with smooth behavior
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navItems = [
    { id: "introduction", label: "Introduction", icon: <BookOpen size={18} /> },
    { id: "architecture", label: "Architecture", icon: <Layers size={18} /> },
    { id: "flow-system", label: "Flow System", icon: <Code size={18} /> },
    {
      id: "cosmos",
      label: "Cosmos & Constellations",
      icon: <Star size={18} />,
    },
    {
      id: "getting-started",
      label: "Getting Started",
      icon: <Terminal size={18} />,
    },
    {
      id: "prisma-schema",
      label: "Prisma Schema",
      icon: <Database size={18} />,
    },
    { id: "data-models", label: "Data Models", icon: <FileText size={18} /> },
    {
      id: "user-generation",
      label: "User Generation",
      icon: <Users size={18} />,
    },
    { id: "examples", label: "Flow Examples", icon: <Monitor size={18} /> },
    { id: "community", label: "Community", icon: <Globe size={18} /> },
  ];

  // Helper to create code blocks with syntax highlighting
  const CodeBlock = ({ children, language = "typescript" }) => (
    <div className="bg-gray-900 rounded-lg p-4 my-4 overflow-x-auto shadow-inner shadow-black/50">
      <pre className="text-gray-300 text-sm font-mono">{children}</pre>
    </div>
  );

  // Update URL when section changes
  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    window.history.pushState(null, null, `#${sectionId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-50 ${
          isDarkMode
            ? "bg-black/80 border-gray-800"
            : "bg-white/80 border-gray-200"
        } border-b backdrop-blur-xl px-4 py-3 flex justify-between items-center`}
      >
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu
              className={`w-6 h-6 ${isDarkMode ? "text-white" : "text-black"}`}
            />
          </motion.button>
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ rotate: 0 }}
              animate={animateCosmos ? { rotate: 360 } : {}}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="bg-purple-600 rounded-full w-8 h-8 flex items-center justify-center"
            >
              <div className="bg-black w-2 h-2 rounded-full absolute"></div>
              <div className="border border-white/30 w-6 h-6 rounded-full"></div>
            </motion.div>
            <h1 className="text-xl font-bold">OrionOS</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSearchOpen(true)}
            className={`p-2 rounded-full ${
              isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
            }`}
          >
            <Search className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${
              isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
            }`}
          >
            {isDarkMode ? (
              <SunMoon className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/orion-os/orionos"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full ${
              isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
            }`}
          >
            <FolderGit className="w-5 h-5" />
          </motion.a>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            <motion.div
              className={`absolute top-0 left-0 bottom-0 w-64 ${
                isDarkMode ? "bg-gray-900" : "bg-white"
              } p-4`}
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-lg">OrionOS Docs</h2>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav>
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          handleSectionChange(item.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 transition-colors ${
                          activeSection === item.id
                            ? isDarkMode
                              ? "bg-purple-700/20 text-purple-400"
                              : "bg-purple-100 text-purple-800"
                            : isDarkMode
                            ? "hover:bg-gray-800"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {item.icon}
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center pt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsSearchOpen(false)}
            ></div>
            <motion.div
              className={`relative w-full max-w-2xl mx-4 ${
                isDarkMode ? "bg-gray-900" : "bg-white"
              } rounded-xl shadow-2xl overflow-hidden`}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="flex items-center p-4">
                <Search className="w-5 h-5 mr-3 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className={`w-full border-none outline-none bg-transparent ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                  autoFocus
                />
                <button onClick={() => setIsSearchOpen(false)}>
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div
                className={`p-4 border-t ${
                  isDarkMode ? "border-gray-800" : "border-gray-200"
                }`}
              >
                <p className="text-sm text-gray-500">No recent searches</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside
          className={`w-64 hidden lg:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-6 ${
            isDarkMode ? "bg-black border-gray-800" : "bg-white border-gray-200"
          } border-r`}
        >
          <nav>
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleSectionChange(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                      activeSection === item.id
                        ? isDarkMode
                          ? "bg-purple-700/20 text-purple-400"
                          : "bg-purple-100 text-purple-800"
                        : isDarkMode
                        ? "hover:bg-gray-800/50"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 max-w-4xl mx-auto py-10 px-4 lg:px-8">
          {activeSection === "introduction" && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-3">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                  OrionOS
                </h1>
                <p className="text-xl text-gray-400">
                  A revolutionary browser-based operating system that transcends
                  the boundaries of traditional computing.
                </p>
              </div>

              <div
                className={`p-6 rounded-xl ${
                  isDarkMode ? "bg-gray-900" : "bg-gray-100"
                }`}
              >
                <h2 className="text-2xl font-bold mb-4">
                  Oriental. Anonymous. OS.
                </h2>
                <p className="text-gray-400 mb-4">
                  OrionOS reimagines what an operating system can be by creating
                  a living, breathing cosmic entity where design, function, and
                  community converge in perfect harmony.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div
                    className={`p-4 rounded-lg ${
                      isDarkMode ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    <h3 className="font-bold mb-2">Stunning Visuals</h3>
                    <p className="text-sm text-gray-400">
                      Experience breathtaking dynamic wallpapers and fluid
                      interfaces inspired by Oriental aesthetics.
                    </p>
                  </div>
                  <div
                    className={`p-4 rounded-lg ${
                      isDarkMode ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    <h3 className="font-bold mb-2">Community-Centric</h3>
                    <p className="text-sm text-gray-400">
                      Share and discover themes, flows, and customizations in a
                      vibrant ecosystem.
                    </p>
                  </div>
                  <div
                    className={`p-4 rounded-lg ${
                      isDarkMode ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    <h3 className="font-bold mb-2">In Your Browser</h3>
                    <p className="text-sm text-gray-400">
                      Access your complete computing environment from any device
                      with zero installation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <h2
                  className={`text-2xl font-bold mb-4 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  The Vision
                </h2>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  OrionOS was born from a simple yet ambitious question: What if
                  your operating system was as fluid and dynamic as the universe
                  itself?
                </p>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  We've created a system where every element—from wallpapers to
                  application windows—is part of an interconnected cosmic design
                  system, flowing like electricity through crystal structures.
                </p>

                <h2
                  className={`text-2xl font-bold mt-8 mb-4 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  The Problem We Solve
                </h2>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Traditional operating systems are static, rigid, and isolated.
                  You buy a beautiful black MacBook only to use a generic, white
                  interface that offers minimal customization.
                </p>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  OrionOS transforms this paradigm by offering:
                </p>
                <ul
                  className={`list-disc pl-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <li>A living design system that evolves with your needs</li>
                  <li>Isolated environments without duplicating resources</li>
                  <li>Community-driven customization that respects privacy</li>
                  <li>
                    A cohesive computing experience across all your devices
                  </li>
                </ul>

                <h2
                  className={`text-2xl font-bold mt-8 mb-4 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Where We're Going
                </h2>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  OrionOS isn't just a new operating system—it's a new way of
                  thinking about computing itself. A universe within reach,
                  waiting to be explored.
                </p>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Join us on this journey to redefine what's possible in the
                  digital realm.
                </p>
              </div>

              <div
                className={`p-6 rounded-xl bg-gradient-to-br ${
                  isDarkMode
                    ? "from-purple-900/20 to-blue-900/20 border border-purple-900/30"
                    : "from-purple-50 to-blue-50 border border-purple-100"
                }`}
              >
                <h2 className="text-xl font-semibold mb-4">
                  Experience the Power
                </h2>
                <div className="aspect-video rounded-lg overflow-hidden relative mb-4 bg-black">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2/3 h-2/3 rounded-full bg-purple-900/20 animate-pulse flex items-center justify-center">
                      <div className="w-1/2 h-1/2 rounded-full bg-purple-900/40 animate-pulse flex items-center justify-center">
                        <div className="w-8 h-16 bg-purple-600 rounded-full animate-[spin_8s_linear_infinite]"></div>
                      </div>
                    </div>
                    <div className="absolute inset-0 backdrop-blur-sm"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">Ready to begin?</h3>
                    <p className="text-sm text-gray-400">
                      Dive into the cosmic OS experience
                    </p>
                  </div>
                  <button
                    onClick={() => handleSectionChange("getting-started")}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center gap-2"
                  >
                    Get Started
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "architecture" && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-3">
                <h1 className="text-3xl font-bold">System Architecture</h1>
                <p className="text-xl text-gray-400">
                  Understanding the cosmic structure of OrionOS.
                </p>
              </div>

              <div
                className={`p-6 rounded-xl ${
                  isDarkMode
                    ? "bg-gray-900/50 border border-gray-800"
                    : "bg-gray-100"
                }`}
              >
                <h2 className="text-xl font-semibold mb-4">
                  The Cosmic Hierarchy
                </h2>
                <div className="overflow-x-auto">
                  <div className="min-w-max">
                    <div
                      className={`grid grid-cols-4 gap-4 p-4 rounded-lg mb-4 ${
                        isDarkMode ? "bg-black" : "bg-white"
                      }`}
                    >
                      <div className="text-center">
                        <div className="h-16 w-16 mx-auto rounded-full bg-purple-600 flex items-center justify-center mb-2">
                          <span className="text-xl font-bold">U</span>
                        </div>
                        <p className="font-semibold">User</p>
                      </div>
                      <div className="text-center">
                        <div className="h-16 w-16 mx-auto rounded-full bg-blue-600 flex items-center justify-center mb-2">
                          <span className="text-xl font-bold">C</span>
                        </div>
                        <p className="font-semibold">Cosmos</p>
                      </div>
                      <div className="text-center">
                        <div className="h-16 w-16 mx-auto rounded-full bg-teal-600 flex items-center justify-center mb-2">
                          <span className="text-xl font-bold">CN</span>
                        </div>
                        <p className="font-semibold">Constellation</p>
                      </div>
                      <div className="text-center">
                        <div className="h-16 w-16 mx-auto rounded-full bg-red-600 flex items-center justify-center mb-2">
                          <span className="text-xl font-bold">F</span>
                        </div>
                        <p className="font-semibold">Flow</p>
                      </div>
                    </div>

                    <div
                      className={`p-4 rounded-lg ${
                        isDarkMode ? "bg-gray-900" : "bg-gray-200"
                      }`}
                    >
                      <div className="flex items-center mb-3">
                        <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center mr-3">
                          <span className="text-sm font-bold">U</span>
                        </div>
                        <div>
                          <h3 className="font-bold">User</h3>
                          <p className="text-sm text-gray-400">
                            The account owner who can have multiple Cosmos
                          </p>
                        </div>
                      </div>

                      <div className="ml-8 pl-4 border-l-2 border-dashed border-gray-700">
                        <div className="flex items-center mb-3 mt-3">
                          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                            <span className="text-sm font-bold">C</span>
                          </div>
                          <div>
                            <h3 className="font-bold">Cosmos</h3>
                            <p className="text-sm text-gray-400">
                              Isolated workspace environment with its own
                              resources
                            </p>
                          </div>
                        </div>

                        <div className="ml-8 pl-4 border-l-2 border-dashed border-gray-700">
                          <div className="grid grid-cols-2 gap-4 mt-3">
                            <div>
                              <div className="flex items-center mb-3">
                                <div className="h-8 w-8 rounded-full bg-yellow-600 flex items-center justify-center mr-3">
                                  <span className="text-sm font-bold">SD</span>
                                </div>
                                <div>
                                  <h3 className="font-bold">Stellar Drive</h3>
                                  <p className="text-sm text-gray-400">
                                    File storage system
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center mb-3">
                                <div className="h-8 w-8 rounded-full bg-pink-600 flex items-center justify-center mr-3">
                                  <span className="text-sm font-bold">AD</span>
                                </div>
                                <div>
                                  <h3 className="font-bold">Aura Drive</h3>
                                  <p className="text-sm text-gray-400">
                                    Design system storage
                                  </p>
                                </div>
                              </div>

                              <div className="ml-8 pl-4 border-l-2 border-dashed border-gray-700">
                                <div className="flex items-center mb-3 mt-3">
                                  <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center mr-3">
                                    <span className="text-sm font-bold">
                                      AU
                                    </span>
                                  </div>
                                  <div>
                                    <h3 className="font-bold">Aurora</h3>
                                    <p className="text-sm text-gray-400">
                                      Thematic grouping
                                    </p>
                                  </div>
                                </div>

                                <div className="ml-8 pl-4 border-l-2 border-dashed border-gray-700">
                                  <div className="flex items-center mb-3 mt-3">
                                    <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center mr-3">
                                      <span className="text-sm font-bold">
                                        F
                                      </span>
                                    </div>
                                    <div>
                                      <h3 className="font-bold">Flow</h3>
                                      <p className="text-sm text-gray-400">
                                        Design system definition
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center mb-3">
                                <div className="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center mr-3">
                                  <span className="text-sm font-bold">CN</span>
                                </div>
                                <div>
                                  <h3 className="font-bold">Constellation</h3>
                                  <p className="text-sm text-gray-400">
                                    Environment instance
                                  </p>
                                </div>
                              </div>

                              <div className="ml-8 pl-4 border-l-2 border-dashed border-gray-700">
                                <div className="flex items-center mb-3 mt-3">
                                  <div className="h-8 w-8 rounded-full bg-amber-600 flex items-center justify-center mr-3">
                                    <span className="text-sm font-bold">
                                      AM
                                    </span>
                                  </div>
                                  <div>
                                    <h3 className="font-bold">
                                      Active Mappings
                                    </h3>
                                    <p className="text-sm text-gray-400">
                                      Flow references
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <h2
                  className={`text-2xl font-bold mb-4 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Architectural Key Concepts
                </h2>

                <h3
                  className={`text-xl font-bold mt-6 mb-3 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Isolation Through Nesting
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  OrionOS creates perfect isolation through a nested universe
                  structure. Each Cosmos is a completely isolated environment
                  with its own storage systems, while sharing the core engine
                  infrastructure.
                </p>

                <h3
                  className={`text-xl font-bold mt-6 mb-3 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Constellations as Environment Instances
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Constellations act as living crystals that store the state of
                  your environment. They don't contain data themselves—they're
                  mappings to active Flows that define the visual and functional
                  aspects of your workspace.
                </p>

                <h3
                  className={`text-xl font-bold mt-6 mb-3 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  The Two-Drive System
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Each Cosmos contains two specialized drives:
                </p>
                <ul
                  className={`list-disc pl-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <li>
                    <strong>Stellar Drive:</strong> Stores files, media, and
                    documents
                  </li>
                  <li>
                    <strong>Aura Drive:</strong> Stores design system components
                    organized into Auroras
                  </li>
                </ul>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  This separation creates a clean distinction between content
                  and presentation.
                </p>

                <h3
                  className={`text-xl font-bold mt-6 mb-3 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  The Celestial Engine
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  At the core of OrionOS is the Celestial Engine, which manages:
                </p>
                <ul
                  className={`list-disc pl-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <li>Cosmos isolation and switching</li>
                  <li>File system operations via the Stellar Manager</li>
                  <li>Design system compilation via the Aura Manager</li>
                  <li>Environment state via the Constellation Manager</li>
                </ul>
              </div>
            </motion.div>
          )}

          {activeSection === "flow-system" && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-3">
                <h1 className="text-3xl font-bold">The Flow System</h1>
                <p className="text-xl text-gray-400">
                  Electricity through crystals: OrionOS's living design system.
                </p>
              </div>

              <div
                className={`p-6 rounded-xl ${
                  isDarkMode
                    ? "bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-900/30"
                    : "bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100"
                }`}
              >
                <h2 className="text-xl font-semibold mb-4">
                  Flow Crystal Structure
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div
                    className={`p-4 rounded-lg ${
                      isDarkMode ? "bg-gray-900" : "bg-white"
                    } shadow-lg`}
                  >
                    <h3 className="font-bold mb-2">Core Flow</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Defines fundamental design tokens that can be referenced
                      by Config Flows
                    </p>
                    <div
                      className={`p-3 rounded ${
                        isDarkMode ? "bg-black" : "bg-gray-100"
                      }`}
                    >
                      <pre className="text-xs overflow-x-auto font-mono">
                        {`{
  "meta": {
    "id": "stellar-dark",
    "type": "core",
    "name": "Stellar Dark"
  },
  "flowSystem": {
    "colors": {
      "black": "#000000",
      "black-thick": "#000000 81%",
      "accent": "#7320DD",
      "text": {
        "primary": "#FFFFFF",
        "secondary": "#AAAAAA"
      }
    },
    "typography": {
      "heading": "Geist, sans-serif",
      "body": "Inter, sans-serif"
    },
    "spacing": {
      "sm": "0.5rem",
      "md": "1rem",
      "lg": "2rem"
    }
  },
  "flowStars": {
    // Component definitions
  }
}`}
                      </pre>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-lg ${
                      isDarkMode ? "bg-gray-900" : "bg-white"
                    } shadow-lg`}
                  >
                    <h3 className="font-bold mb-2">Config Flow</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Maps UI components to Core Flow tokens
                    </p>
                    <div
                      className={`p-3 rounded ${
                        isDarkMode ? "bg-black" : "bg-gray-100"
                      }`}
                    >
                      <pre className="text-xs overflow-x-auto font-mono">
                        {`{
  "meta": {
    "id": "orion-default",
    "type": "config",
    "name": "Orion Default"
  },
  "flowStars": {
    "wallpaper": {
      "background": "colors.black",
      "blur": "0px"
    },
    "window": {
      "background": "colors.black-thick",
      "borderColor": "colors.accent",
      "titleFont": "typography.heading"
    },
    "dock": {
      "background": "colors.black-thick",
      "borderColor": "colors.accent"
    }
  }
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <h2
                  className={`text-2xl font-bold mb-4 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  How the Flow System Works
                </h2>

                <h3
                  className={`text-xl font-bold mt-6 mb-3 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  The Double-Layer Approach
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  The genius of the Flow system lies in its two-layer
                  architecture:
                </p>
                <ol
                  className={`list-decimal pl-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <li>
                    <strong>Core Flows</strong> define reusable design tokens
                    (colors, typography, spacing, etc.)
                  </li>
                  <li>
                    <strong>Config Flows</strong> map component properties to
                    Core Flow tokens
                  </li>
                </ol>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  This creates a layer of indirection that allows for powerful
                  theming with minimal effort.
                </p>

                <h3
                  className={`text-xl font-bold mt-6 mb-3 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  FlowStars: Design in Space
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  In the Flow Editor, designers create FlowStars (previously
                  called FlowDrops)—component definitions that exist in a
                  universe canvas rather than a traditional design canvas. Each
                  FlowStar can reference design tokens from the Core Flow.
                </p>

                <h3
                  className={`text-xl font-bold mt-6 mb-3 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Runtime Compilation
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  When a user switches to a Constellation, the Flow Engine:
                </p>
                <ol
                  className={`list-decimal pl-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <li>Loads the active Core Flow and Config Flow</li>
                  <li>
                    Compiles the Config Flow by resolving token references to
                    actual values
                  </li>
                  <li>Creates CSS variables for global tokens</li>
                  <li>
                    Provides component-specific styles to Flow-aware components
                  </li>
                </ol>

                <h3
                  className={`text-xl font-bold mt-6 mb-3 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Media Integration
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  The Flow system elegantly handles media (images, videos) by:
                </p>
                <ul
                  className={`list-disc pl-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <li>Storing media files in the Stellar Drive</li>
                  <li>
                    Allowing Config Flows to reference media for components like
                    wallpapers
                  </li>
                  <li>
                    Supporting dynamic media swapping without changing the
                    underlying component structure
                  </li>
                </ul>

                <h3
                  className={`text-xl font-bold mt-6 mb-3 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Flow-Aware Components
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  The magic happens through Flow-aware components that:
                </p>
                <ul
                  className={`list-disc pl-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <li>
                    Connect to the Flow Provider via the <code>useCosmic</code>{" "}
                    hook
                  </li>
                  <li>Receive compiled styles based on their flowId</li>
                  <li>
                    Apply these styles as inline styles or Tailwind classes
                  </li>
                  <li>Update instantly when the active Flow changes</li>
                </ul>

                <div
                  className={`mt-6 p-4 rounded-lg ${
                    isDarkMode ? "bg-gray-900" : "bg-gray-100"
                  }`}
                >
                  <h4 className="font-bold mb-2">
                    Example Flow-Aware Component
                  </h4>
                  <CodeBlock>
                    {`// Flow-aware component example
import { useCosmic } from "@/contexts/CosmicProvider";

export const FlowComponent = ({ 
  flowId, 
  children,
  ...props 
}) => {
  // Get styles from the cosmic context
  const { styles } = useCosmic();
  
  // Get component-specific styles
  const componentStyles = styles[flowId] || {};
  
  return (
    <div style={componentStyles} {...props}>
      {children}
    </div>
  );
};`}
                  </CodeBlock>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "cosmos" && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-3">
                <h1 className="text-3xl font-bold">Cosmos & Constellations</h1>
                <p className="text-xl text-gray-400">
                  Creating isolated environments with shared resources.
                </p>
              </div>

              <div
                className={`p-6 rounded-xl ${
                  isDarkMode ? "bg-gray-900" : "bg-gray-100"
                }`}
              >
                <h2 className="text-xl font-semibold mb-4">
                  Environment Architecture
                </h2>
                <div className="relative">
                  <div
                    className={`p-4 rounded-lg mb-6 ${
                      isDarkMode ? "bg-black" : "bg-white"
                    }`}
                  >
                    <h3 className="font-bold mb-3">
                      Cosmos: Isolated Universes
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Each Cosmos is a fully isolated environment with its own
                      resources, permissions, and members.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        className={`p-3 rounded ${
                          isDarkMode ? "bg-gray-900" : "bg-gray-100"
                        }`}
                      >
                        <h4 className="font-semibold mb-2">Personal Cosmos</h4>
                        <ul className="text-sm space-y-1 text-gray-400">
                          <li>• Created automatically for new users</li>
                          <li>• Private storage and design system</li>
                          <li>• Cannot be shared with others</li>
                        </ul>
                      </div>

                      <div
                        className={`p-3 rounded ${
                          isDarkMode ? "bg-gray-900" : "bg-gray-100"
                        }`}
                      >
                        <h4 className="font-semibold mb-2">Public Cosmos</h4>
                        <ul className="text-sm space-y-1 text-gray-400">
                          <li>• Created by PRO users</li>
                          <li>• Can invite team members</li>
                          <li>• Shared resources with permission control</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-lg ${
                      isDarkMode ? "bg-black" : "bg-white"
                    }`}
                  >
                    <h3 className="font-bold mb-3">
                      Constellations: Environment Instances
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Constellations are like saved states or configurations
                      within a Cosmos.
                    </p>

                    <div className="relative overflow-x-auto">
                      <table
                        className={`w-full text-left ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        <thead
                          className={`text-xs uppercase ${
                            isDarkMode
                              ? "text-gray-400 bg-gray-900"
                              : "text-gray-700 bg-gray-100"
                          }`}
                        >
                          <tr>
                            <th className="px-4 py-2 rounded-l">
                              Constellation
                            </th>
                            <th className="px-4 py-2">Active Core Flow</th>
                            <th className="px-4 py-2 rounded-r">
                              Active Config Flow
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                          <tr>
                            <td className="px-4 py-3">Default</td>
                            <td className="px-4 py-3">Stellar Dark</td>
                            <td className="px-4 py-3">Orion Default</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3">Mariana</td>
                            <td className="px-4 py-3">Stellar Dark</td>
                            <td className="px-4 py-3">Blue</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3">Oriental</td>
                            <td className="px-4 py-3">Oriental Core</td>
                            <td className="px-4 py-3">Koi</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <h2
                  className={`text-2xl font-bold mb-4 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Using Cosmos & Constellations
                </h2>

                <h3
                  className={`text-xl font-bold mt-6 mb-3 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Creating Multiple Environments
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  One of OrionOS's most powerful features is the ability to
                  create multiple isolated environments without duplicating
                  resources. Here's how it works:
                </p>

                <ol
                  className={`list-decimal pl-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <li>
                    <strong>Create multiple Cosmos</strong> for different
                    contexts (Personal, Work, Client Project)
                    <ul className="list-disc pl-6 mt-2">
                      <li>
                        Each Cosmos has its own Stellar Drive (files) and Aura
                        Drive (design system)
                      </li>
                      <li>
                        PRO users can create Public Cosmos and invite team
                        members
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Create Constellations within each Cosmos</strong>{" "}
                    for different modes or themes
                    <ul className="list-disc pl-6 mt-2">
                      <li>
                        Constellations store references to active Core and
                        Config Flows
                      </li>
                      <li>
                        Switching Constellations instantly changes the entire
                        environment
                      </li>
                    </ul>
                  </li>
                </ol>

                <h3
                  className={`text-xl font-bold mt-6 mb-3 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Practical Example: Theme Switching
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Let's walk through the process of creating and switching
                  between themes:
                </p>

                <ol
                  className={`list-decimal pl-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <li>
                    <strong>Start with the default Constellation</strong> (black
                    wallpaper)
                  </li>
                  <li>
                    <strong>Create a new Config Flow</strong> named "Blue" with
                    a blue wallpaper
                  </li>
                  <li>
                    <strong>Duplicate the default Constellation</strong> and
                    name it "Mariana"
                  </li>
                  <li>
                    <strong>Update the Mariana Constellation</strong> to use the
                    Blue Config Flow
                  </li>
                  <li>
                    <strong>Switch between Constellations</strong> to toggle
                    themes instantly
                  </li>
                </ol>

                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  The beauty of this system is that switching Constellations
                  doesn't require loading new assets or changing URLs—it's an
                  instant, fluid experience.
                </p>

                <h3
                  className={`text-xl font-bold mt-6 mb-3 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Team Collaboration
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  For team environments, Public Cosmos provide powerful
                  collaboration features:
                </p>

                <ul
                  className={`list-disc pl-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <li>Team members can be invited to a shared Cosmos</li>
                  <li>
                    Everyone can access the shared Stellar Drive and Aura Drive
                  </li>
                  <li>
                    Permissions can be set for viewing, editing, or creating
                    content
                  </li>
                  <li>
                    Changes to Flows are immediately available to all members
                  </li>
                </ul>

                <div
                  className={`mt-6 p-4 rounded-lg ${
                    isDarkMode ? "bg-gray-900" : "bg-gray-100"
                  }`}
                >
                  <h4 className="font-bold mb-2">
                    Creating a New Constellation
                  </h4>
                  <CodeBlock>
                    {`// Example code for creating a new Constellation
import { createConstellation } from "@/actions/constellation";

// Create a new Constellation in the current Cosmos
const createNewConstellation = async (cosmosId, name) => {
  // Duplicate the active Constellation's flow mappings
  const result = await createConstellation({
    cosmosId,
    name,
    // These IDs would come from the currently active Constellation
    activeCoreFlowId: "default-core-flow-id",
    activeConfigFlowId: "default-config-flow-id"
  });
  
  return result;
};`}
                  </CodeBlock>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "prisma-schema" && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-3">
                <h1 className="text-3xl font-bold">Prisma Schema</h1>
                <p className="text-xl text-gray-400">
                  The database architecture behind OrionOS.
                </p>
              </div>

              <div
                className={`p-6 rounded-xl ${
                  isDarkMode ? "bg-gray-900" : "bg-gray-100"
                }`}
              >
                <h2 className="text-xl font-semibold mb-4">
                  Complete Prisma Schema
                </h2>
                <div
                  className={`p-4 rounded-lg ${
                    isDarkMode ? "bg-black" : "bg-white"
                  } overflow-x-auto`}
                >
                  <CodeBlock>
                    {`// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           String         @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  email        String         @unique
  firstname    String?
  lastname     String?
  createdAt    DateTime       @default(now())
  clerkid      String         @unique
  image        String?
  cosmos       Cosmos[]
  subscription Subscription?
  trial        Boolean        @default(false)
  firstView    Boolean        @default(false)
}

model Cosmos {
  id             String         @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name           String
  type           Type
  createdAt      DateTime       @default(now())
  stellarDrive   StellarDrive?
  auraDrive      AuraDrive?
  constellations Constellation[]
  User           User?          @relation(fields: [userId], references: [id])
  userId         String?        @db.Uuid
  members        Member[]
}

model StellarDrive {
  id       String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  files    File[]
  Cosmos   Cosmos    @relation(fields: [cosmosId], references: [id])
  cosmosId String    @unique @db.Uuid
}

model AuraDrive {
  id       String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  auroras  Aurora[]
  Cosmos   Cosmos    @relation(fields: [cosmosId], references: [id])
  cosmosId String    @unique @db.Uuid
}

model Aurora {
  id         String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name       String
  streams    Stream[]
  flows      Flow[]
  AuraDrive  AuraDrive @relation(fields: [auraDriveId], references: [id])
  auraDriveId String    @db.Uuid
}

model Stream {
  id       String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name     String
  Aurora   Aurora    @relation(fields: [auroraId], references: [id])
  auroraId String    @db.Uuid
}

model Flow {
  id                    String         @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name                  String
  type                  FlowType
  description           String?
  flowSystem            Json           // Design tokens
  flowStars             Json           // Canvas components
  createdAt             DateTime       @default(now())
  updatedAt             DateTime       @updatedAt
  Aurora                Aurora?        @relation(fields: [auroraId], references: [id])
  auroraId              String?        @db.Uuid
  activeCoreInConstellations   Constellation[] @relation("ActiveCoreFlow")
  activeConfigInConstellations Constellation[] @relation("ActiveConfigFlow")
}

model Constellation {
  id                 String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name               String
  activeCoreFlow     Flow      @relation("ActiveCoreFlow", fields: [activeCoreFlowId], references: [id])
  activeCoreFlowId   String    @db.Uuid
  activeConfigFlow   Flow      @relation("ActiveConfigFlow", fields: [activeConfigFlowId], references: [id])
  activeConfigFlowId String    @db.Uuid
  createdAt          DateTime  @default(now())
  Cosmos             Cosmos    @relation(fields: [cosmosId], references: [id])
  cosmosId           String    @db.Uuid
}

model File {
  id             String       @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name           String
  type           String       // MIME type
  url            String       // Storage URL
  size           Int          // Size in bytes
  createdAt      DateTime     @default(now())
  StellarDrive   StellarDrive @relation(fields: [stellarDriveId], references: [id])
  stellarDriveId String       @db.Uuid
}

model Member {
  id          String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  User        User?    @relation(fields: [userId], references: [id])
  userId      String?  @db.Uuid
  createdAt   DateTime @default(now())
  member      Boolean  @default(true)
  Cosmos      Cosmos?  @relation(fields: [cosmosId], references: [id])
  cosmosId    String?  @db.Uuid
}

model Subscription {
  id         String            @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  User       User?             @relation(fields: [userId], references: [id])
  userId     String?           @unique @db.Uuid
  createdAt  DateTime          @default(now())
  plan       SUBSCRIPTION_PLAN @default(FREE)
  updatedAt  DateTime          @default(now())
  customerId String?           @unique
}

enum FlowType {
  CORE
  CONFIG
}

enum Type {
  PERSONAL
  PUBLIC
}

enum SUBSCRIPTION_PLAN {
  PRO
  FREE
}
`}
                  </CodeBlock>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <h2
                  className={`text-2xl font-bold mb-4 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Schema Breakdown
                </h2>

                <h3
                  className={`text-xl font-bold mt-6 mb-3 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  User & Authentication
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  OrionOS uses Clerk for authentication, storing a reference to
                  the Clerk user ID:
                </p>
                <ul
                  className={`list-disc pl-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <li>
                    <strong>User:</strong> Core user information including Clerk
                    ID and profile details
                  </li>
                  <li>
                    <strong>Subscription:</strong> The user's subscription
                    status (FREE or PRO)
                  </li>
                </ul>

                <h3
                  className={`text-xl font-bold mt-6 mb-3 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Cosmos Architecture
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  The hierarchy of workspaces and resources:
                </p>
                <ul
                  className={`list-disc pl-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <li>
                    <strong>Cosmos:</strong> Isolated workspace environment
                    (PERSONAL or PUBLIC)
                  </li>
                  <li>
                    <strong>StellarDrive:</strong> File storage system (one per
                    Cosmos)
                  </li>
                  <li>
                    <strong>AuraDrive:</strong> Design system storage (one per
                    Cosmos)
                  </li>
                  <li>
                    <strong>Aurora:</strong> Thematic grouping of design
                    elements
                  </li>
                  <li>
                    <strong>Stream:</strong> Folder-like structure within an
                    Aurora
                  </li>
                  <li>
                    <strong>Member:</strong> User access to a shared Cosmos
                  </li>
                </ul>

                <h3
                  className={`text-xl font-bold mt-6 mb-3 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Flow System Models
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  The heart of the design system:
                </p>
                <ul
                  className={`list-disc pl-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <li>
                    <strong>Flow:</strong> A design system definition (CORE or
                    CONFIG)
                    <ul className="list-disc pl-6 mt-2">
                      <li>
                        <code>flowSystem</code>: JSON storage for design tokens
                      </li>
                      <li>
                        <code>flowStars</code>: JSON storage for canvas
                        components
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Constellation:</strong> Environment instance with
                    references to active flows
                    <ul className="list-disc pl-6 mt-2">
                      <li>References both a Core Flow and a Config Flow</li>
                      <li>Belongs to a specific Cosmos</li>
                    </ul>
                  </li>
                </ul>

                <h3
                  className={`text-xl font-bold mt-6 mb-3 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  File Management
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Storage of media and documents:
                </p>
                <ul
                  className={`list-disc pl-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <li>
                    <strong>File:</strong> Media or document in the Stellar
                    Drive
                    <ul className="list-disc pl-6 mt-2">
                      <li>Uses UploadCare for actual file storage</li>
                      <li>Stores metadata and URL reference</li>
                    </ul>
                  </li>
                </ul>

                <h3
                  className={`text-xl font-bold mt-6 mb-3 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Key Relationships
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  The schema creates several important relationships:
                </p>
                <ul
                  className={`list-disc pl-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <li>A User can have multiple Cosmos</li>
                  <li>
                    Each Cosmos has exactly one StellarDrive and one AuraDrive
                  </li>
                  <li>AuraDrives contain multiple Auroras</li>
                  <li>Auroras contain Streams and Flows</li>
                  <li>
                    A Constellation references exactly one Core Flow and one
                    Config Flow
                  </li>
                  <li>A Flow can be referenced by multiple Constellations</li>
                </ul>
              </div>
            </motion.div>
          )}

          {activeSection === "data-models" && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-3">
                <h1 className="text-3xl font-bold">Data Models</h1>
                <p className="text-xl text-gray-400">
                  Understanding the core data structures of OrionOS.
                </p>
              </div>

              <div
                className={`p-6 rounded-xl ${
                  isDarkMode
                    ? "bg-gray-900/50 border border-gray-800"
                    : "bg-gray-50 border border-gray-100"
                }`}
              >
                <h2 className="text-xl font-semibold mb-4">
                  Core TypeScript Interfaces
                </h2>
                <div
                  className={`p-4 rounded-lg ${
                    isDarkMode ? "bg-black" : "bg-white"
                  }`}
                >
                  <CodeBlock>
                    {`// src/types/cosmic.types.ts

export interface UserProfile {
  id: string;
  email: string;
  firstname: string | null;
  lastname: string | null;
  image: string | null;
  subscription: SubscriptionData | null;
  cosmos: CosmosData[];
}

export interface SubscriptionData {
  id: string;
  plan: 'FREE' | 'PRO';
  customerId: string | null;
}

export interface CosmosData {
  id: string;
  name: string;
  type: 'PERSONAL' | 'PUBLIC';
  stellarDrive: StellarDriveData | null;
  auraDrive: AuraDriveData | null;
  constellations: ConstellationData[];
  members: MemberData[];
}

export interface StellarDriveData {
  id: string;
  files: FileData[];
}

export interface AuraDriveData {
  id: string;
  auroras: AuroraData[];
}

export interface AuroraData {
  id: string;
  name: string;
  streams: StreamData[];
  flows: FlowData[];
}

export interface StreamData {
  id: string;
  name: string;
}

export interface FlowData {
  id: string;
  name: string;
  type: 'CORE' | 'CONFIG';
  description: string | null;
  flowSystem: Record<string, any>; // Design tokens
  flowStars: Record<string, any>;  // Component definitions
}

export interface ConstellationData {
  id: string;
  name: string;
  activeCoreFlow: FlowData;
  activeConfigFlow: FlowData;
}

export interface MemberData {
  id: string;
  userId: string;
  user: {
    firstname: string | null;
    lastname: string | null;
    image: string | null;
  };
}

export interface FileData {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  createdAt: string;
}

// Flow System specific types

export interface CoreFlowSystem {
  colors: Record<string, string | Record<string, string>>;
  typography: Record<string, string>;
  spacing: Record<string, string>;
  effects: Record<string, string>;
  [key: string]: any; // Allow for custom token categories
}

export interface FlowStarComponent {
  [property: string]: string | number | boolean | null;
}

export interface ConfigFlowStars {
  [componentId: string]: FlowStarComponent;
}

export interface CompiledStyles {
  [componentId: string]: Record<string, any>;
}`}
                  </CodeBlock>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <h2
                  className={`text-2xl font-bold mb-4 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Key Data Structures
                </h2>

                <h3
                  className={`text-xl font-bold mt-6 mb-3 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Flow System Data Structure
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  The Flow system uses a structured approach to store design
                  information:
                </p>

                <h4
                  className={`text-lg font-semibold mt-4 mb-2 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Core Flow Structure
                </h4>
                <ul
                  className={`list-disc pl-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <li>
                    <strong>Meta Information:</strong> ID, type, name, and
                    description
                  </li>
                  <li>
                    <strong>FlowSystem:</strong> Design tokens organized by
                    category (colors, typography, etc.)
                  </li>
                  <li>
                    <strong>FlowStars:</strong> Component definitions (usually
                    minimal in Core Flows)
                  </li>
                </ul>

                <div
                  className={`p-4 rounded-lg ${
                    isDarkMode ? "bg-gray-900" : "bg-gray-100"
                  } mt-2 mb-4`}
                >
                  <CodeBlock>
                    {`// Example Core Flow structure
{
  "meta": {
    "id": "stellar-dark",
    "type": "core",
    "name": "Stellar Dark",
    "description": "Default dark theme for OrionOS"
  },
  "flowSystem": {
    // Design tokens organized by category
    "colors": { ... },
    "typography": { ... },
    "spacing": { ... }
  },
  "flowStars": { }  // Usually empty or minimal in Core Flows
}`}
                  </CodeBlock>
                </div>

                <h4
                  className={`text-lg font-semibold mt-4 mb-2 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Config Flow Structure
                </h4>
                <ul
                  className={`list-disc pl-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <li>
                    <strong>Meta Information:</strong> ID, type, name, and
                    description
                  </li>
                  <li>
                    <strong>FlowSystem:</strong> Usually empty (refers to Core
                    Flow tokens)
                  </li>
                  <li>
                    <strong>FlowStars:</strong> Component-to-token mappings for
                    UI components
                  </li>
                </ul>

                <div
                  className={`p-4 rounded-lg ${
                    isDarkMode ? "bg-gray-900" : "bg-gray-100"
                  } mt-2 mb-4`}
                >
                  <CodeBlock>
                    {`// Example Config Flow structure
{
  "meta": {
    "id": "orion-default",
    "type": "config",
    "name": "Orion Default",
    "description": "Default configuration for OrionOS"
  },
  "flowSystem": { },  // Usually empty in Config Flows
  "flowStars": {
    // Component mappings
    "wallpaper": {
      "background": "colors.black",
      "blur": "0px"
    },
    "window": { ... },
    "dock": { ... }
  }
}`}
                  </CodeBlock>
                </div>

                <h3
                  className={`text-xl font-bold mt-6 mb-3 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Cosmic Context
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  The Cosmic Context provides a comprehensive runtime state for
                  the OS:
                </p>

                <div
                  className={`p-4 rounded-lg ${
                    isDarkMode ? "bg-gray-900" : "bg-gray-100"
                  } mt-2 mb-4`}
                >
                  <CodeBlock>
                    {`// src/contexts/CosmicContext.tsx
export interface CosmicContextType {
  // Styling
  styles: Record<string, any>;     // Compiled component styles
  coreTokens: Record<string, any>; // Raw design tokens
  
  // Files
  files: FileData[];               // Files in the current Stellar Drive
  
  // State
  activeCosmosId: string;          // Currently active Cosmos
  activeConstellationId: string;   // Currently active Constellation
  availableConstellations: Array<{id: string, name: string}>;
  
  // Actions
  switchConstellation: (id: string) => void;
  switchCoreFlow: (id: string) => void;
  switchConfigFlow: (id: string) => void;
  
  // Loading state
  isLoading: boolean;
}`}
                  </CodeBlock>
                </div>

                <h3
                  className={`text-xl font-bold mt-6 mb-3 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Redux Store Structure
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  OrionOS uses Redux for global state management:
                </p>

                <div
                  className={`p-4 rounded-lg ${
                    isDarkMode ? "bg-gray-900" : "bg-gray-100"
                  } mt-2 mb-4`}
                >
                  <CodeBlock>
                    {`// src/redux/store.ts
export interface RootState {
  activeCosmos: {
    activeCosmosId: string;
  };
  activeConstellation: {
    constellationId: string;
  };
  windows: {
    windows: Record<string, WindowData>;
    focusedWindowId: string | null;
    nextZIndex: number;
  };
  dock: {
    apps: DockApp[];
    openAppIds: string[];
  };
  debug: {
    isOpen: boolean;
    logs: LogEntry[];
  };
  folders: {
    folders: FolderData[];
  };
  workspaces: {
    workspaces: WorkspaceData[];
  };
}`}
                  </CodeBlock>
                </div>

                <h3
                  className={`text-xl font-bold mt-6 mb-3 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Window Management
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  The window management system uses a comprehensive data
                  structure:
                </p>

                <div
                  className={`p-4 rounded-lg ${
                    isDarkMode ? "bg-gray-900" : "bg-gray-100"
                  } mt-2 mb-4`}
                >
                  <CodeBlock>
                    {`// src/redux/slices/windows.ts
export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowData {
  id: string;
  appId: string;
  title: string;
  position: WindowPosition;
  size: WindowSize;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  layout: string; // For snap layouts
}

// Available layouts
export const LAYOUTS = {
  FLOATING: "floating",
  MAXIMIZED: "maximized",
  SNAP_LEFT: "snap-left",
  SNAP_RIGHT: "snap-right",
  SNAP_TOP: "snap-top",
  SNAP_BOTTOM: "snap-bottom",
  SNAP_TOP_LEFT: "snap-top-left",
  SNAP_TOP_RIGHT: "snap-top-right",
  SNAP_BOTTOM_LEFT: "snap-bottom-left",
  SNAP_BOTTOM_RIGHT: "snap-bottom-right"
};`}
                  </CodeBlock>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "user-generation" && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-3">
                <h1 className="text-3xl font-bold">
                  User & Initial Data Generation
                </h1>
                <p className="text-xl text-gray-400">
                  Creating the default cosmic structure for new users.
                </p>
              </div>

              <div
                className={`p-6 rounded-xl ${
                  isDarkMode ? "bg-gray-900" : "bg-gray-100"
                }`}
              >
                <h2 className="text-xl font-semibold mb-4">
                  User Registration Flow
                </h2>
                <div
                  className={`p-4 rounded-lg ${
                    isDarkMode ? "bg-black" : "bg-white"
                  }`}
                >
                  <CodeBlock>
                    {`// src/actions/user.ts

"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

// Default tokens for the Core Flow
const DEFAULT_CORE_TOKENS = {
  colors: {
    black: "#000000",
    "black-thick": "rgba(0, 0, 0, 0.81)",
    accent: "#7320DD",
    text: {
      primary: "#FFFFFF",
      secondary: "#9D9D9D"
    }
  },
  typography: {
    heading: "Geist, -apple-system, sans-serif",
    body: "Inter, -apple-system, sans-serif"
  },
  spacing: {
    sm: "0.5rem",
    md: "1rem",
    lg: "2rem"
  },
  effects: {
    blur: "16px",
    glow: "0 0 10px"
  }
};

// Default component definitions for the Core Flow
const DEFAULT_CORE_STARS = {
  // Core component definitions go here
  // These are not typically populated in the Core Flow
};

// Default mappings for the Config Flow
const DEFAULT_CONFIG_MAPPINGS = {
  wallpaper: {
    background: "colors.black",
    blur: "0px"
  },
  window: {
    background: "colors.black-thick",
    borderColor: "colors.accent",
    titleColor: "colors.text.primary",
    titleFont: "typography.heading"
  },
  dock: {
    background: "colors.black-thick",
    borderColor: "colors.accent"
  },
  menuBar: {
    background: "colors.black-thick",
    textColor: "colors.text.primary"
  }
};

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 403 };

    const userExist = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      include: {
        cosmos: {
          where: {
            User: {
              clerkid: user.id,
            },
          },
        },
      },
    });

    if (userExist) {
      return { status: 200, user: userExist };
    }

    // Create new user with default Flow ecosystem
    const newUser = await client.user.create({
      data: {
        clerkid: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstname: user.firstName,
        lastname: user.lastName,
        image: user.imageUrl,
        subscription: {
          create: {},
        },
        cosmos: {
          create: {
            name: \`\${user.firstName}'s Cosmos\`,
            type: "PERSONAL",
            // Create Stellar Drive
            stellarDrive: {
              create: {}
            },
            // Create Aura Drive with default Aurora
            auraDrive: {
              create: {
                auroras: {
                  create: {
                    name: "Default Aurora",
                    // Create default Flows
                    flows: {
                      create: [
                        {
                          type: "CORE",
                          name: "Stellar Dark",
                          description: "Default dark theme",
                          flowSystem: DEFAULT_CORE_TOKENS,
                          flowStars: DEFAULT_CORE_STARS
                        },
                        {
                          type: "CONFIG",
                          name: "Orion Default",
                          description: "Default Orion OS configuration",
                          flowSystem: {},
                          flowStars: DEFAULT_CONFIG_MAPPINGS
                        }
                      ]
                    }
                  }
                }
              }
            }
          }
        }
      },
      include: {
        cosmos: {
          include: {
            auraDrive: {
              include: {
                auroras: {
                  include: {
                    flows: true
                  }
                }
              }
            }
          }
        },
      },
    });

    // Get the created flows to reference in the constellation
    const coreFlowId = newUser.cosmos[0].auraDrive?.auroras[0].flows
      .find(flow => flow.type === "CORE")?.id;
    
    const configFlowId = newUser.cosmos[0].auraDrive?.auroras[0].flows
      .find(flow => flow.type === "CONFIG")?.id;

    // Create default constellation if we have both flow IDs
    if (coreFlowId && configFlowId) {
      await client.cosmos.update({
        where: { id: newUser.cosmos[0].id },
        data: {
          constellations: {
            create: {
              name: "Default Constellation",
              activeCoreFlowId: coreFlowId,
              activeConfigFlowId: configFlowId
            }
          }
        }
      });
    }

    return { status: 201, user: newUser };
  } catch (error) {
    console.error("User creation error:", error);
    return { status: 500 };
  }
};`}
                  </CodeBlock>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <h2
                  className={`text-2xl font-bold mb-4 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Initial Data Generation Explained
                </h2>

                <h3
                  className={`text-xl font-bold mt-6 mb-3 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  The Onboarding Flow
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  When a new user signs up, OrionOS creates a complete cosmic
                  structure:
                </p>

                <ol
                  className={`list-decimal pl-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <li>
                    <strong>User Record</strong> is created with Clerk
                    authentication
                  </li>
                  <li>
                    <strong>Personal Cosmos</strong> is created with the user's
                    name
                  </li>
                  <li>
                    <strong>Stellar Drive</strong> is initialized for file
                    storage
                  </li>
                  <li>
                    <strong>Aura Drive</strong> is created with a default Aurora
                  </li>
                  <li>
                    <strong>Default Flows</strong> are created:
                    <ul className="list-disc pl-6 mt-2">
                      <li>
                        "Stellar Dark" Core Flow with default design tokens
                      </li>
                      <li>
                        "Orion Default" Config Flow with component mappings
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Default Constellation</strong> is created
                    referencing the flows
                  </li>
                </ol>

                <h3
                  className={`text-xl font-bold mt-6 mb-3 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Default Design Tokens
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  The default Core Flow includes these token categories:
                </p>

                <ul
                  className={`list-disc pl-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <li>
                    <strong>Colors:</strong> Basic color palette including black
                    and accent colors
                  </li>
                  <li>
                    <strong>Typography:</strong> Font families for headings and
                    body text
                  </li>
                  <li>
                    <strong>Spacing:</strong> Standard spacing units for
                    consistent layout
                  </li>
                  <li>
                    <strong>Effects:</strong> Visual effects like blur and glow
                  </li>
                </ul>

                <h3
                  className={`text-xl font-bold mt-6 mb-3 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Default Component Mappings
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  The default Config Flow maps UI components to token
                  references:
                </p>

                <ul
                  className={`list-disc pl-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <li>
                    <strong>Wallpaper:</strong> Uses the black color as
                    background
                  </li>
                  <li>
                    <strong>Window:</strong> Uses transparent black with accent
                    borders
                  </li>
                  <li>
                    <strong>Dock:</strong> Uses transparent black with accent
                    borders
                  </li>
                  <li>
                    <strong>Menu Bar:</strong> Uses transparent black with white
                    text
                  </li>
                </ul>

                <h3
                  className={`text-xl font-bold mt-6 mb-3 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Dynamic Generation
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  The onboarding process is entirely dynamic:
                </p>

                <ul
                  className={`list-disc pl-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <li>All default data is defined in the server action</li>
                  <li>No preset types or constants are required</li>
                  <li>
                    The structure is created as if the user had built it
                    themselves
                  </li>
                  <li>
                    All relationships are properly established for immediate use
                  </li>
                </ul>

                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  This approach ensures that new users have a complete,
                  functional environment immediately after signup, while
                  maintaining the flexibility of the Flow system.
                </p>
              </div>
            </motion.div>
          )}

          {activeSection === "examples" && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-3">
                <h1 className="text-3xl font-bold">Flow Examples</h1>
                <p className="text-xl text-gray-400">
                  Real-world examples of the Flow system in action.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className={`p-6 rounded-xl ${
                    isDarkMode ? "bg-gray-900" : "bg-gray-100"
                  }`}
                >
                  <h2 className="text-xl font-semibold mb-4">
                    Oriental Koi Theme
                  </h2>
                  <div
                    className={`aspect-video rounded-lg overflow-hidden relative mb-4 ${
                      isDarkMode ? "bg-black" : "bg-gray-800"
                    }`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2/3 h-2/3 rounded-full bg-red-900/20 animate-pulse flex items-center justify-center">
                        <div className="w-1/2 h-1/2 rounded-full bg-red-900/40 animate-pulse flex items-center justify-center">
                          <div className="w-8 h-16 bg-red-600 rounded-full animate-[spin_8s_linear_infinite]"></div>
                        </div>
                      </div>
                      <div className="absolute inset-0 backdrop-blur-sm"></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">
                    A stunning theme featuring elegant Koi fish swimming in slow
                    motion against a black background with refracted glass
                    effects.
                  </p>
                  <CodeBlock>
                    {`// Oriental Koi Core Flow
{
  "meta": {
    "id": "oriental-core",
    "type": "core",
    "name": "Oriental Core"
  },
  "flowSystem": {
    "colors": {
      "black": "#000000",
      "red": {
        "primary": "#E5383B",
        "dark": "#BA181B",
        "light": "#FF686B"
      },
      "gold": "#FFD700",
      "white": "#FFFFFF"
    },
    "effects": {
      "blur": "16px",
      "glass": "backdrop-filter: blur(16px)"
    }
  }
}

// Oriental Koi Config Flow
{
  "meta": {
    "id": "koi-theme",
    "type": "config",
    "name": "Koi"
  },
  "flowStars": {
    "wallpaper": {
      "mode": "media",
      "source": "koi-swimming.mp4",
      "blur": "effects.blur"
    },
    "dock": {
      "background": "colors.black",
      "opacity": 0.7,
      "effect": "effects.glass"
    },
    "window": {
      "background": "colors.black",
      "opacity": 0.8,
      "borderColor": "colors.red.primary",
      "effect": "effects.glass"
    }
  }
}`}
                  </CodeBlock>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DocsPage;
