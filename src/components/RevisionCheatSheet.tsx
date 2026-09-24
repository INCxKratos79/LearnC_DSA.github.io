import React, { useState } from 'react';
import { BookOpen, Layers, AlertTriangle, Cpu, Terminal, Sparkles, Copy, Check } from 'lucide-react';

export const RevisionCheatSheet: React.FC = () => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const bitwiseTricks = [
    { formula: 'x & (x - 1)', desc: 'Clears the lowest set bit. If result is 0 and x > 0, x is a power of 2.' },
    { formula: 'x & (-x)', desc: 'Isolates the lowest set bit (crucial for Fenwick Tree / BIT update and query).' },
    { formula: 'x | (1 << k)', desc: 'Sets the k-th bit (0-indexed) to 1.' },
    { formula: 'x & ~(1 << k)', desc: 'Clears the k-th bit to 0.' },
    { formula: 'x ^ (1 << k)', desc: 'Toggles the k-th bit.' },
    { formula: '(x >> k) & 1', desc: 'Checks if the k-th bit is set (returns 1 or 0).' },
    { formula: 'a ^ b ^ b = a', desc: 'XOR self-inverse property. Useful for Single Number, swapping, and parity tracking.' },
    { formula: '__builtin_popcount(x)', desc: 'GCC / Clang hardware intrinsic to count number of set 1-bits in a single CPU cycle.' }
  ];

  const segfaultPitfalls = [
    {
      title: 'Returning Address of Local Variable',
      danger: 'int* get() { int x = 10; return &x; }',
      fix: 'Local variable x is destroyed when get() returns. Dereferencing that pointer later is undefined behavior / segfault. Allocate on Heap via malloc() or pass buffer from caller.'
    },
    {
      title: 'Unchecked malloc() Return Value',
      danger: 'int *p = malloc(sizeof(int)); *p = 5;',
      fix: 'If memory is exhausted, malloc returns NULL. Dereferencing NULL (*NULL) immediately crashes with SIGSEGV. Always check if (p == NULL).'
    },
    {
      title: 'Double Free Corruption',
      danger: 'free(ptr); free(ptr);',
      fix: 'Freeing the same pointer twice corrupts glibc allocator memory bins. Always set ptr = NULL after free(ptr); calling free(NULL) is a safe no-op.'
    },
    {
      title: 'Array-Pointer Decay Size Confusion',
      danger: 'void foo(int arr[]) { int n = sizeof(arr)/sizeof(arr[0]); }',
      fix: 'In function arguments, arr decays into a pointer int*. sizeof(arr) returns 8 bytes (pointer size), NOT the total array size! Always pass size explicitly as a parameter.'
    },
    {
      title: 'Buffer Overflow with gets() or sprintf()',
      danger: 'char buf[10]; gets(buf); // or scanf("%s", buf);',
      fix: 'Never use gets(). Always use fgets(buf, sizeof(buf), stdin) or snprintf(buf, sizeof(buf), ...).'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-blue-800/40 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold tracking-wide border border-blue-400/30">
            <BookOpen className="w-3.5 h-3.5" />
            REVISION CHEAT SHEET & MEMORY SURVIVAL GUIDE
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            C Memory Rules, Pointer Idioms & Bitwise Hacks
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Quick-reference survival guide for returning programmers.
            Refresh the 5 memory segments, eliminate segfaults before they happen, and memorize high-yield bit formulas.
          </p>
        </div>
      </div>

      {/* Memory Segments Breakdown */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-400" />
          The 5 Memory Segments in C & Process Layout
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
            <div className="text-slate-400 font-sans font-bold text-xs mb-2">Process RAM Address Map:</div>
            <pre className="text-slate-300 leading-tight">
{`+------------------------------------+ 0xFFFFFFFF (High Address)
| Kernel Space (OS Mapping)          |
+------------------------------------+
| Stack                              | | Grows DOWNWARD (↓)
| - Local variables inside functions | v
| - Return addresses & frame pointer |
|                                    |
|                                    |
| Heap                               | ^ Grows UPWARD (↑)
| - malloc(), calloc(), realloc()    | |
| - Must be freed manually           |
+------------------------------------+
| BSS Segment                        |
| - Uninitialized global & static    | -> Initialized to 0 by OS
+------------------------------------+
| Data Segment                       |
| - Initialized global & static vars |
+------------------------------------+
| Text / Code Segment                |
| - Machine instructions, read-only  | 0x00000000 (Low Address)
+------------------------------------+`}
            </pre>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
              <strong className="text-cyan-400 block font-semibold">1. Stack vs Heap Lifetime</strong>
              <p>
                Stack variables are allocated and freed in O(1) time simply by adjusting the RSP (Stack Pointer) register.
                Heap variables persist across function returns until explicitly deallocated via <code className="text-amber-300 font-mono">free()</code>.
              </p>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
              <strong className="text-amber-400 block font-semibold">2. Static & Global Variables (.data vs .bss)</strong>
              <p>
                Variables marked <code className="text-amber-300 font-mono">static</code> retain their value across function calls because they live in .data (if initialized) or .bss (if uninitialized), not on the stack!
              </p>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
              <strong className="text-purple-400 block font-semibold">3. Pointer Size & Architecture</strong>
              <p>
                On 64-bit systems (x86_64 / ARM64), <code className="text-amber-300 font-mono">sizeof(any_pointer) == 8 bytes</code>.
                Pointer arithmetic step size is always <code className="text-amber-300 font-mono">sizeof(*ptr)</code> bytes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bitwise CP Tricks */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-amber-400" />
          High-Yield Bit Manipulation Formulas (Competitive Programming)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {bitwiseTricks.map((trick, idx) => (
            <div
              key={idx}
              className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 flex items-start justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <code className="text-amber-300 font-mono font-bold text-xs bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {trick.formula}
                </code>
                <p className="text-slate-300 leading-relaxed pt-1">{trick.desc}</p>
              </div>

              <button
                onClick={() => copyToClipboard(trick.formula, `bit-${idx}`)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors shrink-0"
                title="Copy Formula"
              >
                {copiedItem === `bit-${idx}` ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Common C Gotchas & Segfault Traps */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-rose-400" />
          The Top 5 C Segfault Traps & Memory Corruptions
        </h2>

        <div className="space-y-3">
          {segfaultPitfalls.map((pit, idx) => (
            <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-sm font-bold text-rose-400">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                {pit.title}
              </div>
              <div className="bg-slate-900/90 p-2.5 rounded-lg font-mono text-rose-300 border border-rose-950">
                {pit.danger}
              </div>
              <p className="text-slate-300 leading-relaxed">
                <strong className="text-emerald-400">Solution / Prevention: </strong>
                {pit.fix}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
