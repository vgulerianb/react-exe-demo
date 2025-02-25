const SAMPLE_CODE =
  "import { motion } from 'framer-motion';\nimport { useState } from 'react';\n\ntype Player = 'X' | 'O' | null;\ntype GameStatus = 'playing' | 'won' | 'draw';\ntype Board = Player[];\n\ninterface SquareProps {\n  value: Player;\n  onClick: () => void;\n  isWinning: boolean;\n  index: number;\n}\n\nconst Square: React.FC<SquareProps> = ({ value, onClick, isWinning, index }) => (\n  <motion.button\n    key={index}\n    whileHover={{ scale: 0.95 }}\n    whileTap={{ scale: 0.9 }}\n    className={`h-24 rounded-lg text-4xl font-bold flex items-center justify-center\n      ${isWinning ? 'bg-green-100' : 'bg-gray-50'}\n      ${value ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'}\n      transition-colors duration-200`}\n    onClick={onClick}\n    aria-label={value ? `Square ${index + 1} with ${value}` : `Empty square ${index + 1}`}\n  >\n    {value && (\n      <motion.span\n        initial={{ scale: 0 }}\n        animate={{ scale: 1 }}\n        className={value === 'X' ? 'text-blue-500' : 'text-rose-500'}\n      >\n        {value}\n      </motion.span>\n    )}\n  </motion.button>\n);\n\ninterface StatusMessageProps {\n  gameStatus: GameStatus;\n  isXNext: boolean;\n}\n\nconst StatusMessage: React.FC<StatusMessageProps> = ({ gameStatus, isXNext }) => {\n  if (gameStatus === 'playing') {\n    return (\n      <p className=\"text-lg text-gray-700\">\n        Next player: <span className=\"font-bold\">{isXNext ? 'X' : 'O'}</span>\n      </p>\n    );\n  }\n  if (gameStatus === 'won') {\n    return (\n      <p className=\"text-lg text-green-600 font-bold\">\n        Player {isXNext ? 'O' : 'X'} wins!\n      </p>\n    );\n  }\n  return (\n    <p className=\"text-lg text-gray-600 font-bold\">\n      It's a draw!\n    </p>\n  );\n};\n\nconst TicTacToe: React.FC = () => {\n  const [board, setBoard] = useState<Board>(Array(9).fill(null));\n  const [isXNext, setIsXNext] = useState<boolean>(true);\n  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');\n  const [winningCombination, setWinningCombination] = useState<number[]>([]);\n\n  const winningPatterns: number[][] = [\n    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows\n    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns\n    [0, 4, 8], [2, 4, 6] // Diagonals\n  ];\n\n  const checkWinner = (squares: Board): Player => {\n    for (const [a, b, c] of winningPatterns) {\n      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {\n        setWinningCombination([a, b, c]);\n        return squares[a];\n      }\n    }\n    return null;\n  };\n\n  const handleClick = (index: number): void => {\n    if (board[index] || gameStatus !== 'playing') return;\n\n    const newBoard = [...board];\n    newBoard[index] = isXNext ? 'X' : 'O';\n    setBoard(newBoard);\n\n    const winner = checkWinner(newBoard);\n    if (winner) {\n      setGameStatus('won');\n    } else if (!newBoard.includes(null)) {\n      setGameStatus('draw');\n    }\n\n    setIsXNext(!isXNext);\n  };\n\n  const resetGame = (): void => {\n    setBoard(Array(9).fill(null));\n    setIsXNext(true);\n    setGameStatus('playing');\n    setWinningCombination([]);\n  };\n\n  return (\n    <div className=\"bg-gray-50 flex flex-col items-center justify-center p-4\">\n      <motion.div\n        initial={{ opacity: 0, y: -20 }}\n        animate={{ opacity: 1, y: 0 }}\n        className=\"bg-white rounded-xl shadow-lg p-6 max-w-md w-full\"\n      >\n        <h1 className=\"text-3xl font-bold text-gray-800 text-center mb-6\">\n          Tic Tac Toe\n        </h1>\n\n        <div className=\"grid grid-cols-3 gap-3 mb-6\">\n          {board.map((value, index) => (\n            <Square\n              key={index}\n              value={value}\n              onClick={() => handleClick(index)}\n              isWinning={winningCombination.includes(index)}\n              index={index}\n            />\n          ))}\n        </div>\n\n        <div className=\"text-center mb-4\">\n          <StatusMessage gameStatus={gameStatus} isXNext={isXNext} />\n        </div>\n\n        <motion.button\n          whileHover={{ scale: 1.05 }}\n          whileTap={{ scale: 0.95 }}\n          className=\"w-full py-3 rounded-lg bg-blue-500 text-white font-semibold\n            hover:bg-blue-600 transition-colors duration-200\"\n          onClick={resetGame}\n          aria-label=\"Start new game\"\n        >\n          New Game\n        </motion.button>\n      </motion.div>\n    </div>\n  );\n};\n\nexport default TicTacToe;\n";

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
export { SAMPLE_CODE, MULTI_FILE_SAMPLE };
