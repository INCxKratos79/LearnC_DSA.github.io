import React, { useState } from 'react';
import { Play, RotateCcw, Check, Sparkles, Terminal, Code2, Cpu, Zap, Layers, AlertCircle } from 'lucide-react';

interface SimulationExample {
  id: string;
  name: string;
  category: string;
  inputDescription: string;
  defaultInput: string;
  cCodeSnippet: string;
  pythonCodeSnippet: string;
  runSimulation: (rawInput: string) => {
    output: string;
    executionLog: string[];
    cMemoryDetails: string;
    pythonMemoryDetails: string;
  };
}

export const ComparatorPlayground: React.FC = () => {
  const [selectedSimId, setSelectedSimId] = useState<string>('two-sum');
  const [customInput, setCustomInput] = useState<string>('[2, 7, 11, 15], target = 9');
  const [simResult, setSimResult] = useState<{
    output: string;
    executionLog: string[];
    cMemoryDetails: string;
    pythonMemoryDetails: string;
  } | null>(null);

  const simulationExamples: SimulationExample[] = [
    {
      id: 'two-sum',
      name: 'Two Sum (Hash Map vs Linear Probe)',
      category: 'Arrays & Hashing',
      inputDescription: 'Array of numbers and target value',
      defaultInput: 'nums = [2, 7, 11, 15], target = 9',
      cCodeSnippet: `int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    // In C: manually allocate hash table with buckets
    HashMap map = {0};
    for (int i = 0; i < numsSize; i++) {
        int comp = target - nums[i];
        if (hash_contains(&map, comp)) {
            return make_result(hash_get(&map, comp), i);
        }
        hash_put(&map, nums[i], i);
    }
    return NULL;
}`,
      pythonCodeSnippet: `def two_sum(nums: list[int], target: int) -> list[int]:
    # In Python: dict is built-in with O(1) SipHash
    seen = {}
    for i, num in enumerate(nums):
        comp = target - num
        if comp in seen:
            return [seen[comp], i]
        seen[num] = i
    return []`,
      runSimulation: (rawInput) => {
        const numsMatch = rawInput.match(/\[([0-9,\s-]+)\]/);
        const targetMatch = rawInput.match(/target\s*=\s*(-?\d+)/);

        const nums = numsMatch
          ? numsMatch[1].split(',').map((x) => parseInt(x.trim())).filter((x) => !isNaN(x))
          : [2, 7, 11, 15];
        const target = targetMatch ? parseInt(targetMatch[1]) : 9;

        const log: string[] = [];
        log.push(`[Init] Array length = ${nums.length}, Target = ${target}`);
        const map: Record<number, number> = {};
        let result: [number, number] | null = null;

        for (let i = 0; i < nums.length; i++) {
          const num = nums[i];
          const comp = target - num;
          log.push(`[Step ${i + 1}] Index ${i}, Val = ${num}. Searching for complement ${comp}...`);
          if (comp in map) {
            log.push(`[Found!] Complement ${comp} previously recorded at index ${map[comp]}. Match: [${map[comp]}, ${i}]`);
            result = [map[comp], i];
            break;
          }
          map[num] = i;
          log.push(`[Store] Added { ${num} -> index ${i} } to hash table.`);
        }

        return {
          output: result ? `[${result[0]}, ${result[1]}] (nums[${result[0]}] + nums[${result[1]}] = ${target})` : 'No valid two sum pair found',
          executionLog: log,
          cMemoryDetails: `C Memory: Array of ${nums.length} ints = ${nums.length * 4} bytes. Custom hash nodes ~ ${nums.length * 24} bytes. Total Heap: ~${nums.length * 28 + 64} bytes. ZERO garbage collection pauses.`,
          pythonMemoryDetails: `Python Memory: list PyObject header (56B) + ${nums.length} PyLongObject pointers (8B each) + ${nums.length} PyLong objects (28B each) + dict overhead (~232B). Total: ~${nums.length * 36 + 288} bytes.`
        };
      }
    },
    {
      id: 'binary-search',
      name: 'Binary Search (Logarithmic Narrowing)',
      category: 'Searching',
      inputDescription: 'Sorted array and target value',
      defaultInput: 'nums = [1, 3, 5, 7, 9, 11, 15, 21], target = 9',
      cCodeSnippet: `int binarySearch(int* nums, int size, int target) {
    int low = 0, high = size - 1;
    while (low <= high) {
        // Prevent overflow: low + (high - low) / 2
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
      pythonCodeSnippet: `def binary_search(nums: list[int], target: int) -> int:
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
      runSimulation: (rawInput) => {
        const numsMatch = rawInput.match(/\[([0-9,\s-]+)\]/);
        const targetMatch = rawInput.match(/target\s*=\s*(-?\d+)/);

        const nums = numsMatch
          ? numsMatch[1].split(',').map((x) => parseInt(x.trim())).filter((x) => !isNaN(x)).sort((a, b) => a - b)
          : [1, 3, 5, 7, 9, 11, 15, 21];
        const target = targetMatch ? parseInt(targetMatch[1]) : 9;

        const log: string[] = [];
        let low = 0;
        let high = nums.length - 1;
        let foundIdx = -1;
        let step = 1;

        while (low <= high) {
          const mid = Math.floor(low + (high - low) / 2);
          log.push(`[Step ${step++}] low=${low} (${nums[low]}), high=${high} (${nums[high]}), mid=${mid} (${nums[mid]})`);
          if (nums[mid] === target) {
            log.push(`[Target Matched] Found ${target} exactly at index ${mid}!`);
            foundIdx = mid;
            break;
          } else if (nums[mid] < target) {
            log.push(`[Narrow Right] ${nums[mid]} < ${target}. Advancing low to ${mid + 1}.`);
            low = mid + 1;
          } else {
            log.push(`[Narrow Left] ${nums[mid]} > ${target}. Decrementing high to ${mid - 1}.`);
            high = mid - 1;
          }
        }

        return {
          output: foundIdx !== -1 ? `Index ${foundIdx}` : 'Target not found in array (-1)',
          executionLog: log,
          cMemoryDetails: `C Memory: Stack registers only (low, high, mid in 32-bit registers RSP). 0 bytes heap memory! Direct L1 cache hit.`,
          pythonMemoryDetails: `Python Memory: Standard frame PyFrameObject, arbitrary precision Python int objects for low/high/mid. Overhead: ~120 bytes.`
        };
      }
    },
    {
      id: 'valid-parentheses',
      name: 'Valid Parentheses (LIFO Stack Verification)',
      category: 'Stack',
      inputDescription: 'Parentheses string with (), [], {}',
      defaultInput: 's = "{[()()]}"',
      cCodeSnippet: `bool isValid(char* s) {
    char stack[strlen(s) + 1];
    int top = -1;
    for (int i = 0; s[i] != '\\0'; i++) {
        if (s[i] == '(') stack[++top] = ')';
        else if (s[i] == '[') stack[++top] = ']';
        else if (s[i] == '{') stack[++top] = '}';
        else if (top == -1 || stack[top--] != s[i]) return false;
    }
    return top == -1;
}`,
      pythonCodeSnippet: `def is_valid(s: str) -> bool:
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack`,
      runSimulation: (rawInput) => {
        const match = rawInput.match(/"([^"]+)"/) || rawInput.match(/'([^']+)'/);
        const s = match ? match[1] : '{[()()]}';

        const log: string[] = [];
        const stack: string[] = [];
        let valid = true;

        for (let i = 0; i < s.length; i++) {
          const char = s[i];
          if (char === '(') {
            stack.push(')');
            log.push(`[Char '${char}'] Pushed ')' onto stack. Current stack: [${stack.join(', ')}]`);
          } else if (char === '[') {
            stack.push(']');
            log.push(`[Char '${char}'] Pushed ']' onto stack. Current stack: [${stack.join(', ')}]`);
          } else if (char === '{') {
            stack.push('}');
            log.push(`[Char '${char}'] Pushed '}' onto stack. Current stack: [${stack.join(', ')}]`);
          } else {
            const expected = stack.pop();
            log.push(`[Char '${char}'] Popped from stack: '${expected}'. Compare with '${char}'`);
            if (expected !== char) {
              log.push(`[Mismatch Mismatch] Expected '${expected}' but got '${char}'! String is INVALID.`);
              valid = false;
              break;
            }
          }
        }

        if (valid && stack.length > 0) {
          log.push(`[Unclosed Brackets] Stack still contains unclosed elements: [${stack.join(', ')}]`);
          valid = false;
        }

        return {
          output: valid ? 'true (Valid Parentheses String)' : 'false (Invalid Parentheses String)',
          executionLog: log,
          cMemoryDetails: `C Memory: Stack buffer allocated directly on runtime call frame. Length ${s.length} bytes + 1 null byte. O(1) allocation time by moving RSP.`,
          pythonMemoryDetails: `Python Memory: Python list object dynamically resized via PyList_Append. Memory amortized reallocation.`
        };
      }
    }
  ];

  const activeSim = simulationExamples.find((s) => s.id === selectedSimId) || simulationExamples[0];

  const handleRunSimulation = () => {
    const res = activeSim.runSimulation(customInput);
    setSimResult(res);
  };

  const handleSelectExample = (example: SimulationExample) => {
    setSelectedSimId(example.id);
    setCustomInput(example.defaultInput);
    setSimResult(null);
  };

  return (
    <div className="space-y-8">
      {/* Comparator Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-700/80 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold tracking-wide border border-cyan-400/30">
            <Zap className="w-3.5 h-3.5" />
            C VS PYTHON ARCHITECTURAL COMPARATOR & RUNNER
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Low-Level C vs High-Level Python Side-by-Side
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Understand exactly why interviewers care about both: C gives you deep mechanical sympathy,
            memory layout control, and bare-metal performance, while Python offers unmatched developer velocity
            for rapid algorithmic prototyping and interview whiteboard rounds.
          </p>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          Architectural Feature Comparison: C vs Python
        </h2>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950 text-slate-300 font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Feature Dimension</th>
                <th className="py-3 px-4 text-blue-400 font-mono">C Language (Low-Level)</th>
                <th className="py-3 px-4 text-emerald-400 font-mono">Python 3 (High-Level)</th>
                <th className="py-3 px-4 text-slate-400">Interview Takeaway</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              <tr className="hover:bg-slate-800/40">
                <td className="py-3 px-4 font-semibold text-white">Memory Management</td>
                <td className="py-3 px-4 font-mono text-blue-300">Manual (malloc, calloc, free)</td>
                <td className="py-3 px-4 font-mono text-emerald-300">Automatic Reference Counting + Generational GC</td>
                <td className="py-3 px-4 text-slate-300">C tests memory leak discipline; Python prevents memory corruption bugs</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="py-3 px-4 font-semibold text-white">Integer Representation</td>
                <td className="py-3 px-4 font-mono text-blue-300">Fixed 32-bit / 64-bit with overflow UB</td>
                <td className="py-3 px-4 font-mono text-emerald-300">Arbitrary Precision (Bignum PyLongObject)</td>
                <td className="py-3 px-4 text-slate-300">In C you must guard INT_MAX / INT_MIN; in Python math never overflows</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="py-3 px-4 font-semibold text-white">Array Storage</td>
                <td className="py-3 px-4 font-mono text-blue-300">Contiguous raw bytes in RAM (4B per int)</td>
                <td className="py-3 px-4 font-mono text-emerald-300">Array of PyObject pointers (28B per int + 8B ptr)</td>
                <td className="py-3 px-4 text-slate-300">C provides 100% cache-line efficiency; Python incurs pointer indirection</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="py-3 px-4 font-semibold text-white">Standard Data Structures</td>
                <td className="py-3 px-4 font-mono text-blue-300">No built-in hash map, vector, or heap</td>
                <td className="py-3 px-4 font-mono text-emerald-300">Rich stdlib: dict, set, list, deque, heapq</td>
                <td className="py-3 px-4 text-slate-300">C forces you to build from scratch; Python allows solving fast in 30 minutes</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="py-3 px-4 font-semibold text-white">Execution Speed</td>
                <td className="py-3 px-4 font-mono text-blue-300">Direct compiled machine instructions (1x)</td>
                <td className="py-3 px-4 font-mono text-emerald-300">CPython bytecode VM interpretation (10x - 50x slower)</td>
                <td className="py-3 px-4 text-slate-300">In competitive programming, C runs in &lt;10ms; Python may hit TLE (Time Limit)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Algorithm Simulator */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-400" />
              Interactive Algorithm Execution & Memory Simulator
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select an algorithm, provide inputs, and trace execution step-by-step with low-level memory analysis
            </p>
          </div>

          {/* Example Selector */}
          <div className="flex items-center gap-2">
            {simulationExamples.map((ex) => (
              <button
                key={ex.id}
                onClick={() => handleSelectExample(ex)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedSimId === ex.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {ex.name.split('(')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Input Box and Run Action */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <label className="text-xs font-semibold text-slate-300 block">
            Test Case Input ({activeSim.inputDescription}):
          </label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleRunSimulation}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              Simulate Execution
            </button>
            <button
              onClick={() => {
                setCustomInput(activeSim.defaultInput);
                setSimResult(null);
              }}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
              title="Reset Input"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Simulation Output & Execution Trace */}
        {simResult && (
          <div className="space-y-4 pt-2 border-t border-slate-800 animate-fadeIn">
            <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-xl p-4 flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">
                  Algorithm Simulation Result:
                </span>
                <span className="text-sm font-mono font-bold text-white">
                  {simResult.output}
                </span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-emerald-900/60 text-emerald-200 border border-emerald-700">
                ✓ Execution Succeeded
              </span>
            </div>

            {/* Execution Log */}
            <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden font-mono text-xs">
              <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 text-slate-300 font-semibold flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                Step-by-Step State Transition Log:
              </div>
              <div className="p-4 space-y-1.5 max-h-[220px] overflow-y-auto text-slate-300">
                {simResult.executionLog.map((line, idx) => (
                  <div key={idx} className="leading-relaxed">
                    <span className="text-slate-500 mr-2">{idx + 1}.</span>
                    <span className={line.includes('[Found!]') ? 'text-emerald-400 font-bold' : line.includes('[Step') ? 'text-cyan-300' : 'text-slate-300'}>
                      {line}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Memory Layout Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-blue-950/20 border border-blue-800/40 p-3.5 rounded-xl space-y-1">
                <span className="text-blue-400 font-bold block uppercase text-[11px]">
                  C Bare-Metal Memory Footprint:
                </span>
                <p className="text-blue-200 leading-relaxed">{simResult.cMemoryDetails}</p>
              </div>

              <div className="bg-emerald-950/20 border border-emerald-800/40 p-3.5 rounded-xl space-y-1">
                <span className="text-emerald-400 font-bold block uppercase text-[11px]">
                  Python Object Overhead:
                </span>
                <p className="text-emerald-200 leading-relaxed">{simResult.pythonMemoryDetails}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
