import { DSATopicModule } from '../types';

export const DSA_CURRICULUM: DSATopicModule[] = [
  {
    id: 'dsa-arrays-two-pointers',
    title: '1. Arrays, Two Pointers & Sliding Window',
    level: 'Basics',
    category: 'Linear Structures',
    overview:
      'The bedrock of technical interviews and competitive programming. Master pointer manipulation, contiguous subarrays, sliding windows, prefix sums, and two-pointer narrowing.',
    keyPatterns: [
      {
        patternName: 'Two Pointers (Opposite Direction)',
        description: 'Used on sorted arrays to search pairs or partition in O(N) instead of O(N^2).',
        whenToUse: 'Finding pair sum, reversing arrays, container with most water, trapping rainwater.',
        templateC: `int left = 0, right = n - 1;
while (left < right) {
    int sum = arr[left] + arr[right];
    if (sum == target) { /* found */ break; }
    else if (sum < target) { left++; }
    else { right--; }
}`,
        templatePython: `left, right = 0, len(arr) - 1
while left < right:
    total = arr[left] + arr[right]
    if total == target:
        break
    elif total < target:
        left += 1
    else:
        right -= 1`
      },
      {
        patternName: 'Dynamic Sliding Window',
        description: 'Expands right pointer to include elements, contracts left pointer when window condition is violated.',
        whenToUse: 'Substrings with distinct characters, longest subarray meeting condition, minimum window substring.',
        templateC: `int left = 0, max_len = 0;
for (int right = 0; right < n; right++) {
    // Add arr[right] to window state
    while (/* condition invalid */) {
        // Remove arr[left] from window state
        left++;
    }
    int len = right - left + 1;
    if (len > max_len) max_len = len;
}`,
        templatePython: `left = 0
max_len = 0
for right in range(len(arr)):
    # update window state with arr[right]
    while not condition_valid():
        # shrink window from left
        left += 1
    max_len = max(max_len, right - left + 1)`
      }
    ],
    timeSpaceSummary: [
      { operation: 'Access by Index', timeComplexity: 'O(1)', spaceComplexity: 'O(1)', notes: 'Direct memory offset calculation' },
      { operation: 'Two Pointers Scan', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', notes: 'Each pointer visits at most N items' },
      { operation: 'Sliding Window', timeComplexity: 'O(N)', spaceComplexity: 'O(K)', notes: 'Amortized 2N operations total' }
    ],
    problems: [
      {
        id: 'dsa-prob-two-sum',
        title: 'Two Sum',
        difficulty: 'Easy',
        level: 'Basics',
        category: 'Arrays & Hashing',
        leetcodeNumber: 1,
        description:
          'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume each input has exactly one solution, and you may not use the same element twice.',
        inputExample: 'nums = [2,7,11,15], target = 9 -> Output: [0,1]',
        outputExample: '[0,1]',
        constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', 'Exactly one valid answer exists'],
        approach: {
          intuition:
            'For every number x, we need to know if complement = target - x was seen before. Using a Hash Map allows us to check existence in O(1) time instead of O(N^2) double loop.',
          stepByStep: [
            'Create a hash map mapping value -> original array index.',
            'Iterate through nums at index i.',
            'Calculate complement = target - nums[i].',
            'If complement exists in hash map, return [hash_map[complement], i].',
            'Else, store nums[i] -> i in hash map.'
          ],
          dryRun:
            'nums = [2, 7, 11, 15], target = 9\ni = 0: nums[0]=2, complement=7. Map is empty. Store {2: 0}.\ni = 1: nums[1]=7, complement=2. Found in Map at index 0!\nReturn [0, 1].',
          edgeCases: ['Duplicate values that sum to target (e.g. [3, 3], target=6)', 'Negative numbers']
        },
        timeComplexity: 'O(N) - single pass over array',
        spaceComplexity: 'O(N) - hash map stores at most N elements',
        solution: {
          c: `/**
 * Note: In pure C, standard library lacks built-in hash map.
 * We implement a clean hash table with linear probing / chaining.
 */
#include <stdio.h>
#include <stdlib.h>

#define HASH_SIZE 2048

typedef struct HashNode {
    int key;
    int value;
    struct HashNode *next;
} HashNode;

typedef struct {
    HashNode *buckets[HASH_SIZE];
} HashMap;

unsigned int hash(int key) {
    // Handle negative numbers cleanly
    return (unsigned int)(key * 2654435761u) % HASH_SIZE;
}

void hash_put(HashMap *map, int key, int value) {
    unsigned int idx = hash(key);
    HashNode *node = (HashNode*)malloc(sizeof(HashNode));
    node->key = key;
    node->value = value;
    node->next = map->buckets[idx];
    map->buckets[idx] = node;
}

int hash_get(HashMap *map, int key, int *found) {
    unsigned int idx = hash(key);
    HashNode *curr = map->buckets[idx];
    while (curr) {
        if (curr->key == key) {
            *found = 1;
            return curr->value;
        }
        curr = curr->next;
    }
    *found = 0;
    return -1;
}

void hash_free(HashMap *map) {
    for (int i = 0; i < HASH_SIZE; i++) {
        HashNode *curr = map->buckets[i];
        while (curr) {
            HashNode *tmp = curr;
            curr = curr->next;
            free(tmp);
        }
    }
}

int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    *returnSize = 2;
    int *res = (int*)malloc(2 * sizeof(int));
    HashMap map = {0};

    for (int i = 0; i < numsSize; i++) {
        int complement = target - nums[i];
        int found = 0;
        int comp_idx = hash_get(&map, complement, &found);
        if (found) {
            res[0] = comp_idx;
            res[1] = i;
            hash_free(&map);
            return res;
        }
        hash_put(&map, nums[i], i);
    }

    hash_free(&map);
    return res;
}

int main(void) {
    int nums[] = {2, 7, 11, 15};
    int returnSize;
    int *res = twoSum(nums, 4, 9, &returnSize);
    printf("Indices: [%d, %d]\\n", res[0], res[1]); // [0, 1]
    free(res);
    return 0;
}`,
          python: `def two_sum(nums: list[int], target: int) -> list[int]:
    # In Python, dict uses SipHash with O(1) average lookup
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Test
print(two_sum([2, 7, 11, 15], 9)) # [0, 1]`
        }
      },
      {
        id: 'dsa-prob-container-most-water',
        title: 'Container With Most Water',
        difficulty: 'Medium',
        level: 'Basics',
        category: 'Two Pointers',
        leetcodeNumber: 11,
        description:
          'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water. Return maximum water area.',
        inputExample: 'height = [1,8,6,2,5,4,8,3,7] -> Output: 49',
        outputExample: '49',
        constraints: ['n == height.length', '2 <= n <= 10^5', '0 <= height[i] <= 10^4'],
        approach: {
          intuition:
            'Start with widest possible container (left = 0, right = n - 1). The area is limited by min(height[left], height[right]). Moving the taller line inward could only decrease the width without increasing the bottleneck height! Thus, always move the pointer of the SHORTER line inward.',
          stepByStep: [
            'Initialize left = 0, right = n - 1, max_area = 0.',
            'While left < right:',
            'Calculate width = right - left.',
            'h = min(height[left], height[right]).',
            'max_area = max(max_area, width * h).',
            'If height[left] < height[right], left++; else right--;',
            'Return max_area.'
          ],
          dryRun:
            'height = [1,8,6,2,5,4,8,3,7]\nleft=0 (h=1), right=8 (h=7): area=8*1=8 -> left++\nleft=1 (h=8), right=8 (h=7): area=7*7=49 -> right--\nleft=1 (h=8), right=7 (h=3): area=6*3=18 -> right--\n...\nMax is 49.',
          edgeCases: ['Two equal heights', 'Array of size 2']
        },
        timeComplexity: 'O(N) - each step eliminates one line',
        spaceComplexity: 'O(1) - constant memory',
        solution: {
          c: `#include <stdio.h>

#define MIN(a, b) ((a) < (b) ? (a) : (b))
#define MAX(a, b) ((a) > (b) ? (a) : (b))

int maxArea(int* height, int heightSize) {
    int left = 0;
    int right = heightSize - 1;
    int max_water = 0;

    while (left < right) {
        int width = right - left;
        int h = MIN(height[left], height[right]);
        int area = width * h;
        max_water = MAX(max_water, area);

        // Always advance the shorter wall
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return max_water;
}

int main(void) {
    int h[] = {1, 8, 6, 2, 5, 4, 8, 3, 7};
    printf("Max water: %d\\n", maxArea(h, 9)); // 49
    return 0;
}`,
          python: `def max_area(height: list[int]) -> int:
    left, right = 0, len(height) - 1
    max_water = 0
    
    while left < right:
        width = right - left
        h = min(height[left], height[right])
        max_water = max(max_water, width * h)
        
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
            
    return max_water

print(max_area([1, 8, 6, 2, 5, 4, 8, 3, 7])) # 49`
        }
      }
    ]
  },
  {
    id: 'dsa-linked-lists',
    title: '2. Linked Lists & Fast-Slow Pointers',
    level: 'Basics',
    category: 'Linear Structures',
    overview:
      'Understanding pointers in node-based structures. Floyd’s Cycle Detection (Tortoise & Hare), in-place pointer reversal, and sentinel dummy nodes.',
    keyPatterns: [
      {
        patternName: 'Fast & Slow Pointers (Floyd’s Algorithm)',
        description: 'Slow moves 1 step, fast moves 2 steps. Detects cycles and finds middle of list in one pass.',
        whenToUse: 'Detecting loop in linked list, middle of linked list, palindrome linked list.',
        templateC: `ListNode *slow = head, *fast = head;
while (fast != NULL && fast->next != NULL) {
    slow = slow->next;
    fast = fast->next->next;
    if (slow == fast) { /* cycle detected */ }
}`,
        templatePython: `slow = fast = head
while fast and fast.next:
    slow = slow.next
    fast = fast.next.next
    if slow == fast:
        # Cycle detected
        pass`
      },
      {
        patternName: 'In-Place Pointer Reversal',
        description: 'Iteratively rewire next pointers using three pointers: prev, curr, next.',
        whenToUse: 'Reversing list, reverse nodes in k-group, palindrome check.',
        templateC: `ListNode *prev = NULL, *curr = head;
while (curr) {
    ListNode *nxt = curr->next;
    curr->next = prev;
    prev = curr;
    curr = nxt;
}
return prev;`,
        templatePython: `prev, curr = None, head
while curr:
    nxt = curr.next
    curr.next = prev
    prev = curr
    curr = nxt
return prev`
      }
    ],
    timeSpaceSummary: [
      { operation: 'Prepend / Append at known tail', timeComplexity: 'O(1)', spaceComplexity: 'O(1)', notes: 'Pointer update only' },
      { operation: 'Search / Access by index', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', notes: 'Must traverse from head' },
      { operation: 'In-Place Reversal', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', notes: 'Zero memory allocation' }
    ],
    problems: [
      {
        id: 'dsa-prob-reverse-linked-list',
        title: 'Reverse Linked List',
        difficulty: 'Easy',
        level: 'Basics',
        category: 'Linked List',
        leetcodeNumber: 206,
        description:
          'Given the head of a singly linked list, reverse the list, and return the reversed list.',
        inputExample: 'head = [1,2,3,4,5] -> Output: [5,4,3,2,1]',
        outputExample: '[5,4,3,2,1]',
        constraints: ['The number of nodes in the list is the range [0, 5000]', '-5000 <= Node.val <= 5000'],
        approach: {
          intuition:
            'For each node, we want its next pointer to point backwards to the preceding node. Maintain prev (initially NULL), curr (head), and save next_temp before overwriting curr->next.',
          stepByStep: [
            'Initialize prev = NULL, curr = head.',
            'While curr != NULL:',
            'Save next_node = curr->next.',
            'Point curr->next = prev.',
            'Move prev = curr.',
            'Move curr = next_node.',
            'Return prev (new head).'
          ],
          dryRun:
            '1 -> 2 -> 3\n1. curr=1: next=2, 1->NULL, prev=1, curr=2\n2. curr=2: next=3, 2->1, prev=2, curr=3\n3. curr=3: next=NULL, 3->2, prev=3, curr=NULL\nReturn prev=3 (3->2->1->NULL).',
          edgeCases: ['Empty list (head = NULL)', 'Single node list']
        },
        timeComplexity: 'O(N) - visits each node once',
        spaceComplexity: 'O(1) - pointer rewiring in place',
        solution: {
          c: `#include <stdio.h>
#include <stdlib.h>

struct ListNode {
    int val;
    struct ListNode *next;
};

struct ListNode* reverseList(struct ListNode* head) {
    struct ListNode *prev = NULL;
    struct ListNode *curr = head;

    while (curr != NULL) {
        struct ListNode *next_temp = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next_temp;
    }

    return prev; // prev is the new head
}

int main(void) {
    struct ListNode n3 = {3, NULL};
    struct ListNode n2 = {2, &n3};
    struct ListNode n1 = {1, &n2};

    struct ListNode *rev = reverseList(&n1);
    while (rev) {
        printf("%d -> ", rev->val); // 3 -> 2 -> 1 ->
        rev = rev->next;
    }
    printf("NULL\\n");
    return 0;
}`,
          python: `from typing import Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head: Optional[ListNode]) -> Optional[ListNode]:
    prev = None
    curr = head
    while curr:
        next_temp = curr.next
        curr.next = prev
        prev = curr
        curr = next_temp
    return prev`
        }
      }
    ]
  },
  {
    id: 'dsa-stacks-queues',
    title: '3. Stacks, Monotonic Stacks & Queues',
    level: 'Moderate',
    category: 'Linear Structures',
    overview:
      'LIFO and FIFO mechanics. Monotonic Stack is a secret weapon in competitive programming for finding Next Greater / Smaller Element in O(N).',
    keyPatterns: [
      {
        patternName: 'Monotonic Stack (Decreasing)',
        description: 'Maintains elements in strictly decreasing order. Used to find next greater element.',
        whenToUse: 'Daily temperatures, largest rectangle in histogram, trapping rain water.',
        templateC: `int stack[n], top = -1;
for (int i = 0; i < n; i++) {
    while (top >= 0 && arr[stack[top]] < arr[i]) {
        int idx = stack[top--];
        res[idx] = arr[i]; // Next greater element found!
    }
    stack[++top] = i;
}`,
        templatePython: `stack = [] # stores indices
for i, val in enumerate(arr):
    while stack and arr[stack[-1]] < val:
        idx = stack.pop()
        res[idx] = val # Next greater element
    stack.append(i)`
      }
    ],
    timeSpaceSummary: [
      { operation: 'Push / Pop', timeComplexity: 'O(1)', spaceComplexity: 'O(1)', notes: 'Direct stack pointer movement' },
      { operation: 'Monotonic Stack Pass', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', notes: 'Each index pushed and popped at most once' }
    ],
    problems: [
      {
        id: 'dsa-prob-valid-parentheses',
        title: 'Valid Parentheses',
        difficulty: 'Easy',
        level: 'Basics',
        category: 'Stack',
        leetcodeNumber: 20,
        description:
          'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
        inputExample: 's = "()[]{}" -> Output: true\ns = "(]" -> Output: false',
        outputExample: 'true',
        constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only ()[]{}'],
        approach: {
          intuition:
            'Use a stack: push corresponding closing brackets when an opening bracket is seen. When a closing bracket is encountered, it must match the top of the stack.',
          stepByStep: [
            'Create stack of size len(s).',
            'For each char c in s:',
            'If c is "(", push ")".',
            'Else if c is "{", push "}".',
            'Else if c is "[", push "]".',
            'Else: if stack is empty or pop() != c, return false.',
            'Return true if stack is empty.'
          ],
          dryRun:
            's = "([)]"\n\'(\' -> push \')\'\n\'[\' -> push \']\'\n\')\' -> pop() is \']\' != \')\' -> invalid! return false.',
          edgeCases: ['Odd length string (instant false)', 'Starts with closing bracket', 'Unclosed opening brackets']
        },
        timeComplexity: 'O(N) - single pass',
        spaceComplexity: 'O(N) - stack buffer',
        solution: {
          c: `#include <stdbool.h>
#include <stdio.h>
#include <string.h>

bool isValid(char* s) {
    int len = strlen(s);
    if (len % 2 != 0) return false;

    char stack[len + 1];
    int top = -1;

    for (int i = 0; i < len; i++) {
        char c = s[i];
        if (c == '(') {
            stack[++top] = ')';
        } else if (c == '{') {
            stack[++top] = '}';
        } else if (c == '[') {
            stack[++top] = ']';
        } else {
            if (top == -1 || stack[top] != c) {
                return false;
            }
            top--;
        }
    }

    return top == -1;
}

int main(void) {
    printf("()[]{} is valid: %s\\n", isValid("()[]{}") ? "true" : "false");
    printf("(] is valid: %s\\n", isValid("(]") ? "true" : "false");
    return 0;
}`,
          python: `def is_valid(s: str) -> bool:
    if len(s) % 2 != 0:
        return False
        
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping:
            top_element = stack.pop() if stack else '#'
            if mapping[char] != top_element:
                return False
        else:
            stack.append(char)
            
    return not stack

print(is_valid("()[]{}")) # True
print(is_valid("(]"))     # False`
        }
      }
    ]
  },
  {
    id: 'dsa-binary-trees-bst',
    title: '4. Binary Trees, BST & Tree Traversals',
    level: 'Moderate',
    category: 'Hierarchical Structures',
    overview:
      'Tree recursion, DFS (Preorder, Inorder, Postorder), BFS (Level Order), BST properties, LCA, and Tree DP.',
    keyPatterns: [
      {
        patternName: 'DFS Tree Recursion (Divide & Conquer)',
        description: 'Solve for left subtree, solve for right subtree, combine answers at current node.',
        whenToUse: 'Max depth, diameter, path sum, invert tree, tree validation.',
        templateC: `int dfs(TreeNode *root) {
    if (!root) return 0;
    int left = dfs(root->left);
    int right = dfs(root->right);
    return 1 + (left > right ? left : right);
}`,
        templatePython: `def dfs(root):
    if not root:
        return 0
    left = dfs(root.left)
    right = dfs(root.right)
    return 1 + max(left, right)`
      }
    ],
    timeSpaceSummary: [
      { operation: 'Tree Traversals (DFS/BFS)', timeComplexity: 'O(N)', spaceComplexity: 'O(H)', notes: 'H = height of tree (log N balanced, N skewed)' },
      { operation: 'BST Search/Insert', timeComplexity: 'O(H)', spaceComplexity: 'O(H)', notes: 'O(log N) if balanced' }
    ],
    problems: [
      {
        id: 'dsa-prob-max-depth-tree',
        title: 'Maximum Depth of Binary Tree',
        difficulty: 'Easy',
        level: 'Moderate',
        category: 'Binary Tree',
        leetcodeNumber: 104,
        description: 'Given the root of a binary tree, return its maximum depth (number of nodes along longest path from root to furthest leaf).',
        inputExample: 'root = [3,9,20,null,null,15,7] -> Output: 3',
        outputExample: '3',
        constraints: ['The number of nodes in the tree is in the range [0, 10^4]', '-100 <= Node.val <= 100'],
        approach: {
          intuition:
            'If root is null, depth is 0. Otherwise, depth is 1 + max(depth(left), depth(right)). Pure divide and conquer recursion.',
          stepByStep: ['Base case: if root == NULL, return 0.', 'Recursively compute left_depth = maxDepth(root->left).', 'Recursively compute right_depth = maxDepth(root->right).', 'Return 1 + max(left_depth, right_depth).'],
          dryRun: 'Node 3: left=9 (depth 1), right=20 (depth 2). Max(1, 2) + 1 = 3.',
          edgeCases: ['Empty tree (returns 0)', 'Single root node (returns 1)']
        },
        timeComplexity: 'O(N) - visits each node once',
        spaceComplexity: 'O(H) - call stack height',
        solution: {
          c: `#include <stdio.h>
#include <stdlib.h>

struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

int maxDepth(struct TreeNode* root) {
    if (root == NULL) return 0;
    int left = maxDepth(root->left);
    int right = maxDepth(root->right);
    return 1 + (left > right ? left : right);
}`,
          python: `from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def max_depth(root: Optional[TreeNode]) -> int:
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))`
        }
      }
    ]
  },
  {
    id: 'dsa-graphs-algorithms',
    title: '5. Graphs: BFS, DFS, Shortest Paths & Topo Sort',
    level: 'Advanced',
    category: 'Non-Linear Structures',
    overview:
      'Graph representations (adjacency list vs matrix), cycle detection, Kahn’s algorithm for Topological Sort, Dijkstra’s Single-Source Shortest Path, and Disjoint Set Union (Union-Find).',
    keyPatterns: [
      {
        patternName: 'BFS (Shortest Path in Unweighted Graph)',
        description: 'Queue-based level-order traversal. Guarantees shortest path in unweighted graphs.',
        whenToUse: 'Shortest path, word ladder, rotting oranges, connected components.',
        templateC: `int queue[MAX], head = 0, tail = 0;
queue[tail++] = start_node;
visited[start_node] = true;
while (head < tail) {
    int u = queue[head++];
    for (Edge *e = adj[u]; e; e = e->next) {
        if (!visited[e->to]) {
            visited[e->to] = true;
            queue[tail++] = e->to;
        }
    }
}`,
        templatePython: `from collections import deque
queue = deque([start_node])
visited = {start_node}
while queue:
    u = queue.popleft()
    for v in adj[u]:
        if v not in visited:
            visited.add(v)
            queue.append(v)`
      }
    ],
    timeSpaceSummary: [
      { operation: 'BFS / DFS Traversal', timeComplexity: 'O(V + E)', spaceComplexity: 'O(V)', notes: 'V = vertices, E = edges' },
      { operation: 'Dijkstra (with Min-Heap)', timeComplexity: 'O((V + E) log V)', spaceComplexity: 'O(V)', notes: 'Non-negative edge weights only' },
      { operation: 'Disjoint Set Union (DSU)', timeComplexity: 'O(alpha(N)) ~ O(1)', spaceComplexity: 'O(N)', notes: 'With path compression & union by rank' }
    ],
    problems: [
      {
        id: 'dsa-prob-num-islands',
        title: 'Number of Islands (Grid BFS/DFS)',
        difficulty: 'Medium',
        level: 'Moderate',
        category: 'Graph / Matrix',
        leetcodeNumber: 200,
        description:
          'Given an m x n 2D binary grid grid which represents a map of "1"s (land) and "0"s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.',
        inputExample: 'grid = [\n  ["1","1","0","0","0"],\n  ["1","1","0","0","0"],\n  ["0","0","1","0","0"],\n  ["0","0","0","1","1"]\n] -> Output: 3',
        outputExample: '3',
        constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 300', 'grid[i][j] is "0" or "1"'],
        approach: {
          intuition:
            'Iterate through every cell. When a "1" is found, increment island count and trigger a DFS/BFS sink operation that marks all connected land cells to "0" (or visited) to prevent double counting.',
          stepByStep: [
            'Loop through r from 0 to m-1, c from 0 to n-1.',
            'If grid[r][c] == "1":',
            'count++;',
            'Call sink(r, c) which marks grid[r][c] = "0" and recursively visits 4 orthogonal neighbors (r+1, r-1, c+1, c-1).',
            'Return count.'
          ],
          dryRun:
            'Scan finds (0,0)=\'1\'. Increment count=1. Sinks (0,0), (0,1), (1,0), (1,1). Next land found at (2,2) -> count=2. Next land at (3,3) -> count=3. Total: 3.',
          edgeCases: ['All water (returns 0)', 'All land (returns 1)', 'Grid dimensions 1x1']
        },
        timeComplexity: 'O(M * N) - each cell visited at most a constant number of times',
        spaceComplexity: 'O(M * N) - worst-case recursion stack',
        solution: {
          c: `#include <stdio.h>

void dfs(char** grid, int r, int c, int rows, int cols) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] != '1') {
        return;
    }

    // Sink the land
    grid[r][c] = '0';

    // Visit 4 neighbors
    dfs(grid, r + 1, c, rows, cols);
    dfs(grid, r - 1, c, rows, cols);
    dfs(grid, r, c + 1, rows, cols);
    dfs(grid, r, c - 1, rows, cols);
}

int numIslands(char** grid, int gridSize, int* gridColSize) {
    if (!grid || gridSize == 0) return 0;
    int rows = gridSize;
    int cols = gridColSize[0];
    int count = 0;

    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == '1') {
                count++;
                dfs(grid, r, c, rows, cols);
            }
        }
    }

    return count;
}`,
          python: `def num_islands(grid: list[list[str]]) -> int:
    if not grid:
        return 0
        
    rows, cols = len(grid), len(grid[0])
    count = 0
    
    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != '1':
            return
        grid[r][c] = '0' # mark visited
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
        
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)
                
    return count`
        }
      }
    ]
  },
  {
    id: 'dsa-dynamic-programming',
    title: '6. Dynamic Programming: 1D, 2D & Classic Paradigms',
    level: 'Advanced',
    category: 'Optimization & Recursion',
    overview:
      'The crown jewel of coding interviews. Optimal substructure and overlapping subproblems. 0/1 Knapsack, Coin Change, Longest Common Subsequence, and LIS.',
    keyPatterns: [
      {
        patternName: '1D State DP (Previous States)',
        description: 'dp[i] represents optimal answer up to index i, dependent on dp[i-1], dp[i-2], etc.',
        whenToUse: 'Climbing stairs, House Robber, Coin Change, Word Break.',
        templateC: `int dp[amount + 1];
// Initialize with infinity
for (int i = 1; i <= amount; i++) dp[i] = INF;
dp[0] = 0;
for (int i = 1; i <= amount; i++) {
    for (int c = 0; c < coinsSize; c++) {
        if (i >= coins[c] && dp[i - coins[c]] != INF) {
            dp[i] = MIN(dp[i], dp[i - coins[c]] + 1);
        }
    }
}`,
        templatePython: `dp = [float('inf')] * (amount + 1)
dp[0] = 0
for i in range(1, amount + 1):
    for coin in coins:
        if i >= coin:
            dp[i] = min(dp[i], dp[i - coin] + 1)`
      }
    ],
    timeSpaceSummary: [
      { operation: 'Coin Change (1D DP)', timeComplexity: 'O(amount * coins.length)', spaceComplexity: 'O(amount)', notes: 'Space optimizable to 1D array' },
      { operation: 'LCS (2D DP)', timeComplexity: 'O(M * N)', spaceComplexity: 'O(min(M, N))', notes: 'Using two rolling rows' }
    ],
    problems: [
      {
        id: 'dsa-prob-coin-change',
        title: 'Coin Change (Fewest Coins)',
        difficulty: 'Medium',
        level: 'Advanced',
        category: 'Dynamic Programming',
        leetcodeNumber: 322,
        description:
          'You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.',
        inputExample: 'coins = [1,2,5], amount = 11 -> Output: 3 (5 + 5 + 1)',
        outputExample: '3',
        constraints: ['1 <= coins.length <= 12', '1 <= coins[i] <= 2^31 - 1', '0 <= amount <= 10^4'],
        approach: {
          intuition:
            'Bottom-up DP: Let dp[i] be the minimum coins needed to make amount i. To compute dp[i], consider taking every coin c <= i: dp[i] = min(dp[i], 1 + dp[i - c]).',
          stepByStep: [
            'Create dp array of size amount + 1, initialized to amount + 1 (representing infinity).',
            'Set dp[0] = 0 (0 amount requires 0 coins).',
            'For i from 1 to amount:',
            '  For each coin in coins:',
            '    If i >= coin: dp[i] = min(dp[i], dp[i - coin] + 1).',
            'Return dp[amount] > amount ? -1 : dp[amount].'
          ],
          dryRun:
            'coins = [1, 2, 5], amount = 11\ndp[0]=0\ndp[1]=1 (1)\ndp[2]=min(dp[1]+1, dp[0]+1)=1 (2)\ndp[5]=1 (5)\ndp[11]=dp[6]+1 = 2+1 = 3 (5+5+1).',
          edgeCases: ['amount = 0 (returns 0)', 'Cannot form amount (e.g. coins=[2], amount=3 -> returns -1)']
        },
        timeComplexity: 'O(amount * len(coins))',
        spaceComplexity: 'O(amount) - 1D DP table',
        solution: {
          c: `#include <stdio.h>
#include <stdlib.h>

#define MIN(a, b) ((a) < (b) ? (a) : (b))

int coinChange(int* coins, int coinsSize, int amount) {
    if (amount == 0) return 0;

    int *dp = (int*)malloc((amount + 1) * sizeof(int));
    int INF = amount + 1;

    for (int i = 0; i <= amount; i++) {
        dp[i] = INF;
    }
    dp[0] = 0;

    for (int i = 1; i <= amount; i++) {
        for (int j = 0; j < coinsSize; j++) {
            if (i >= coins[j]) {
                dp[i] = MIN(dp[i], dp[i - coins[j]] + 1);
            }
        }
    }

    int result = (dp[amount] > amount) ? -1 : dp[amount];
    free(dp);
    return result;
}

int main(void) {
    int coins[] = {1, 2, 5};
    printf("Fewest coins for 11: %d\\n", coinChange(coins, 3, 11)); // 3
    return 0;
}`,
          python: `def coin_change(coins: list[int], amount: int) -> int:
    dp = [amount + 1] * (amount + 1)
    dp[0] = 0
    
    for i in range(1, amount + 1):
        for coin in coins:
            if i >= coin:
                dp[i] = min(dp[i], dp[i - coin] + 1)
                
    return dp[amount] if dp[amount] <= amount else -1

print(coin_change([1, 2, 5], 11)) # 3`
        }
      }
    ]
  }
];
