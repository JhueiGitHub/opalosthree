"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { toggleDebug, clearLogs } from "@/redux/slices/debug";
import {
  ChevronUp,
  ChevronDown,
  X,
  Trash,
  Code,
  Info,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const DebugPanel = () => {
  const dispatch = useAppDispatch();
  const { isOpen, logs } = useAppSelector((state) => state.debug);
  const [isExpanded, setIsExpanded] = useState(false);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when new logs arrive
  useEffect(() => {
    if (isOpen && logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs.length, isOpen]);

  const togglePanel = () => {
    dispatch(toggleDebug());
  };

  const handleClearLogs = () => {
    dispatch(clearLogs());
  };

  // Format the timestamp to be more readable
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      fractionalSecondDigits: 3,
    });
  };

  // Format JSON data for display
  const formatLogData = (data: any) => {
    if (!data) return null;

    try {
      return (
        <pre className="text-xs font-mono whitespace-pre-wrap overflow-auto max-h-32 bg-black/20 p-2 rounded mt-1 border border-white/5">
          {JSON.stringify(data, null, 2)}
        </pre>
      );
    } catch (error) {
      return <span className="text-red-400">Error formatting data</span>;
    }
  };

  // Get appropriate icon for log message type
  const getLogIcon = (message: string) => {
    if (message.includes("Error") || message.includes("Failed")) {
      return (
        <AlertCircle size={14} className="text-red-400 mr-2 flex-shrink-0" />
      );
    } else if (message.includes("Success")) {
      return (
        <CheckCircle size={14} className="text-green-400 mr-2 flex-shrink-0" />
      );
    } else if (message.includes("Window") || message.includes("App")) {
      return <Code size={14} className="text-blue-400 mr-2 flex-shrink-0" />;
    }
    return <Info size={14} className="text-white/50 mr-2 flex-shrink-0" />;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cn(
            "fixed left-4 bottom-4 bg-black/50 backdrop-blur-md border border-purple-500/20 rounded-md z-50 text-white shadow-lg overflow-hidden",
            isExpanded ? "w-96" : "w-60"
          )}
          initial={{ y: 50, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            height: isExpanded ? 320 : 40,
          }}
          exit={{ y: 50, opacity: 0 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
            duration: 0.2,
          }}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.1}
          dragMomentum={false}
        >
          {/* Glass effect */}
          <div className="absolute inset-0 rounded-md overflow-hidden pointer-events-none">
            <div className="absolute inset-0 backdrop-blur-md -z-10" />
            <div
              className="absolute inset-0 -z-10"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0.4) 30%, rgba(0, 0, 0, 0.2) 100%)",
                opacity: 0.7,
              }}
            />
            <div
              className="absolute top-0 left-0 right-0 h-[1px] -z-10"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.07) 50%, transparent 100%)",
              }}
            />
          </div>

          {/* Debug panel header */}
          <div className="h-10 flex items-center justify-between px-3 border-b border-purple-500/20 backdrop-blur-md cursor-move">
            <div className="flex items-center">
              <Code size={14} className="mr-2 text-purple-400" />
              <span className="text-xs font-medium">Debug Console</span>
            </div>
            <div className="flex items-center">
              {isExpanded ? (
                <motion.button
                  onClick={() => setIsExpanded(false)}
                  className="text-white/50 hover:text-white/80 p-1 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronDown size={14} />
                </motion.button>
              ) : (
                <motion.button
                  onClick={() => setIsExpanded(true)}
                  className="text-white/50 hover:text-white/80 p-1 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronUp size={14} />
                </motion.button>
              )}
              <motion.button
                onClick={handleClearLogs}
                className="text-white/50 hover:text-white/80 p-1 ml-1 transition-colors"
                title="Clear logs"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Trash size={14} />
              </motion.button>
              <motion.button
                onClick={togglePanel}
                className="text-white/50 hover:text-white/80 p-1 ml-1 transition-colors"
                title="Close debug panel"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={14} />
              </motion.button>
            </div>
          </div>

          {/* Debug panel body - visible when expanded */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="overflow-y-auto p-2 text-xs h-[calc(100%-40px)]"
              >
                {logs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-white/30">
                    <Code size={24} className="mb-2 opacity-40" />
                    <p>No logs to display</p>
                    <p className="text-[10px] mt-1 opacity-50">
                      Events will appear here as they occur
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {logs.map((log, index) => (
                      <motion.div
                        key={index}
                        className="border-b border-white/5 pb-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 }}
                      >
                        <div className="flex items-start">
                          <span className="text-white/40 mr-2 font-mono text-[10px] min-w-[75px]">
                            {formatTimestamp(log.timestamp)}
                          </span>
                          <div className="flex items-start flex-1">
                            {getLogIcon(log.message)}
                            <span className="text-green-300 flex-1">
                              {log.message}
                            </span>
                          </div>
                        </div>
                        {log.data && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ delay: 0.1 }}
                          >
                            {formatLogData(log.data)}
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                    <div ref={logsEndRef} />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DebugPanel;
