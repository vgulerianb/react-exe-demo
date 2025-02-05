"use client";

import * as framermotion from "framer-motion";
import { useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { SAMPLE_CODE } from "../constants";
import { CodeExecutor } from "react-exe";
import { motion, AnimatePresence } from "framer-motion";

const GithubButton = () => (
  <a
    href="https://github.com/vgulerianb/react-exe"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed top-4 right-4 z-50 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <svg
      className="w-5 h-5 text-gray-900 dark:text-white"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
    <span className="text-sm font-medium text-gray-900 dark:text-white">
      Star on GitHub
    </span>
    <div className="flex items-center justify-center min-w-[1.5rem] h-6 px-1.5 rounded-full bg-yellow-100 dark:bg-yellow-900">
      <span className="text-xs font-semibold text-yellow-800 dark:text-yellow-100">
        ★
      </span>
    </div>
  </a>
);

const CodeBlock = () => {
  const command = "npm install react-exe";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(command);
      // You could add a toast notification here if desired
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-3 bg-gray-900 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-2 py-2 bg-gray-800">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-2 py-1 text-xs text-gray-300 hover:text-white transition-colors duration-200"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          Copy
        </button>
      </div>
      <div className="p-3 font-mono text-sm text-white">{command}</div>
    </div>
  );
};

const LandingPage = () => {
  const [inputText, setInputText] = useState(SAMPLE_CODE);
  const [theme, setTheme] = useState("light");

  const placeholderText = "// Write your code here...";

  const handleEditorChange = (value: any) => {
    setInputText(value || "");
  };

  const beforeMount = (monaco: any) => {
    // Disable syntax validation for JavaScript/TypeScript
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });
  };

  useEffect(() => {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(prefersDarkScheme.matches ? "dark" : "light");
  }, []);

  return (
    <div className="min-h-[100dvh] md:max-h-[100dvh] max-w-[100dvw] bg-gray-50 dark:bg-[#0A0F1C] text-gray-900 dark:text-white relative overflow-x-hidden overflow-y-scroll md:overflow-hidden transition-colors duration-300">
      {/* GitHub Button */}
      <GithubButton />

      {/* Background Elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-white via-blue-50 to-gray-100 dark:from-[#0A0F1C] dark:via-[#1A1F3C] dark:to-[#2A2F4C] transition-colors duration-300">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMCwwLDAsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtZGFzaGFycmF5PSI1LDUiLz48L3N2Zz4=')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtZGFzaGFycmF5PSI1LDUiLz48L3N2Zz4=')] opacity-20"></div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-sky-400/30 to-blue-300/30 dark:from-purple-500/30 dark:to-blue-500/30 rounded-full filter blur-[80px] animate-orb-1"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-orange-300/30 to-yellow-300/30 dark:from-rose-500/30 dark:to-orange-500/30 rounded-full filter blur-[80px] animate-orb-2"></div>

      <div className="container mx-auto px-4 min-h-[100dvh] relative z-10 flex flex-col">
        <AnimatePresence>
          <>
            <motion.header
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="py-8"
            >
              <h1 className="text-3xl pt-[32px] md:pt-0 md:text-5xl font-bold text-center bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 dark:from-white dark:via-blue-200 dark:to-white bg-clip-text text-transparent">
                React EXE
              </h1>
              <p className="text-center text-gray-600 dark:text-gray-400 mt-3 text-lg">
                Execute React Components in Real-Time
              </p>

              <CodeBlock />
            </motion.header>

            <div className="flex flex-col md:flex-row h-full gap-6 pb-[16px] flex-1 md:min-h-full md:max-h-[calc(100vh-120px)]">
              {/* Left Section - Monaco Editor */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full md:w-1/2 rounded-2xl overflow-hidden backdrop-blur-2xl h-[400px] md:h-auto"
              >
                <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-2xl h-full shadow-lg">
                  <div className="flex items-center gap-2 p-4 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.02]">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                    </div>
                  </div>
                  <div className="h-full md:h-[calc(100vh-320px)]">
                    <Editor
                      height="100%"
                      defaultLanguage="javascript"
                      defaultValue={placeholderText}
                      theme={theme === "light" ? "vs-light" : "vs-dark"}
                      value={inputText}
                      beforeMount={beforeMount}
                      onChange={handleEditorChange}
                      options={{
                        fontSize: 14,
                        fontFamily: "monospace",
                        minimap: { enabled: false },
                        "javascript.validate.enable": false,
                        "typescript.validate.enable": false,
                        padding: { top: 16 },
                        lineNumbers: "on",
                        glyphMargin: false,
                        folding: false,
                        lineDecorationsWidth: 16,
                        lineNumbersMinChars: 3,
                        scrollBeyondLastLine: false,
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
                className="w-full md:w-1/2 rounded-2xl overflow-hidden backdrop-blur-2xl h-[400px] md:h-auto"
              >
                <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-2xl h-full shadow-lg ">
                  <div className="flex items-center gap-2 p-2 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.02] min-h-[45px]">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                    </div>
                  </div>
                  <div className="p-4 h-auto overflow-auto">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="font-mono text-sm leading-relaxed  md:h-[calc(100vh-320px)]"
                    >
                      <CodeExecutor
                        code={inputText}
                        config={{
                          dependencies: {
                            "framer-motion": framermotion,
                          },
                        }}
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LandingPage;
