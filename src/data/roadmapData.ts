import { RoadmapWeek } from '../types';

export const MASTER_ROADMAP: RoadmapWeek[] = [
  // MONTH 1: C LANGUAGE RE-IMMERSION & LINEAR FOUNDATIONS (BASIC LEVEL)
  {
    weekNumber: 1,
    monthNumber: 1,
    title: 'C Syntax Re-Immersion, Memory Segments & Compiling',
    goal: 'Dust off programming fundamentals, master GCC pipeline, and understand Stack vs Heap memory layout.',
    targetHours: 16,
    level: 'Basics',
    phase: 'Month 1: C Re-Immersion & Linear Foundations',
    dailySchedule: [
      {
        day: 'Mon',
        tasks: ['GCC compilation pipeline: Preprocessor, Compiler, Assembler, Linker', 'Inspect intermediate files: gcc -E, -S, -c'],
        practiceGoal: 'Compile a multi-file program manually using command line'
      },
      {
        day: 'Tue',
        tasks: ['Data types, signed vs unsigned, integer overflow UB', 'Limits header <limits.h> and fixed-width integers <stdint.h>'],
        practiceGoal: 'Implement safe addition and multiplication with overflow guards'
      },
      {
        day: 'Wed',
        tasks: ['Memory Segments: Stack, Heap, .data, .bss, and Text segment', 'Inspect address of local vs global variables via %p'],
        practiceGoal: 'Trace variable lifetime across function frames'
      },
      {
        day: 'Thu',
        tasks: ['Control flow, loops, switch statements, and operator precedence', 'Array fundamentals and row-major layout in memory'],
        practiceGoal: 'Solve: Reverse 32-bit Integer with Overflow Guard (C & Python)'
      },
      {
        day: 'Fri',
        tasks: ['C Strings as null-terminated char arrays (\\0)', 'Pitfalls of scanf, gets vs fgets and buffer security'],
        practiceGoal: 'Implement custom strlen, strcmp, and strcpy'
      },
      {
        day: 'Sat',
        tasks: ['Two Pointers on Arrays & Strings', 'Palindromes without string conversion'],
        practiceGoal: 'Solve: Palindrome Number (LeetCode 9) & Reverse String In-Place'
      },
      {
        day: 'Sun',
        tasks: ['Weekly Revision Checkpoint: C vs Python memory model contrast', 'Quiz on stack frames and overflow rules'],
        practiceGoal: 'Build a small command-line arithmetic expression evaluator'
      }
    ],
    keyMilestones: [
      'Can clearly articulate what happens under the hood during gcc compilation',
      'Can identify integer overflow vulnerabilities and prevent them',
      'Understands how strings are stored in contiguous memory'
    ],
    recommendedProblems: ['c-prob-1-reverse-int', 'c-prob-2-palindrome-num', 'c-prob-4-reverse-string-inplace']
  },
  {
    weekNumber: 2,
    monthNumber: 1,
    title: 'The Heart of C: Pointers, Step Sizes & Addresses',
    goal: 'Demystify pointers, dereferencing, pointer arithmetic, and array decay.',
    targetHours: 18,
    level: 'Basics',
    phase: 'Month 1: C Re-Immersion & Linear Foundations',
    dailySchedule: [
      {
        day: 'Mon',
        tasks: ['Pointer declarations, memory addresses, & and * operators', 'Pointer size on 32-bit (4B) vs 64-bit (8B) architectures'],
        practiceGoal: 'Inspect memory addresses of adjacent array elements'
      },
      {
        day: 'Tue',
        tasks: ['Pointer arithmetic: ptr + 1 advances by sizeof(*ptr)', 'Array name decay to pointer when passed to functions'],
        practiceGoal: 'Traverse and modify arrays purely using pointer arithmetic *(arr + i)'
      },
      {
        day: 'Wed',
        tasks: ['Pass-by-value vs pass-by-reference simulation in C', 'Swapping variables with pointers & XOR swap trick'],
        practiceGoal: 'Write safe swap and partition functions'
      },
      {
        day: 'Thu',
        tasks: ['String scanning with raw char pointers', 'Discarding whitespace, parsing signs and digits'],
        practiceGoal: 'Solve: String to Integer (myAtoi - LeetCode 8) in C and Python'
      },
      {
        day: 'Fri',
        tasks: ['Two Pointers pattern: Opposite direction & same direction', 'Sliding Window fundamentals'],
        practiceGoal: 'Solve: Two Sum & Container With Most Water (LeetCode 11)'
      },
      {
        day: 'Sat',
        tasks: ['3Sum: Sorting + Two Pointers combination', 'Skipping duplicate triplets to maintain O(N^2)'],
        practiceGoal: 'Solve: 3Sum (LeetCode 15) in C with qsort and in Python'
      },
      {
        day: 'Sun',
        tasks: ['Weekly review: Debugging segmentation faults with GDB / LLDB', 'Inspect pointer bounds with Valgrind'],
        practiceGoal: 'Milestone Problem Set: Two Pointers & String Manipulation'
      }
    ],
    keyMilestones: [
      'Zero hesitation on pointer arithmetic step sizes',
      'Mastered the Two Pointers pattern for linear array problems',
      'Understands array-to-pointer decay'
    ],
    recommendedProblems: ['c-prob-3-string-to-integer-atoi', 'dsa-prob-two-sum', 'dsa-prob-container-most-water', 'lc-15-three-sum']
  },
  {
    weekNumber: 3,
    monthNumber: 1,
    title: 'Dynamic Memory Allocation & Memory Safety',
    goal: 'Master heap management with malloc, calloc, realloc, and free, preventing memory leaks.',
    targetHours: 18,
    level: 'Intermediate',
    phase: 'Month 1: C Re-Immersion & Linear Foundations',
    dailySchedule: [
      {
        day: 'Mon',
        tasks: ['Heap allocation: malloc() vs calloc()', 'Checking for NULL return values and allocation failure'],
        practiceGoal: 'Allocate dynamic 1D and 2D arrays'
      },
      {
        day: 'Tue',
        tasks: ['Resizing buffers safely with realloc()', 'Avoiding the realloc leak anti-pattern: tmp = realloc(ptr)'],
        practiceGoal: 'Build a dynamic integer vector with amortized O(1) push_back'
      },
      {
        day: 'Wed',
        tasks: ['Deallocation with free() and dangling pointer protection', 'Setting ptr = NULL after free, avoiding Double Free'],
        practiceGoal: 'Simulate memory leak detection and clean teardowns'
      },
      {
        day: 'Thu',
        tasks: ['In-place array manipulation from the back', 'Merging sorted arrays without temporary buffers'],
        practiceGoal: 'Solve: Merge Sorted Array (LeetCode 88) in C and Python'
      },
      {
        day: 'Fri',
        tasks: ['Prefix Sums & Running Accumulations', 'Subarray sum queries in O(1)'],
        practiceGoal: 'Solve: Maximum Subarray (Kadane’s Algorithm - LeetCode 53)'
      },
      {
        day: 'Sat',
        tasks: ['Dynamic Sliding Window: Variable length windows', 'Tracking character frequencies with fixed ASCII tables'],
        practiceGoal: 'Solve: Longest Substring Without Repeating Characters (LeetCode 3)'
      },
      {
        day: 'Sun',
        tasks: ['Month 1 Mid-Point Evaluation: Dynamic memory hygiene test', 'Compare C manual heap vs Python garbage collection'],
        practiceGoal: 'Implement a complete Dynamic String Builder in pure C'
      }
    ],
    keyMilestones: [
      'Can implement a dynamically resizable Vector struct in C',
      'Mastered Kadane’s algorithm and sliding window technique',
      'Always frees heap memory without leaks'
    ],
    recommendedProblems: ['c-prob-5-merge-sorted-array', 'lc-53-maximum-subarray', 'lc-3-longest-substring-without-repeating-characters']
  },
  {
    weekNumber: 4,
    monthNumber: 1,
    title: 'Linked Lists & Node-Based Memory Structures',
    goal: 'Transition from contiguous arrays to node-based dynamic structures. Master pointer rewiring.',
    targetHours: 18,
    level: 'Intermediate',
    phase: 'Month 1: C Re-Immersion & Linear Foundations',
    dailySchedule: [
      {
        day: 'Mon',
        tasks: ['Singly Linked List node representation struct ListNode { int val; struct ListNode *next; }', 'Head, tail, and sentinel dummy nodes'],
        practiceGoal: 'Implement insert_at_head, insert_at_tail, and delete_node in C'
      },
      {
        day: 'Tue',
        tasks: ['In-place pointer reversal using 3 pointers: prev, curr, next', 'Iterative vs recursive list reversal'],
        practiceGoal: 'Solve: Reverse Linked List (LeetCode 206) in C and Python'
      },
      {
        day: 'Wed',
        tasks: ['Floyd’s Cycle Finding Algorithm (Tortoise and Hare)', 'Finding middle of linked list in one pass'],
        practiceGoal: 'Solve: Linked List Cycle I & II (LeetCode 141 & 142)'
      },
      {
        day: 'Thu',
        tasks: ['Merging two sorted linked lists using dummy nodes', 'Handling dangling tails without extra allocation'],
        practiceGoal: 'Solve: Merge Two Sorted Lists (LeetCode 21)'
      },
      {
        day: 'Fri',
        tasks: ['Doubly Linked Lists with prev and next pointers', 'Circular Linked Lists and Ring Buffers'],
        practiceGoal: 'Implement a full Doubly Linked List with O(1) removal'
      },
      {
        day: 'Sat',
        tasks: ['Practice: Remove Nth Node From End of List', 'Using two pointers with gap N to solve in single pass'],
        practiceGoal: 'Solve: Remove Nth Node From End of List (LeetCode 19)'
      },
      {
        day: 'Sun',
        tasks: ['Month 1 Capstone Project: Build a custom Singly & Doubly Linked List library in C', 'Self-assessment on linear structures'],
        practiceGoal: 'Month 1 Comprehensive Review & Problem Blitz'
      }
    ],
    keyMilestones: [
      'Flawless in-place pointer manipulation without losing head references',
      'Understands how sentinel/dummy nodes eliminate null pointer edge cases',
      'Confident in Floyd’s fast-slow pointer algorithm'
    ],
    recommendedProblems: ['dsa-prob-reverse-linked-list']
  },

  // MONTH 2: NON-LINEAR STRUCTURES & RECURSIVE PARADIGMS (INTERMEDIATE LEVEL)
  {
    weekNumber: 5,
    monthNumber: 2,
    title: 'Stacks, Queues & Monotonic Data Structures',
    goal: 'Master LIFO/FIFO semantics and the powerful Monotonic Stack pattern for O(N) optimizations.',
    targetHours: 18,
    level: 'Intermediate',
    phase: 'Month 2: Stacks, Trees & Recursion',
    dailySchedule: [
      {
        day: 'Mon',
        tasks: ['Stack implementation via dynamic array and via linked list in C', 'Array bounds checking and underflow/overflow prevention'],
        practiceGoal: 'Build dynamic Stack in C with push, pop, peek, isEmpty'
      },
      {
        day: 'Tue',
        tasks: ['Matching brackets and parsing expressions', 'Valid Parentheses algorithm with ASCII lookups'],
        practiceGoal: 'Solve: Valid Parentheses (LeetCode 20) in C and Python'
      },
      {
        day: 'Wed',
        tasks: ['Designing O(1) auxiliary stacks: Min Stack & Max Stack', 'Tracking history of minimum elements alongside data'],
        practiceGoal: 'Solve: Design Min Stack (LeetCode 155) in C and Python'
      },
      {
        day: 'Thu',
        tasks: ['Circular Queue implementation in C (Ring Buffer) with (tail + 1) % capacity', 'FIFO mechanics and cache-friendly buffers'],
        practiceGoal: 'Implement Design Circular Queue (LeetCode 622)'
      },
      {
        day: 'Fri',
        tasks: ['Monotonic Stack: Finding Next Greater Element in O(N)', 'Maintaining strictly decreasing or increasing indices'],
        practiceGoal: 'Solve: Next Greater Element I & Daily Temperatures (LeetCode 739)'
      },
      {
        day: 'Sat',
        tasks: ['Advanced Monotonic Stack: Trapping Rain Water & Histogram', 'Calculating bounded areas between peaks'],
        practiceGoal: 'Solve: Trapping Rain Water (LeetCode 42) in C and Python'
      },
      {
        day: 'Sun',
        tasks: ['Weekly summary & competitive programming tricks for stacks', 'Compare C array stack with Python collections.deque'],
        practiceGoal: 'Solve: Largest Rectangle in Histogram (LeetCode 84)'
      }
    ],
    keyMilestones: [
      'Understands Monotonic Stack pattern and how it reduces O(N^2) to O(N)',
      'Can implement a Circular Queue / Ring Buffer from scratch in C',
      'Solved Trapping Rain Water with two pointers and stack'
    ],
    recommendedProblems: ['dsa-prob-valid-parentheses', 'c-prob-6-min-stack', 'lc-42-trapping-rain-water']
  },
  {
    weekNumber: 6,
    monthNumber: 2,
    title: 'Recursion, Backtracking & Divide-and-Conquer',
    goal: 'Master the recursion call stack, recursion trees, and backtracking state pruning.',
    targetHours: 20,
    level: 'Intermediate',
    phase: 'Month 2: Stacks, Trees & Recursion',
    dailySchedule: [
      {
        day: 'Mon',
        tasks: ['Understanding Call Stack frames, base cases, and stack overflow limits', 'Mastering the 3 steps: 1. Base case 2. Recursive step 3. Return'],
        practiceGoal: 'Implement recursive Fibonacci with memoization & Power(x, n)'
      },
      {
        day: 'Tue',
        tasks: ['Divide and Conquer paradigm: Merge Sort implementation in C', 'In-place vs temporary buffer merging, recurrence relations T(N)=2T(N/2)+O(N)'],
        practiceGoal: 'Implement Merge Sort from scratch in C'
      },
      {
        day: 'Wed',
        tasks: ['Quick Sort and Lomuto vs Hoare partitioning', 'Worst-case O(N^2) mitigation via randomized pivot selection'],
        practiceGoal: 'Implement Quick Sort and Quick Select (Kth Largest Element)'
      },
      {
        day: 'Thu',
        tasks: ['Backtracking blueprint: Choice, Constraint, Goal, and Undo (backtrack)', 'Generating all subsets / power set'],
        practiceGoal: 'Solve: Subsets (LeetCode 78) & Subsets II (handling duplicates)'
      },
      {
        day: 'Fri',
        tasks: ['Permutations & Combinations backtracking', 'State pruning to prevent redundant branches'],
        practiceGoal: 'Solve: Permutations (LeetCode 46) & Combination Sum (LeetCode 39)'
      },
      {
        day: 'Sat',
        tasks: ['Grid Backtracking: Word Search in a 2D matrix', 'Marking cells visited in-place and restoring them on return'],
        practiceGoal: 'Solve: Word Search (LeetCode 79)'
      },
      {
        day: 'Sun',
        tasks: ['Hard Backtracking Challenge: N-Queens or Sudoku Solver', 'Bitmask optimization for N-Queens'],
        practiceGoal: 'Solve: N-Queens (LeetCode 51)'
      }
    ],
    keyMilestones: [
      'Intuitive understanding of recursive stack execution',
      'Can apply the standard Backtracking template to combinatorial problems',
      'Mastered Merge Sort and Quick Sort in pure C'
    ],
    recommendedProblems: ['lc-33-search-in-rotated-sorted-array']
  },
  {
    weekNumber: 7,
    monthNumber: 2,
    title: 'Binary Trees & Tree Traversals (DFS / BFS)',
    goal: 'Build deep intuition for hierarchical data structures, recursive DFS, and level-order BFS.',
    targetHours: 18,
    level: 'Intermediate',
    phase: 'Month 2: Stacks, Trees & Recursion',
    dailySchedule: [
      {
        day: 'Mon',
        tasks: ['Binary Tree representation in C: struct TreeNode { int val; TreeNode *left, *right; }', 'DFS Traversals: Preorder, Inorder, and Postorder'],
        practiceGoal: 'Implement Preorder, Inorder, Postorder recursively and iteratively'
      },
      {
        day: 'Tue',
        tasks: ['Divide and conquer on trees: Max Depth, Invert Tree, Diameter', 'Combining left subtree and right subtree results'],
        practiceGoal: 'Solve: Maximum Depth of Binary Tree (LeetCode 104) & Invert Binary Tree'
      },
      {
        day: 'Wed',
        tasks: ['BFS Level Order Traversal using a FIFO Queue', 'Tracking levels, max width of binary tree'],
        practiceGoal: 'Solve: Binary Tree Level Order Traversal (LeetCode 102)'
      },
      {
        day: 'Thu',
        tasks: ['Lowest Common Ancestor (LCA) in a Binary Tree', 'Post-order DFS returning pointers from left and right branches'],
        practiceGoal: 'Solve: Lowest Common Ancestor of a Binary Tree (LeetCode 236)'
      },
      {
        day: 'Fri',
        tasks: ['Tree Path Sums and Subtree aggregation', 'Binary Tree Maximum Path Sum intuition and branch pruning'],
        practiceGoal: 'Solve: Binary Tree Maximum Path Sum (LeetCode 124) in C and Python'
      },
      {
        day: 'Sat',
        tasks: ['Binary Search Tree (BST) properties: Inorder traversal yields sorted order', 'BST Search, Insert, and Delete with in-order successor'],
        practiceGoal: 'Solve: Validate Binary Search Tree (LeetCode 98) & Kth Smallest in BST'
      },
      {
        day: 'Sun',
        tasks: ['Tree Serialization & Deserialization concepts', 'Converting tree to string and reconstructing from preorder/inorder'],
        practiceGoal: 'Solve: Construct Binary Tree from Preorder and Inorder Traversal'
      }
    ],
    keyMilestones: [
      'Fluent in DFS postorder subtree aggregation',
      'Can implement level-order traversal with a queue in C and Python',
      'Mastered BST properties and validation'
    ],
    recommendedProblems: ['dsa-prob-max-depth-tree', 'lc-124-binary-tree-maximum-path-sum']
  },
  {
    weekNumber: 8,
    monthNumber: 2,
    title: 'Heaps, Priority Queues & Sorting Intervals',
    goal: 'Understand binary heap arrays, percolate up/down, heapify in O(N), and interval processing.',
    targetHours: 18,
    level: 'Intermediate',
    phase: 'Month 2: Stacks, Trees & Recursion',
    dailySchedule: [
      {
        day: 'Mon',
        tasks: ['Binary Heap representation in flat arrays: parent = (i-1)/2, left = 2i+1, right = 2i+2', 'Max-Heap vs Min-Heap invariants'],
        practiceGoal: 'Implement sift_up and sift_down in C'
      },
      {
        day: 'Tue',
        tasks: ['Heapify array in linear O(N) time (bottom-up)', 'Heapsort algorithm in pure C'],
        practiceGoal: 'Build a reusable Min-Heap / Max-Heap library in C'
      },
      {
        day: 'Wed',
        tasks: ['Top K Elements pattern using Min-Heap of size K in O(N log K)', 'Python heapq module vs manual C heap'],
        practiceGoal: 'Solve: Kth Largest Element in an Array (LeetCode 215)'
      },
      {
        day: 'Thu',
        tasks: ['Merge K Sorted Lists using Min-Heap', 'K-way merging in O(N log K)'],
        practiceGoal: 'Solve: Merge k Sorted Lists (LeetCode 23)'
      },
      {
        day: 'Fri',
        tasks: ['Interval scheduling & sorting intervals', 'Merging overlapping intervals with qsort'],
        practiceGoal: 'Solve: Merge Intervals (LeetCode 56) in C and Python'
      },
      {
        day: 'Sat',
        tasks: ['Non-overlapping Intervals & Meeting Rooms II', 'Greedy interval scheduling by end time'],
        practiceGoal: 'Solve: Non-overlapping Intervals (LeetCode 435)'
      },
      {
        day: 'Sun',
        tasks: ['Month 2 Milestone Review: Trees, Heaps & Intervals', 'Two-Heap pattern: Find Median from Data Stream (LeetCode 295)'],
        practiceGoal: 'Self-assessment contest: 3 problems in 90 minutes'
      }
    ],
    keyMilestones: [
      'Can implement a Binary Heap from scratch in an array without pointer overhead',
      'Knows how to use Top-K Heap pattern for O(N log K) performance',
      'Mastered interval sorting and merging logic'
    ],
    recommendedProblems: ['lc-56-merge-intervals']
  },

  // MONTH 3: GRAPHS & SYSTEM DATA STRUCTURES (INTERMEDIATE TO ADVANCED)
  {
    weekNumber: 9,
    monthNumber: 3,
    title: 'Graph Fundamentals: BFS, DFS & Matrix Grids',
    goal: 'Represent graphs in memory, detect cycles, and traverse grids effortlessly.',
    targetHours: 20,
    level: 'Intermediate',
    phase: 'Month 3: Graphs & System Data Structures',
    dailySchedule: [
      {
        day: 'Mon',
        tasks: ['Graph representations: Adjacency Matrix vs Adjacency List (dynamic arrays or linked lists in C)', 'Trade-offs: Space O(V^2) vs O(V + E)'],
        practiceGoal: 'Implement Adjacency List in pure C with dynamic vectors'
      },
      {
        day: 'Tue',
        tasks: ['Graph BFS & DFS traversals', 'Connected components in undirected graphs'],
        practiceGoal: 'Implement iterative BFS and recursive DFS for arbitrary graphs'
      },
      {
        day: 'Wed',
        tasks: ['2D Matrix as an implicit graph', 'Flood fill and island sinking algorithms'],
        practiceGoal: 'Solve: Number of Islands (LeetCode 200) in C and Python'
      },
      {
        day: 'Thu',
        tasks: ['Multi-Source BFS: Rotting Oranges & 01 Matrix', 'Enqueueing all sources initially to compute distance waves'],
        practiceGoal: 'Solve: Rotting Oranges (LeetCode 994)'
      },
      {
        day: 'Fri',
        tasks: ['Cycle detection in undirected graphs (DFS with parent pointer)', 'Bipartite graph verification via 2-coloring BFS/DFS'],
        practiceGoal: 'Solve: Is Graph Bipartite? (LeetCode 785)'
      },
      {
        day: 'Sat',
        tasks: ['Clone Graph: Deep copy of graph with hash map for visited nodes', 'Handling cycles during cloning'],
        practiceGoal: 'Solve: Clone Graph (LeetCode 133)'
      },
      {
        day: 'Sun',
        tasks: ['Weekly Graph Recap: Grid vs Adjacency List memory efficiency', 'Practice Word Search II / Word Ladder setup'],
        practiceGoal: 'Solve: Pacific Atlantic Water Flow (LeetCode 417)'
      }
    ],
    keyMilestones: [
      'Comfortable implementing Graph BFS/DFS in C without STL',
      'Mastered multi-source BFS for grid distance calculations',
      'Understands connected components and graph coloring'
    ],
    recommendedProblems: ['dsa-prob-num-islands']
  },
  {
    weekNumber: 10,
    monthNumber: 3,
    title: 'Topological Sort, DAGs & Disjoint Set Union (DSU)',
    goal: 'Master dependency resolution with Kahn’s algorithm and Union-Find with path compression.',
    targetHours: 20,
    level: 'Advanced',
    phase: 'Month 3: Graphs & System Data Structures',
    dailySchedule: [
      {
        day: 'Mon',
        tasks: ['Directed Acyclic Graphs (DAGs) & Topological Sort theory', 'Kahn’s Algorithm (In-degree array + BFS queue) in C'],
        practiceGoal: 'Implement Kahn’s algorithm for dependency scheduling'
      },
      {
        day: 'Tue',
        tasks: ['Cycle detection in directed graphs via Kahn’s vs 3-color DFS', 'Course scheduling dependencies'],
        practiceGoal: 'Solve: Course Schedule I & II (LeetCode 207 & 210) in C and Python'
      },
      {
        day: 'Wed',
        tasks: ['Disjoint Set Union (DSU / Union-Find) data structure', 'Find with Path Compression and Union by Rank/Size'],
        practiceGoal: 'Implement DSU in C with near O(1) alpha(N) operations'
      },
      {
        day: 'Thu',
        tasks: ['Detecting cycles in undirected graphs with DSU', 'Number of Connected Components in an Undirected Graph'],
        practiceGoal: 'Solve: Redundant Connection (LeetCode 684)'
      },
      {
        day: 'Fri',
        tasks: ['Minimum Spanning Trees (MST): Kruskal’s Algorithm with DSU', 'Sorting edges + union without cycles'],
        practiceGoal: 'Solve: Min Cost to Connect All Points (LeetCode 1584)'
      },
      {
        day: 'Sat',
        tasks: ['Accounts Merge & Grouping equivalent entities with DSU', 'Graph modeling for non-graph problems'],
        practiceGoal: 'Solve: Accounts Merge (LeetCode 721)'
      },
      {
        day: 'Sun',
        tasks: ['Weekly review: DSU vs DFS trade-offs', 'Benchmark DSU in C vs Python'],
        practiceGoal: 'Review and optimize Course Schedule C solution'
      }
    ],
    keyMilestones: [
      'Can implement Disjoint Set Union with path compression in 15 lines of code',
      'Mastered Topological Sort for dependency resolution problems',
      'Understands Kruskal’s MST algorithm'
    ],
    recommendedProblems: ['lc-207-course-schedule']
  },
  {
    weekNumber: 11,
    monthNumber: 3,
    title: 'Shortest Path Algorithms: Dijkstra & Bellman-Ford',
    goal: 'Solve weighted graphs, single-source shortest paths, and network routing.',
    targetHours: 20,
    level: 'Advanced',
    phase: 'Month 3: Graphs & System Data Structures',
    dailySchedule: [
      {
        day: 'Mon',
        tasks: ['Dijkstra’s Algorithm fundamentals: Greedy relaxation of edges', 'Why Dijkstra fails with negative edge weights'],
        practiceGoal: 'Trace Dijkstra on paper with adjacency list'
      },
      {
        day: 'Tue',
        tasks: ['Dijkstra implementation using Min-Heap in pure C', 'Heap nodes storing (distance, vertex_id)'],
        practiceGoal: 'Solve: Network Delay Time (LeetCode 743) in C and Python'
      },
      {
        day: 'Wed',
        tasks: ['Shortest Path in a Binary Matrix / Weighted Grid', 'Dijkstra on 2D coordinates'],
        practiceGoal: 'Solve: Path With Minimum Effort (LeetCode 1631)'
      },
      {
        day: 'Thu',
        tasks: ['Bellman-Ford Algorithm: Relaxing all E edges V-1 times', 'Detecting negative weight cycles in graphs'],
        practiceGoal: 'Implement Bellman-Ford in C'
      },
      {
        day: 'Fri',
        tasks: ['Floyd-Warshall Algorithm: All-Pairs Shortest Path in O(V^3)', 'Dynamic programming 3-loop relaxation: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])'],
        practiceGoal: 'Implement Floyd-Warshall for dense graphs'
      },
      {
        day: 'Sat',
        tasks: ['Cheapest Flights Within K Stops (Modified Bellman-Ford / BFS)', 'Constrained shortest path with step limits'],
        practiceGoal: 'Solve: Cheapest Flights Within K Stops (LeetCode 787)'
      },
      {
        day: 'Sun',
        tasks: ['Graph Mastery Checkpoint: When to use BFS vs Dijkstra vs Bellman-Ford vs Floyd-Warshall', 'Speed drilling of graph algorithms'],
        practiceGoal: 'Comprehensive Graph Review'
      }
    ],
    keyMilestones: [
      'Can implement Dijkstra with Min-Heap without getting bogged down by pointer syntax',
      'Knows the exact limitations and trade-offs of Dijkstra vs Bellman-Ford',
      'Able to model real-world networks as graphs'
    ],
    recommendedProblems: ['lc-207-course-schedule']
  },
  {
    weekNumber: 12,
    monthNumber: 3,
    title: 'System Data Structures: Design LRU, LFU & Hash Tables in C',
    goal: 'Bridge DSA and low-level Systems Programming. Build production-grade data structures.',
    targetHours: 22,
    level: 'Advanced',
    phase: 'Month 3: Graphs & System Data Structures',
    dailySchedule: [
      {
        day: 'Mon',
        tasks: ['Hash Table internals in C: Hash functions (DJB2, FNV-1a, MurmurHash)', 'Collision resolution: Chaining with linked lists vs Open Addressing (Linear Probing)'],
        practiceGoal: 'Build a string-to-int Hash Table in C with chaining'
      },
      {
        day: 'Tue',
        tasks: ['Load factor, rehashing, and amortized O(1) complexity', 'Memory footprint of Hash Tables in C vs Python dict'],
        practiceGoal: 'Implement dynamic rehashing when load factor > 0.75'
      },
      {
        day: 'Wed',
        tasks: ['LRU Cache Architecture: Combining Doubly Linked List + Hash Map', 'Dummy head/tail design for bug-free O(1) detach and prepend'],
        practiceGoal: 'Solve: LRU Cache (LeetCode 146) in C and Python'
      },
      {
        day: 'Thu',
        tasks: ['LFU Cache (Least Frequently Used) design', 'Frequency lists, min_freq pointer, and tie-breaking by recency'],
        practiceGoal: 'Study LFU Cache architecture (LeetCode 460)'
      },
      {
        day: 'Fri',
        tasks: ['Trie (Prefix Tree) data structure for strings', 'struct TrieNode { TrieNode* children[26]; bool is_end; } in C'],
        practiceGoal: 'Solve: Implement Trie (Prefix Tree - LeetCode 208) in C and Python'
      },
      {
        day: 'Sat',
        tasks: ['Autocomplete & Word Search II using Trie + Backtracking', 'Pruning recursive tree traversal using Trie prefix checks'],
        practiceGoal: 'Solve: Word Search II (LeetCode 212)'
      },
      {
        day: 'Sun',
        tasks: ['Month 3 Review: Halfway Milestone Evaluation!', 'Comprehensive 3-month review of C and Core DSA'],
        practiceGoal: 'Build a Mini In-Memory Key-Value Store with TTL in C'
      }
    ],
    keyMilestones: [
      'Mastered LRU Cache in pure C with manual memory deallocation',
      'Built a custom Hash Map with collision handling from scratch',
      'Understands Trie prefix structures for competitive string problems'
    ],
    recommendedProblems: ['lc-146-lru-cache']
  },

  // MONTH 4: DYNAMIC PROGRAMMING MASTERY (ADVANCED LEVEL)
  {
    weekNumber: 13,
    monthNumber: 4,
    title: 'Dynamic Programming: 1D DP & Linear Recurrences',
    goal: 'Demystify Dynamic Programming. Master State Formulation, Base Cases, and Transitions.',
    targetHours: 20,
    level: 'Advanced',
    phase: 'Month 4: Dynamic Programming Mastery',
    dailySchedule: [
      {
        day: 'Mon',
        tasks: ['DP Mental Model: 1. Optimal Substructure 2. Overlapping Subproblems', 'Top-Down (Recursion + Memoization) vs Bottom-Up (Tabulation)'],
        practiceGoal: 'Solve: Climbing Stairs & Min Cost Climbing Stairs'
      },
      {
        day: 'Tue',
        tasks: ['House Robber pattern: dp[i] = max(dp[i-1], dp[i-2] + nums[i])', 'Optimizing space from O(N) to O(1) rolling variables'],
        practiceGoal: 'Solve: House Robber I & II (LeetCode 198 & 213)'
      },
      {
        day: 'Wed',
        tasks: ['Unbounded Knapsack / Coin Change: dp[i] = min(dp[i - coin] + 1)', 'Iterating over states and inner choices'],
        practiceGoal: 'Solve: Coin Change (LeetCode 322) in C and Python'
      },
      {
        day: 'Thu',
        tasks: ['Coin Change II (Number of combinations) vs Combination Sum IV (Permutations)', 'Why loop order matters: coins outer = combinations, coins inner = permutations!'],
        practiceGoal: 'Solve: Coin Change II (LeetCode 518)'
      },
      {
        day: 'Fri',
        tasks: ['Longest Increasing Subsequence (LIS): O(N^2) DP formulation', 'dp[i] = 1 + max(dp[j]) for all j < i with nums[j] < nums[i]'],
        practiceGoal: 'Implement O(N^2) LIS in C and Python'
      },
      {
        day: 'Sat',
        tasks: ['Optimizing LIS to O(N log N) via Patience Sorting & Binary Search', 'Maintaining tails array where tails[len] is smallest tail'],
        practiceGoal: 'Solve: Longest Increasing Subsequence (LeetCode 300) in C & Python'
      },
      {
        day: 'Sun',
        tasks: ['Word Break: dp[i] represents if s[0...i] can be segmented', 'String hashing / lookup optimization'],
        practiceGoal: 'Solve: Word Break (LeetCode 139)'
      }
    ],
    keyMilestones: [
      'Understands how loop order differentiates combinations from permutations',
      'Can optimize 1D DP to O(1) space when only previous 2 states are needed',
      'Mastered LIS in O(N log N) using binary search'
    ],
    recommendedProblems: ['dsa-prob-coin-change', 'lc-300-longest-increasing-subsequence']
  },
  {
    weekNumber: 14,
    monthNumber: 4,
    title: '2D DP: Grids, Paths & 0/1 Knapsack',
    goal: 'Master multi-dimensional state spaces and bounded resource allocation.',
    targetHours: 20,
    level: 'Advanced',
    phase: 'Month 4: Dynamic Programming Mastery',
    dailySchedule: [
      {
        day: 'Mon',
        tasks: ['Grid Paths: Unique Paths in an M x N matrix', 'dp[r][c] = dp[r-1][c] + dp[r][c-1], optimizing to 1D row buffer'],
        practiceGoal: 'Solve: Unique Paths I & II (LeetCode 62 & 63)'
      },
      {
        day: 'Tue',
        tasks: ['Minimum Path Sum in a grid with weights', 'In-place state updates vs separate DP table'],
        practiceGoal: 'Solve: Minimum Path Sum (LeetCode 64)'
      },
      {
        day: 'Wed',
        tasks: ['Classic 0/1 Knapsack formulation: Pick or Skip item i', 'dp[i][w] = max(dp[i-1][w], val[i] + dp[i-1][w - wt[i]])'],
        practiceGoal: 'Implement 0/1 Knapsack in C with 1D reverse loop'
      },
      {
        day: 'Thu',
        tasks: ['Partition Equal Subset Sum: Reduction to 0/1 Knapsack with target = sum / 2', 'Bitset optimization for subset sum in C'],
        practiceGoal: 'Solve: Partition Equal Subset Sum (LeetCode 416)'
      },
      {
        day: 'Fri',
        tasks: ['Target Sum: Transforming + and - signs into subset difference', 'subset(P) = (total + target) / 2'],
        practiceGoal: 'Solve: Target Sum (LeetCode 494)'
      },
      {
        day: 'Sat',
        tasks: ['Dungeon Game: Bottom-Right to Top-Left DP', 'Why working backwards is necessary when future health depends on state'],
        practiceGoal: 'Solve: Dungeon Game (LeetCode 174)'
      },
      {
        day: 'Sun',
        tasks: ['Weekly 2D DP Drilling & Memory Profiling in C', 'Compare C flat 1D index dp[r * cols + c] vs 2D pointer array dp[r][c]'],
        practiceGoal: 'Review 0/1 Knapsack space optimization'
      }
    ],
    keyMilestones: [
      'Knows how to optimize 2D knapsack DP to a single 1D array by traversing backwards',
      'Can identify 0/1 Knapsack variants disguised as math or partition problems',
      'Understands cache locality: flat 1D array is 10x faster than pointer-to-pointer 2D array in C'
    ],
    recommendedProblems: ['dsa-prob-coin-change']
  },
  {
    weekNumber: 15,
    monthNumber: 4,
    title: 'String DP: LCS, Edit Distance & Palindromes',
    goal: 'Master DP on two sequences, string transformation, and interval palindromes.',
    targetHours: 20,
    level: 'Advanced',
    phase: 'Month 4: Dynamic Programming Mastery',
    dailySchedule: [
      {
        day: 'Mon',
        tasks: ['Longest Common Subsequence (LCS) 2D state machine', 'If s1[i-1] == s2[j-1]: 1 + dp[i-1][j-1]; else: max(dp[i-1][j], dp[i][j-1])'],
        practiceGoal: 'Solve: Longest Common Subsequence (LeetCode 1143) in C & Python'
      },
      {
        day: 'Tue',
        tasks: ['Edit Distance (Levenshtein): Insert, Delete, Replace costs', 'Reconstructing the edit script / operations'],
        practiceGoal: 'Solve: Edit Distance (LeetCode 72)'
      },
      {
        day: 'Wed',
        tasks: ['Longest Palindromic Substring: Expand from center vs 2D DP', 'O(N^2) center expansion with O(1) space'],
        practiceGoal: 'Solve: Longest Palindromic Substring (LeetCode 5)'
      },
      {
        day: 'Thu',
        tasks: ['Longest Palindromic Subsequence: Interval DP dp[i][j] on substrings', 'Iterating by substring length len from 2 to N'],
        practiceGoal: 'Solve: Longest Palindromic Subsequence (LeetCode 516)'
      },
      {
        day: 'Fri',
        tasks: ['Distinct Subsequences: Counting paths in string matching', 'dp[i][j] = dp[i-1][j] + (s[i-1] == t[j-1] ? dp[i-1][j-1] : 0)'],
        practiceGoal: 'Solve: Distinct Subsequences (LeetCode 115)'
      },
      {
        day: 'Sat',
        tasks: ['Regular Expression Matching (with . and *)', 'Handling zero-or-more preceding character transitions'],
        practiceGoal: 'Solve: Regular Expression Matching (LeetCode 10)'
      },
      {
        day: 'Sun',
        tasks: ['Weekly String DP Review & Reconstructing DP Solutions', 'Backtracking through DP tables to print actual subsequence strings in C'],
        practiceGoal: 'Write LCS string reconstruction function'
      }
    ],
    keyMilestones: [
      'Mastered 2D sequence alignment DP (LCS & Edit Distance)',
      'Understands Interval DP (outer loop is substring length)',
      'Can reconstruct optimal solution path from DP matrices'
    ],
    recommendedProblems: ['lc-3-longest-substring-without-repeating-characters']
  },
  {
    weekNumber: 16,
    monthNumber: 4,
    title: 'Advanced DP: Bitmask DP & Tree DP',
    goal: 'Tackle the most challenging DP paradigms tested in competitive programming and top-tier interviews.',
    targetHours: 22,
    level: 'Advanced',
    phase: 'Month 4: Dynamic Programming Mastery',
    dailySchedule: [
      {
        day: 'Mon',
        tasks: ['Bitmask DP: Representing visited sets of elements as integer bits', 'State space: dp[mask][curr] where mask has 2^N states (N <= 20)'],
        practiceGoal: 'Implement Travelling Salesperson Problem (TSP) in C'
      },
      {
        day: 'Tue',
        tasks: ['Bitmask DP practice: Matchsticks to Square / Partition to K Equal Sum Subsets', 'Submask enumeration tricks: for (sub = mask; sub; sub = (sub - 1) & mask)'],
        practiceGoal: 'Solve: Matchsticks to Square (LeetCode 473)'
      },
      {
        day: 'Wed',
        tasks: ['Tree DP: Aggregating decisions across subtrees', 'Two-pass Tree DP (rerooting technique)'],
        practiceGoal: 'Solve: House Robber III (LeetCode 337) & Binary Tree Cameras'
      },
      {
        day: 'Thu',
        tasks: ['Digit DP: Counting numbers in range [L, R] satisfying conditions', 'State: (index, tight, leading_zero, condition)'],
        practiceGoal: 'Study Digit DP template and solve Numbers At Most N Given Digit Set'
      },
      {
        day: 'Fri',
        tasks: ['Matrix Exponentiation for linear recurrences in O(K^3 log N)', 'Computing N-th Fibonacci for N = 10^18 in milliseconds'],
        practiceGoal: 'Implement Matrix Multiplication and Fast Matrix Power in C'
      },
      {
        day: 'Sat',
        tasks: ['DP on Broken Profile / Domino Tilting', 'Tiling an M x N grid with dominoes using bitmasks'],
        practiceGoal: 'Solve: Domino and Tromino Tiling (LeetCode 790)'
      },
      {
        day: 'Sun',
        tasks: ['Month 4 Capstone: DP Grand Slam (5 mixed DP problems in 3 hours)', 'Detailed time/space complexity audit of DP algorithms'],
        practiceGoal: 'Full DP Marathon Self-Assessment'
      }
    ],
    keyMilestones: [
      'Fluent in Bitmask state representation and submask iteration',
      'Comfortable with Tree DP postorder returns',
      'Understands how Matrix Exponentiation supercharges linear recurrences'
    ],
    recommendedProblems: ['lc-124-binary-tree-maximum-path-sum']
  },

  // MONTH 5: ADVANCED COMPETITIVE PROGRAMMING & INTERVIEW VAULT (ADVANCED LEVEL)
  {
    weekNumber: 17,
    monthNumber: 5,
    title: 'Range Queries: Segment Trees & Fenwick Trees (BIT)',
    goal: 'Handle dynamic point updates and range sum / min queries in O(log N).',
    targetHours: 20,
    level: 'Advanced',
    phase: 'Month 5: Advanced CP & Interview Blitz',
    dailySchedule: [
      {
        day: 'Mon',
        tasks: ['Binary Indexed Tree (Fenwick Tree / BIT) theory', 'Index arithmetic: lowest set bit isolation with idx & (-idx)'],
        practiceGoal: 'Implement Fenwick Tree in C with update() and query() in 15 lines'
      },
      {
        day: 'Tue',
        tasks: ['Range Sum Query - Mutable using BIT', 'Point update in O(log N), prefix query in O(log N)'],
        practiceGoal: 'Solve: Range Sum Query - Mutable (LeetCode 307)'
      },
      {
        day: 'Wed',
        tasks: ['Counting Inversions in array using Fenwick Tree', 'Coordinate compression technique for large value ranges'],
        practiceGoal: 'Solve: Count of Smaller Numbers After Self (LeetCode 315)'
      },
      {
        day: 'Thu',
        tasks: ['Segment Tree: Complete binary tree stored in array (size 4N)', 'Build, update, and range query in O(log N)'],
        practiceGoal: 'Build a standard Segment Tree for Range Minimum Query (RMQ) in C'
      },
      {
        day: 'Fri',
        tasks: ['Lazy Propagation on Segment Trees: Range updates in O(log N)', 'Pushing deferred updates down to child nodes'],
        practiceGoal: 'Implement Lazy Segment Tree in C'
      },
      {
        day: 'Sat',
        tasks: ['Sparse Table for Static RMQ in O(1) query and O(N log N) build', 'Idempotent operations: min(a, a) = a'],
        practiceGoal: 'Implement Sparse Table in C'
      },
      {
        day: 'Sun',
        tasks: ['Weekly Range Query Review: When to use BIT vs Segment Tree vs Sparse Table', 'Practice competitive programming range problems'],
        practiceGoal: 'Segment Tree vs BIT Benchmarks'
      }
    ],
    keyMilestones: [
      'Can code a Fenwick Tree from memory in 3 minutes',
      'Understands Segment Tree tree structure and Lazy Propagation',
      'Knows coordinate compression for handling 10^9 value ranges'
    ],
    recommendedProblems: ['lc-300-longest-increasing-subsequence']
  },
  {
    weekNumber: 18,
    monthNumber: 5,
    title: 'String Algorithms: KMP, Rabin-Karp & Z-Algorithm',
    goal: 'Master linear-time string matching and rolling hashes.',
    targetHours: 18,
    level: 'Advanced',
    phase: 'Month 5: Advanced CP & Interview Blitz',
    dailySchedule: [
      {
        day: 'Mon',
        tasks: ['Knuth-Morris-Pratt (KMP) Algorithm: Longest Prefix Suffix (LPS) array', 'Why KMP avoids backtracking the text pointer: O(N + M)'],
        practiceGoal: 'Implement LPS computation and KMP search in C'
      },
      {
        day: 'Tue',
        tasks: ['Find the Index of the First Occurrence in a String using KMP', 'Periodic string detection via LPS: n % (n - lps[n-1]) == 0'],
        practiceGoal: 'Solve: Repeated Substring Pattern (LeetCode 459)'
      },
      {
        day: 'Wed',
        tasks: ['Rabin-Karp Rolling Hash: Polynomial hashing with base and prime modulo', 'Handling hash collisions with double hashing'],
        practiceGoal: 'Implement Rabin-Karp rolling hash in C'
      },
      {
        day: 'Thu',
        tasks: ['Longest Duplicate Substring: Rolling Hash + Binary Search on length', 'Avoiding 64-bit overflow with __int128_t or double modulo'],
        practiceGoal: 'Solve: Longest Duplicate Substring (LeetCode 1044)'
      },
      {
        day: 'Fri',
        tasks: ['Z-Algorithm for pattern matching', 'Computing Z-array: length of longest common prefix between S and suffixes of S'],
        practiceGoal: 'Implement Z-Algorithm in pure C'
      },
      {
        day: 'Sat',
        tasks: ['Aho-Corasick Automaton concept (Trie + KMP failure links)', 'Multi-pattern dictionary matching in linear time'],
        practiceGoal: 'Study Aho-Corasick state machine'
      },
      {
        day: 'Sun',
        tasks: ['Weekly String Algorithms Checkpoint', 'Compare C memory buffer efficiency with Python str slicing'],
        practiceGoal: 'Benchmark KMP vs strstr() in glibc'
      }
    ],
    keyMilestones: [
      'Can construct KMP LPS table and explain failure transitions',
      'Understands polynomial rolling hashing for string searches',
      'Knows how to combine binary search with string hashing'
    ],
    recommendedProblems: ['c-prob-3-string-to-integer-atoi']
  },
  {
    weekNumber: 19,
    monthNumber: 5,
    title: 'LeetCode 75/150 Blitz: High-Frequency Classics',
    goal: 'Drill top-frequency interview questions asked by Meta, Google, Amazon, and Microsoft.',
    targetHours: 22,
    level: 'Advanced',
    phase: 'Month 5: Advanced CP & Interview Blitz',
    dailySchedule: [
      {
        day: 'Mon',
        tasks: ['Array & String Blitz: Product of Array Except Self, Gas Station', 'Prefix products from left and right in O(1) space'],
        practiceGoal: 'Solve: Product of Array Except Self (LeetCode 238) in C & Python'
      },
      {
        day: 'Tue',
        tasks: ['Intervals & Matrix Blitz: Spiral Matrix, Rotate Image (in-place transpose + reverse)', 'Manipulating 2D arrays purely with pointer arithmetic'],
        practiceGoal: 'Solve: Rotate Image (LeetCode 48) & Spiral Matrix'
      },
      {
        day: 'Wed',
        tasks: ['Linked List Hard: Reverse Nodes in k-Group', 'Pointer rewiring with counting and group chaining'],
        practiceGoal: 'Solve: Reverse Nodes in k-Group (LeetCode 25)'
      },
      {
        day: 'Thu',
        tasks: ['Sliding Window Hard: Minimum Window Substring', 'Two-pointer frequency counting with character deficit counters'],
        practiceGoal: 'Solve: Minimum Window Substring (LeetCode 76)'
      },
      {
        day: 'Fri',
        tasks: ['Monotonic Queue: Sliding Window Maximum in O(N)', 'Maintaining indices of decreasing elements in a deque'],
        practiceGoal: 'Solve: Sliding Window Maximum (LeetCode 239)'
      },
      {
        day: 'Sat',
        tasks: ['Hard Graph: Word Ladder (Bidirectional BFS)', 'Meeting in the middle to reduce search space from O(B^D) to O(2 * B^(D/2))'],
        practiceGoal: 'Solve: Word Ladder (LeetCode 127)'
      },
      {
        day: 'Sun',
        tasks: ['Weekly Speed Test: Solve 4 LeetCode Mediums in 70 minutes', 'Detailed error analysis and time management audit'],
        practiceGoal: 'Speed Drill Challenge'
      }
    ],
    keyMilestones: [
      'Solved Reverse Nodes in k-Group and Minimum Window Substring',
      'Understands Monotonic Queue for sliding window maximum in O(N)',
      'Mastered Bidirectional BFS search reduction'
    ],
    recommendedProblems: ['lc-15-three-sum', 'lc-146-lru-cache', 'lc-42-trapping-rain-water']
  },
  {
    weekNumber: 20,
    monthNumber: 5,
    title: 'Math, Number Theory & Bitwise CP Tricks',
    goal: 'Master fast I/O, modular arithmetic, prime sieves, GCD, and bit hacks for competitive programming.',
    targetHours: 18,
    level: 'Advanced',
    phase: 'Month 5: Advanced CP & Interview Blitz',
    dailySchedule: [
      {
        day: 'Mon',
        tasks: ['Fast I/O in C: getchar_unlocked(), fread_unlocked() for mega-speed in Codeforces / LeetCode', 'Buffering input streams'],
        practiceGoal: 'Implement fast_scan_int() using getchar_unlocked in C'
      },
      {
        day: 'Tue',
        tasks: ['Prime numbers: Sieve of Eratosthenes in O(N log log N)', 'Linear Sieve (Euler’s Sieve) in O(N) with smallest prime factor (SPF)'],
        practiceGoal: 'Solve: Count Primes (LeetCode 204)'
      },
      {
        day: 'Wed',
        tasks: ['GCD & Extended Euclidean Algorithm: ax + by = gcd(a, b)', 'Modular Multiplicative Inverse via Fermat’s Little Theorem: a^(M-2) % M'],
        practiceGoal: 'Compute nCr % 1000000007 using precomputed factorials'
      },
      {
        day: 'Thu',
        tasks: ['Binary Exponentiation: Fast Power in O(log N)', 'Multiplying large integers modulo M without 64-bit overflow'],
        practiceGoal: 'Solve: Pow(x, n) (LeetCode 50)'
      },
      {
        day: 'Fri',
        tasks: ['Bitwise manipulation masterclass: Brian Kernighan, bitmasks, Single Number III', 'Finding two unique elements when all others appear twice'],
        practiceGoal: 'Solve: Single Number III (LeetCode 260) in C & Python'
      },
      {
        day: 'Sat',
        tasks: ['Gray Code, Submask generation, and builtin CPU instructions: __builtin_popcount, __builtin_clz', 'Hardware bit hacks'],
        practiceGoal: 'Solve: Gray Code (LeetCode 89)'
      },
      {
        day: 'Sun',
        tasks: ['Weekly Math & Bit Recap: Codeforces / AtCoder style problem set', 'Review bit manipulation cheat sheet'],
        practiceGoal: 'Complete Math & Bitwise Problem Set'
      }
    ],
    keyMilestones: [
      'Able to implement Sieve of Eratosthenes in 2 minutes',
      'Understands Modular Inverse and combinatorics modulo 10^9+7',
      'Proficient in Bitwise operations and hardware intrinsics'
    ],
    recommendedProblems: ['c-prob-7-single-number']
  },

  // MONTH 6: SPEED DRILLS, CONTESTS & TECHNICAL INTERVIEW MASTERY
  {
    weekNumber: 21,
    monthNumber: 6,
    title: 'Mock Technical Interview Week: Hard Graph & Tree Problems',
    goal: 'Simulate high-pressure whiteboard and live coding interviews with strict time limits.',
    targetHours: 20,
    level: 'Advanced',
    phase: 'Month 6: Interview Polish & Speed Drills',
    dailySchedule: [
      {
        day: 'Mon',
        tasks: ['Interview protocol: Clarify requirements, discuss edge cases, state brute-force, optimize, code cleanly, dry-run', 'Communication strategy'],
        practiceGoal: 'Mock Session 1: Binary Tree Maximum Path Sum (timed 25 min)'
      },
      {
        day: 'Tue',
        tasks: ['Critical Connections in a Network (Tarjan’s Bridges Algorithm)', 'DFS discovery times and lowest reachable ancestors'],
        practiceGoal: 'Solve: Critical Connections in a Network (LeetCode 1192)'
      },
      {
        day: 'Wed',
        tasks: ['Alien Dictionary: Topological Sort from lexicographical string ordering', 'Handling invalid inputs and cycle detection in character graph'],
        practiceGoal: 'Solve: Alien Dictionary (LeetCode 269)'
      },
      {
        day: 'Thu',
        tasks: ['Reconstruct Itinerary (Eulerian Path / Hierholzer’s Algorithm)', 'Visiting every edge exactly once in directed multigraph'],
        practiceGoal: 'Solve: Reconstruct Itinerary (LeetCode 332)'
      },
      {
        day: 'Fri',
        tasks: ['Serialize and Deserialize Binary Tree in C (preorder traversal with markers) and Python', 'Memory allocation for deserialized nodes'],
        practiceGoal: 'Solve: Serialize and Deserialize Binary Tree (LeetCode 297)'
      },
      {
        day: 'Sat',
        tasks: ['Mock Interview 2: 2 Mediums + 1 Hard under 60-minute time constraint', 'Simulate live coding environment without IDE autocompletion'],
        practiceGoal: 'Complete Full Timed Mock Interview'
      },
      {
        day: 'Sun',
        tasks: ['Mock Interview Post-Mortem: Code cleanliness, pointer safety, edge case handling', 'Identify remaining weak spots'],
        practiceGoal: 'Re-solve failed problems from scratch'
      }
    ],
    keyMilestones: [
      'Can clearly articulate thoughts and trade-offs before writing a single line of code',
      'Mastered Tarjan’s bridges algorithm and Eulerian paths',
      'Consistently writes bug-free tree recursion'
    ],
    recommendedProblems: ['lc-124-binary-tree-maximum-path-sum', 'lc-207-course-schedule']
  },
  {
    weekNumber: 22,
    monthNumber: 6,
    title: 'Low-Level Systems & C Interview Classics',
    goal: 'Ace C-specific and Systems Engineering interview rounds (pointers, concurrency basics, memory managers).',
    targetHours: 20,
    level: 'Advanced',
    phase: 'Month 6: Interview Polish & Speed Drills',
    dailySchedule: [
      {
        day: 'Mon',
        tasks: ['Memory Allocator internals: Implementing a simple malloc() and free() using sbrk() or mmap()', 'Free list management, block headers, and fragmentation'],
        practiceGoal: 'Build a minimal custom malloc in C'
      },
      {
        day: 'Tue',
        tasks: ['Memory alignment and padding deep dive: #pragma pack, offsetof() macro', 'CPU word alignment effects on cache performance'],
        practiceGoal: 'Calculate struct memory layouts with and without alignment'
      },
      {
        day: 'Wed',
        tasks: ['Endianness: Big-Endian vs Little-Endian detection at runtime', 'Network byte order (htons, htonl, ntohs, ntohl)'],
        practiceGoal: 'Write function to detect CPU endianness via char pointer and union'
      },
      {
        day: 'Thu',
        tasks: ['Volatile, static, extern, const, and register keyword semantics in C', 'How the compiler treats volatile in embedded and multithreaded code'],
        practiceGoal: 'Review storage classes and keyword edge cases'
      },
      {
        day: 'Fri',
        tasks: ['Circular Ring Buffer with thread-safety concepts (producer-consumer)', 'Atomic operations vs mutex locks'],
        practiceGoal: 'Implement a lock-free Single Producer Single Consumer (SPSC) Ring Buffer'
      },
      {
        day: 'Sat',
        tasks: ['Deep C Debugging: Inspecting core dumps, gdb commands, Valgrind memory leak logs, AddressSanitizer (-fsanitize=address)', 'Identifying buffer overflows'],
        practiceGoal: 'Debug buggy C snippets with intentional memory corruptions'
      },
      {
        day: 'Sun',
        tasks: ['C Mastery Quiz: 25 tricky low-level pointer and memory questions', 'C vs Python performance comparison report'],
        practiceGoal: 'Pass C Systems Engineering Readiness Test'
      }
    ],
    keyMilestones: [
      'Understands how heap allocators track metadata and free blocks',
      'Can explain volatile, static, and memory alignment without hesitation',
      'Proficient with AddressSanitizer and Valgrind tools'
    ],
    recommendedProblems: ['c-prob-6-min-stack', 'lc-146-lru-cache']
  },
  {
    weekNumber: 23,
    monthNumber: 6,
    title: 'Competitive Programming Contest Speed & Strategy',
    goal: 'Maximize speed, test case synthesis, and error-free execution for timed contests.',
    targetHours: 20,
    level: 'Advanced',
    phase: 'Month 6: Interview Polish & Speed Drills',
    dailySchedule: [
      {
        day: 'Mon',
        tasks: ['Contest strategy: Skimming all problems, tackling easy first, timeboxing hard problems', 'Generating edge test cases before submitting'],
        practiceGoal: 'Simulate LeetCode Weekly Contest in 90 minutes'
      },
      {
        day: 'Tue',
        tasks: ['Stress Testing: Writing a brute-force validator and random test generator to find counter-examples', 'Shell scripting automated test loops in C'],
        practiceGoal: 'Build an automated stress tester for a tricky array problem'
      },
      {
        day: 'Wed',
        tasks: ['Median of Two Sorted Arrays: Binary search on partition in O(log(min(m, n)))', 'Handling even vs odd combined lengths'],
        practiceGoal: 'Solve: Median of Two Sorted Arrays (LeetCode 4) in C & Python'
      },
      {
        day: 'Thu',
        tasks: ['Shortest Palindrome / Palindrome Pairs using Trie and Hashing', 'Advanced string optimization'],
        practiceGoal: 'Solve: Shortest Palindrome (LeetCode 214)'
      },
      {
        day: 'Fri',
        tasks: ['Burst Balloons: Interval DP with reverse thinking (which balloon is popped LAST)', 'dp[i][j] = max(nums[i-1]*nums[k]*nums[j+1] + dp[i][k-1] + dp[k+1][j])'],
        practiceGoal: 'Solve: Burst Balloons (LeetCode 312)'
      },
      {
        day: 'Sat',
        tasks: ['Full Contest Simulation 2: Codeforces Div 2 or LeetCode Biweekly', 'Zero-WA (Wrong Answer) discipline'],
        practiceGoal: 'Score > 85th percentile on simulated contest'
      },
      {
        day: 'Sun',
        tasks: ['Post-contest analysis, upsolving missed problems, and updating personal cheat sheet', 'Celebrate progress from Month 1!'],
        practiceGoal: 'Upsolve all contest misses'
      }
    ],
    keyMilestones: [
      'Can write random test case generators to debug edge case failures',
      'Solved classic hard interval DP (Burst Balloons)',
      'Substantially reduced bug rate on first submissions'
    ],
    recommendedProblems: ['lc-42-trapping-rain-water', 'lc-33-search-in-rotated-sorted-array']
  },
  {
    weekNumber: 24,
    monthNumber: 6,
    title: 'Final Mastery Capstone & Interview Readiness',
    goal: 'Consolidate 6 months of hard work. Walk into any technical interview or contest with complete confidence.',
    targetHours: 18,
    level: 'Advanced',
    phase: 'Month 6: Interview Polish & Speed Drills',
    dailySchedule: [
      {
        day: 'Mon',
        tasks: ['Comprehensive Revision: Review all personal notes, bookmarks, and past mistakes', 'Re-read the C Memory Model & Pointer Rules cheat sheet'],
        practiceGoal: 'Rapid fire: Solve 5 warm-up Easies in 30 minutes'
      },
      {
        day: 'Tue',
        tasks: ['High-Frequency Pattern Blitz: Two Pointers, Sliding Window, Monotonic Stack, BFS/DFS, Topo Sort, DP', 'Mentally map problem statements to patterns in 10 seconds'],
        practiceGoal: 'Solve 3 top-tier Mediums without IDE'
      },
      {
        day: 'Wed',
        tasks: ['Final C Language Systems Audit: Pointer arithmetic, dynamic memory, structs, bitwise operations', 'Verify dual C and Python fluency'],
        practiceGoal: 'Implement LRU Cache & Min Stack from scratch in under 20 minutes each'
      },
      {
        day: 'Thu',
        tasks: ['Behavioral & Technical Interview Communication rehearsal', 'Practicing explaining time/space complexities and trade-offs out loud'],
        practiceGoal: 'Full verbal walkthrough of 4 complex algorithms'
      },
      {
        day: 'Fri',
        tasks: ['Final Full-Stack DSA Evaluation: 1 Easy, 2 Medium, 1 Hard (LeetCode simulation)', 'Timed 90-minute capstone test'],
        practiceGoal: 'Complete the 6-Month Graduation Challenge'
      },
      {
        day: 'Sat',
        tasks: ['Rest, mental recovery, and preparation of ongoing revision schedule', 'Setting up daily 1-problem maintenance habit'],
        practiceGoal: 'Establish post-program maintenance routine'
      },
      {
        day: 'Sun',
        tasks: ['Graduation Day! Review 6-month progress analytics and mastered topic count', 'You are ready to crush technical interviews and competitive programming.'],
        practiceGoal: 'Celebrate your 6-month mastery journey!'
      }
    ],
    keyMilestones: [
      'Mastered C Language from bare-metal memory to custom high-performance data structures',
      'Mastered Data Structures & Algorithms from basics to advanced competitive levels',
      'Fluent in both C and Python solutions for any interview problem',
      'Equipped with a solid foundation for top-tier technical interviews and competitive programming'
    ],
    recommendedProblems: ['lc-15-three-sum', 'lc-146-lru-cache', 'lc-42-trapping-rain-water', 'lc-124-binary-tree-maximum-path-sum']
  }
];
