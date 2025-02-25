"use client";

import * as framermotion from "framer-motion";
import { useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { SAMPLE_CODE } from "../constants";
import { CodeExecutor } from "react-exe";
import { motion, AnimatePresence } from "framer-motion";
import MultiFileEditor from "./MultifileEditor";

const MULTI_FILE_SAMPLE = [
  {
    name: "App.tsx",
    content: `
import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import TaskList from './TaskList';
import AddTask from './AddTask';
import { TaskProvider } from './TaskContext';

const App = () => {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header title="Task Manager" />
        <main className="flex-1 container mx-auto p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <AddTask />
              <TaskList />
            </div>
          </motion.div>
        </main>
      </div>
    </TaskProvider>
  );
};

export default App;
    `,
    isEntry: true,
  },
  {
    name: "Header.tsx",
    content: `
import React from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <motion.header 
      className="bg-indigo-600 text-white shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
    </motion.header>
  );
};

export default Header;
    `,
  },
  {
    name: "TaskContext.tsx",
    content: `
import React, { createContext, useContext, useReducer } from 'react';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
}

type TaskAction = 
  | { type: 'ADD_TASK'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'CLEAR_COMPLETED' };

const initialState: TaskState = {
  tasks: [
    { id: '1', text: 'Learn React-EXE', completed: false },
    { id: '2', text: 'Build a multi-file app', completed: false },
    { id: '3', text: 'Share with the community', completed: false }
  ]
};

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: Date.now().toString(),
            text: action.payload,
            completed: false
          }
        ]
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        )
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        tasks: state.tasks.filter(task => !task.completed)
      };
    default:
      return state;
  }
};

const TaskContext = createContext<{
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
} | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
    `,
  },
  {
    name: "AddTask.tsx",
    content: `
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTaskContext } from './TaskContext';

const AddTask = () => {
  const [text, setText] = useState('');
  const { dispatch } = useTaskContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (text.trim()) {
      dispatch({ type: 'ADD_TASK', payload: text.trim() });
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Add a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <motion.button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!text.trim()}
        >
          Add Task
        </motion.button>
      </div>
    </form>
  );
};

export default AddTask;
    `,
  },
  {
    name: "TaskList.tsx",
    content: `
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTaskContext } from './TaskContext';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { state, dispatch } = useTaskContext();
  
  const hasCompleted = state.tasks.some(task => task.completed);
  
  const clearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Tasks</h2>
        {hasCompleted && (
          <motion.button
            onClick={clearCompleted}
            className="text-sm text-indigo-600 hover:text-indigo-800"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Clear completed
          </motion.button>
        )}
      </div>
      
      {state.tasks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No tasks yet. Add some!
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          <AnimatePresence>
            {state.tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </AnimatePresence>
        </ul>
      )}
      
      <div className="mt-4 text-sm text-gray-500">
        {state.tasks.filter(t => !t.completed).length} remaining tasks
      </div>
    </div>
  );
};

export default TaskList;
    `,
  },
  {
    name: "TaskItem.tsx",
    content: `
import React from 'react';
import { motion } from 'framer-motion';
import { useTaskContext } from './TaskContext';
import { Task } from './TaskContext';

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const { dispatch } = useTaskContext();

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE_TASK', payload: task.id });
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_TASK', payload: task.id });
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      className="py-3 flex items-center justify-between group"
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
          checked={task.completed}
          onChange={handleToggle}
        />
        <span 
          className={\`ml-3 \${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}\`}
        >
          {task.text}
        </span>
      </div>
      <motion.button
        onClick={handleDelete}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        Delete
      </motion.button>
    </motion.li>
  );
};

export default TaskItem;
    `,
  },
];
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

            <MultiFileEditor />
          </>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LandingPage;
