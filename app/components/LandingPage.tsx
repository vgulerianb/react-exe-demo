"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";

const GithubButton = () => (
  <motion.a
    href="https://github.com/username/repo" // Replace with your repo URL
    target="_blank"
    rel="noopener noreferrer"
    className="fixed top-4 right-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 dark:bg-white/5 border border-gray-200/20 dark:border-white/10 backdrop-blur-md shadow-lg hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 group"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <svg
      className="w-5 h-5 text-gray-700 dark:text-white"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
    <span className="text-sm font-medium text-gray-700 dark:text-white">
      Star on GitHub
    </span>
    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-yellow-400/20 dark:bg-yellow-500/20">
      <svg
        className="w-3 h-3 text-yellow-600 dark:text-yellow-400"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    </div>
    <motion.div
      className="absolute inset-0 rounded-full bg-white/10 dark:bg-white/5"
      initial={false}
      transition={{ duration: 0.3 }}
      whileHover={{ opacity: 1 }}
    />
  </motion.a>
);

const LandingPage = () => {
  const [inputText, setInputText] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const placeholderText =
    "// Write your code here...\n\nconst greeting = 'Hello, World!';\nconsole.log(greeting);";

  const handleEditorChange = (value: any) => {
    setInputText(value || "");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0F1C] text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* GitHub Button */}
      <GithubButton />

      {/* Background Elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-white via-blue-50 to-gray-100 dark:from-[#0A0F1C] dark:via-[#1A1F3C] dark:to-[#2A2F4C] transition-colors duration-300">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMCwwLDAsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtZGFzaGFycmF5PSI1LDUiLz48L3N2Zz4=')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtZGFzaGFycmF5PSI1LDUiLz48L3N2Zz4=')] opacity-20"></div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-sky-400/30 to-blue-300/30 dark:from-purple-500/30 dark:to-blue-500/30 rounded-full filter blur-[80px] animate-orb-1"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-orange-300/30 to-yellow-300/30 dark:from-rose-500/30 dark:to-orange-500/30 rounded-full filter blur-[80px] animate-orb-2"></div>

      <style>
        {`
          @keyframes orb-1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-100px, 50px) scale(1.1); }
          }
          @keyframes orb-2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(100px, -50px) scale(1.1); }
          }
          .animate-orb-1 {
            animation: orb-1 15s ease-in-out infinite;
          }
          .animate-orb-2 {
            animation: orb-2 15s ease-in-out infinite;
          }
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.05);
          }
          ::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.15);
          }
          .dark ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
          }
          .dark ::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
          }
          .dark ::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.3);
          }
          .monaco-editor .margin, .monaco-editor-background {
            background-color: transparent !important;
          }
          .monaco-editor {
            padding-top: 8px;
          }
        `}
      </style>

      <div className="container mx-auto px-4 min-h-screen relative z-10">
        <AnimatePresence>
          {mounted && (
            <>
              <motion.header
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="py-8"
              >
                <h1 className="text-4xl md:text-6xl font-bold text-center bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 dark:from-white dark:via-blue-200 dark:to-white bg-clip-text text-transparent">
                  React EXE
                </h1>
                <p className="text-center text-gray-600 dark:text-gray-400 mt-4 text-lg">
                  Transform your ideas into reality
                </p>
              </motion.header>

              <div className="flex flex-col md:flex-row h-[calc(100vh-12rem)] gap-8">
                {/* Left Section - Monaco Editor */}
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full md:w-1/2 rounded-2xl overflow-hidden backdrop-blur-2xl"
                >
                  <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-2xl h-full shadow-lg">
                    <div className="flex items-center gap-2 p-4 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.02]">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                      </div>
                      <div className="flex-1 text-start">
                        <span className="text-lg font-medium text-gray-500 dark:text-gray-400">
                          Editor
                        </span>
                      </div>
                    </div>
                    <div className="h-[calc(100%-3.5rem)]">
                      <Editor
                        height="100%"
                        defaultLanguage="javascript"
                        defaultValue={placeholderText}
                        theme={mounted ? "vs-light" : "vs-dark"}
                        onChange={handleEditorChange}
                        options={{
                          fontSize: 14,
                          fontFamily: "monospace",
                          minimap: { enabled: false },
                          scrollbar: {
                            vertical: "hidden",
                            horizontal: "hidden",
                          },
                          padding: { top: 16 },
                          lineNumbers: "on",
                          glyphMargin: false,
                          folding: false,
                          lineDecorationsWidth: 0,
                          lineNumbersMinChars: 3,
                        }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Right Section - Preview */}
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full md:w-1/2 rounded-2xl overflow-hidden backdrop-blur-2xl"
                >
                  <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-2xl h-full shadow-lg">
                    <div className="flex items-center gap-2 p-2 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.02]">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                      </div>
                      <div className="flex-1 text-start">
                        <span className="text-lg font-medium text-gray-500 dark:text-gray-400">
                          Preview
                        </span>
                      </div>
                    </div>
                    <div className="p-4 h-[calc(100%-3.5rem)] overflow-auto">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="font-mono text-sm leading-relaxed"
                      >
                        {inputText || (
                          <span className="text-gray-400 dark:text-gray-500">
                            {placeholderText}
                          </span>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LandingPage;
