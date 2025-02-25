import { useState, useRef, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { motion, AnimatePresence } from "framer-motion";
import { CodeExecutor } from "react-exe";
import * as framermotion from "framer-motion";
import { MULTI_FILE_SAMPLE } from "../constants";

const MultiFileEditor = ({ initialFiles = MULTI_FILE_SAMPLE }) => {
  const [files, setFiles] = useState(
    initialFiles.length > 0
      ? initialFiles
      : [
          {
            name: "App.jsx",
            content: "// Write your React component here",
            isEntry: true,
          },
        ]
  );

  const [activeFile, setActiveFile] = useState(0);
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [theme, setTheme] = useState("light");
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [isSplitView, setIsSplitView] = useState(true);
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(prefersDarkScheme.matches ? "dark" : "light");

    const handleThemeChange = (e: any) => {
      setTheme(e.matches ? "dark" : "light");
    };

    prefersDarkScheme.addEventListener("change", handleThemeChange);
    return () =>
      prefersDarkScheme.removeEventListener("change", handleThemeChange);
  }, []);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    setIsEditorReady(true);
  };

  const updateFileContent = (value: any) => {
    const newFiles = [...files];
    newFiles[activeFile].content = value || "";
    //  Re-render the editor to reflect the changes, component is intentionally not re-rendered for better performance
    setIsEditorReady(false);
    setTimeout(() => {
      setIsEditorReady(true);
    });
    setFiles(newFiles);
  };

  const setEntryFile = (index: number) => {
    const newFiles = files.map((file, i) => ({
      ...file,
      isEntry: i === index,
    }));
    setFiles(newFiles);
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

  const getLanguageFromFileName = (fileName: string) => {
    const extension = fileName?.split?.(".")?.pop?.()?.toLowerCase();
    switch (extension) {
      case "js":
        return "javascript";
      case "jsx":
        return "javascript";
      case "ts":
        return "typescript";
      case "tsx":
        return "typescript";
      case "css":
        return "css";
      case "html":
        return "html";
      case "json":
        return "json";
      case "md":
        return "markdown";
      default:
        return "javascript";
    }
  };

  return (
    <div className="flex flex-col h-full min-h-[600px] md:h-[calc(100dvh-380px)]  bg-gray-50 dark:bg-[#0A0F1C] text-gray-900 dark:text-white">
      <div className="flex flex-col md:flex-row gap-4 h-full">
        {/* Editor Section */}
        <div
          className={`flex flex-col ${
            isSplitView ? "w-full md:w-1/2" : "w-full"
          }`}
        >
          <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-lg overflow-hidden shadow-md h-full">
            {/* Tabs Section */}
            <div className="flex items-center gap-1 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.02] p-1 overflow-x-auto">
              {files.map((file, index) => (
                <button
                  key={`${file.name}-${index}`}
                  onClick={() => setActiveFile(index)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium truncate max-w-[200px] flex items-center gap-1 ${
                    activeFile === index
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100"
                      : "hover:bg-gray-200 dark:hover:bg-white/5"
                  }`}
                >
                  {file.isEntry && (
                    <span className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full"></span>
                  )}
                  <span className="truncate">{file.name}</span>
                </button>
              ))}
            </div>

            {/* File Options */}
            <div className="flex items-center justify-between bg-gray-100 dark:bg-white/[0.01] px-4 py-1.5 text-xs text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span>
                  {activeFile !== -1 && files[activeFile]
                    ? files[activeFile].name
                    : "No file selected"}
                </span>
                {activeFile !== -1 &&
                  files[activeFile] &&
                  !files[activeFile].isEntry && (
                    <button
                      onClick={() => setEntryFile(activeFile)}
                      className="px-2 py-0.5 rounded text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                      title="Set as entry file"
                    >
                      Set as Entry
                    </button>
                  )}
              </div>
              <div>
                {`${files.filter((f) => f.isEntry).length}/1 entry files`}
              </div>
            </div>

            {/* Editor */}
            <div className="h-full pb-[18px]">
              <Editor
                height="90%"
                language={
                  activeFile !== -1 && files[activeFile]
                    ? getLanguageFromFileName(files[activeFile].name)
                    : "javascript"
                }
                theme={theme === "light" ? "vs-light" : "vs-dark"}
                value={(activeFile !== -1 && files[activeFile]
                  ? files[activeFile].content
                  : ""
                )?.trim()}
                onChange={updateFileContent}
                beforeMount={beforeMount}
                onMount={handleEditorDidMount}
                options={{
                  fontSize: 14,
                  fontFamily: "monospace",
                  minimap: { enabled: false },
                  "javascript.validate.enable": false,
                  "typescript.validate.enable": false,
                  "javascript.implicitProjectConfig.checkJs": false,
                  padding: { top: 16 },
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
          </div>
        </div>

        {/* Preview Section */}
        {isSplitView && (
          <div className="w-full md:w-1/2">
            <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-lg overflow-hidden shadow-md h-full flex flex-col">
              <div className="flex items-center gap-2 p-2 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.02]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Preview
                </span>
              </div>
              <div className="flex-1 overflow-auto p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={files.find((f) => f.isEntry)?.name || "preview"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    {isEditorReady && (
                      <CodeExecutor
                        code={files}
                        config={{
                          dependencies: {
                            "framer-motion": framermotion,
                          },
                        }}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiFileEditor;
