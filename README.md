# React-EXE

Execute React components on the fly with external dependencies, custom styling, and TypeScript support. Perfect for creating live code previews, documentation, or interactive code playgrounds.

<img width="1281" alt="Screenshot 2025-02-05 at 23 24 15" src="https://github.com/user-attachments/assets/615071f3-7928-474a-8067-35b623e49c15" />

Try the live demo [here](https://react-exe-demo.vercel.app/).

## Features

- 🚀 Execute React components from string code
- 📦 Support for external dependencies
- 🎨 Tailwind CSS support
- 🔒 Built-in security checks
- 💅 Customizable styling
- 📝 TypeScript support
- ⚡ Live rendering
- 🐛 Error boundary protection

## Installation

```bash
npm install react-exe
# or
yarn add react-exe
# or
pnpm add react-exe
```

## Basic Usage

```tsx
import { CodeExecutor } from "react-exe";

const code = `
export default function HelloWorld() {
  return (
    <div className="p-4 bg-blue-100 rounded">
      <h1 className="text-2xl font-bold">Hello World!</h1>
    </div>
  );
}
`;

function App() {
  return <CodeExecutor code={code} config={{ enableTailwind: true }} />;
}
```

## Advanced Usage

### With External Dependencies

```tsx
import { CodeExecutor } from "react-exe";
import * as echarts from "echarts";
import * as framerMotion from "framer-motion";

const code = `
import { motion } from 'framer-motion';
import { LineChart } from 'echarts';

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-4"
    >
      <LineChart 
        option={{
          xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
          yAxis: { type: 'value' },
          series: [{ data: [150, 230, 224], type: 'line' }]
        }}
        style={{ height: '300px' }}
      />
    </motion.div>
  );
}
`;

function App() {
  return (
    <CodeExecutor
      code={code}
      config={{
        dependencies: {
          "framer-motion": framerMotion,
          echarts: echarts,
        },
        enableTailwind: true,
        containerClassName: "min-h-[400px]",
        containerStyle: {
          padding: "20px",
          background: "#f9fafb",
        },
      }}
    />
  );
}
```

2. With absolute imports and wildcard patterns

```tsx
import { CodeExecutor } from "react-exe";
import * as echarts from "echarts";
import * as framerMotion from "framer-motion";
import * as uiComponents from "../ShadcnComps";

const code = `
import { motion } from 'framer-motion';
import { LineChart } from 'echarts';
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-4"
    >
      <LineChart 
        option={{
          xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
          yAxis: { type: 'value' },
          series: [{ data: [150, 230, 224], type: 'line' }]
        }}
        style={{ height: '300px' }}
      />
    </motion.div>
  );
}
`;

function App() {
  return (
    <CodeExecutor
      code={code}
      config={{
        dependencies: {
          "framer-motion": framerMotion,
          echarts: echarts,
          "@/components/ui/*": uiComponents,
        },
        enableTailwind: true,
        containerClassName: "min-h-[400px]",
        containerStyle: {
          padding: "20px",
          background: "#f9fafb",
        },
      }}
    />
  );
}
```

### With Custom Error Handling

```tsx
import { CodeExecutor } from "react-exe";

function App() {
  return (
    <CodeExecutor
      code={code}
      config={{
        enableTailwind: true,
        errorClassName: "my-error-class",
        errorStyle: {
          background: "#fee2e2",
          border: "2px solid #ef4444",
        },
        onError: (error) => {
          console.error("Component error:", error);
          // Send to error tracking service
          trackError(error);
        },
        // Custom security patterns
        securityPatterns: [
          /localStorage/i,
          /sessionStorage/i,
          /window\.location/i,
        ],
      }}
    />
  );
}
```

## Configuration Options

The `config` prop accepts the following options:

````typescript
interface CodeExecutorConfig {
  // External dependencies available to the rendered component
  dependencies?: Record<string, any>;

  // Enable Tailwind CSS support
  enableTailwind?: boolean;

  // Custom className for the container
  containerClassName?: string;

  // Custom inline styles for the container
  containerStyle?: React.CSSProperties;

  // Custom className for error messages
  errorClassName?: string;

  // Custom inline styles for error messages
  errorStyle?: React.CSSProperties;

  // Custom security patterns to block potentially malicious code
  securityPatterns?: RegExp[];

  // Error callback function
  onError?: (error: Error) => void;
}


## Security

React-EXE includes built-in security measures:

- Default security patterns to block potentially harmful code
- Custom security pattern support
- Error boundary protection

Default blocked patterns include:
```typescript
const defaultSecurityPatterns = [
  /document\.cookie/i,
  /window\.document\.cookie/i,
  /eval\(/i,
  /Function\(/i,
  /document\.write/i,
  /document\.location/i,
];
````

## TypeScript Support

React-EXE is written in TypeScript and includes type definitions. For the best development experience, use TypeScript in your project:

```tsx
import { CodeExecutor, CodeExecutorConfig } from "react-exe";

const config: CodeExecutorConfig = {
  enableTailwind: true,
  dependencies: {
    "my-component": MyComponent,
  },
};

function App() {
  return <CodeExecutor code={code} config={config} />;
}
```

## License

MIT © [Vikrant](https://www.linkedin.com/in/vikrant-guleria/)

---

Made with ❤️ by [Vikrant](https://www.linkedin.com/in/vikrant-guleria/)
