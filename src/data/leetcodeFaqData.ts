import { PracticeProblem } from '../types';

export const LEETCODE_FAQ_PROBLEMS: PracticeProblem[] = [
  {
    id: 'lc-15-three-sum',
    title: '3Sum',
    difficulty: 'Medium',
    level: 'Moderate',
    category: 'Two Pointers / Sorting',
    leetcodeNumber: 15,
    description:
      'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.',
    inputExample: 'nums = [-1,0,1,2,-1,-4] -> Output: [[-1,-1,2],[-1,0,1]]',
    outputExample: '[[-1,-1,2],[-1,0,1]]',
    constraints: ['3 <= nums.length <= 3000', '-10^5 <= nums[i] <= 10^5'],
    companyTags: ['Meta', 'Amazon', 'Apple', 'Google', 'Microsoft'],
    approach: {
      intuition:
        'Sorting the array allows us to fix the first number nums[i], and then reduce the problem to 2Sum using two pointers (left and right). To avoid duplicate triplets without slow hash sets, simply skip duplicate adjacent elements for i, left, and right.',
      stepByStep: [
        'Sort the array nums in ascending order using qsort in C or sort() in Python.',
        'Loop i from 0 to n - 3:',
        '  If nums[i] > 0, break early because three positive numbers cannot sum to zero.',
        '  If i > 0 and nums[i] == nums[i - 1], skip duplicate.',
        '  Set left = i + 1, right = n - 1.',
        '  While left < right:',
        '    sum = nums[i] + nums[left] + nums[right].',
        '    If sum == 0: record triplet, then while left < right and nums[left] == nums[left + 1] left++; while left < right and nums[right] == nums[right - 1] right--; left++; right--;',
        '    Else if sum < 0: left++;',
        '    Else: right--;'
      ],
      dryRun:
        'Sorted nums: [-4, -1, -1, 0, 1, 2]\ni=0 (nums[0]=-4): left=1 (-1), right=5 (2), sum = -3 < 0 -> left++ ... no sum=0.\ni=1 (nums[1]=-1): left=2 (-1), right=5 (2) -> sum = 0! Add [-1,-1,2].\nNext: left=3 (0), right=4 (1) -> sum = 0! Add [-1,0,1].\ni=2 (nums[2]=-1): identical to nums[1], skipped to prevent duplicates.',
      edgeCases: ['All zeros [0, 0, 0, 0]', 'No triplets sum to zero', 'Array with many identical negative/positive numbers']
    },
    timeComplexity: 'O(N^2) - sorting takes O(N log N), outer loop runs N times with inner O(N) two-pointer pass',
    spaceComplexity: 'O(1) auxiliary space (excluding memory for the output list)',
    solution: {
      c: `#include <stdio.h>
#include <stdlib.h>

int compare_ints(const void *a, const void *b) {
    return (*(int*)a - *(int*)b);
}

int** threeSum(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {
    *returnSize = 0;
    if (numsSize < 3) return NULL;

    qsort(nums, numsSize, sizeof(int), compare_ints);

    int capacity = 1024;
    int** result = (int**)malloc(capacity * sizeof(int*));
    *returnColumnSizes = (int*)malloc(capacity * sizeof(int));

    for (int i = 0; i < numsSize - 2; i++) {
        if (nums[i] > 0) break; // Impossible to sum to 0
        if (i > 0 && nums[i] == nums[i - 1]) continue; // Skip duplicate i

        int left = i + 1;
        int right = numsSize - 1;

        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum == 0) {
                if (*returnSize == capacity) {
                    capacity *= 2;
                    result = (int**)realloc(result, capacity * sizeof(int*));
                    *returnColumnSizes = (int*)realloc(*returnColumnSizes, capacity * sizeof(int));
                }
                result[*returnSize] = (int*)malloc(3 * sizeof(int));
                result[*returnSize][0] = nums[i];
                result[*returnSize][1] = nums[left];
                result[*returnSize][2] = nums[right];
                (*returnColumnSizes)[*returnSize] = 3;
                (*returnSize)++;

                // Skip duplicates for left and right
                while (left < right && nums[left] == nums[left + 1]) left++;
                while (left < right && nums[right] == nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }

    return result;
}`,
      python: `def three_sum(nums: list[int]) -> list[list[int]]:
    nums.sort()
    res = []
    n = len(nums)
    
    for i in range(n - 2):
        if nums[i] > 0:
            break
        if i > 0 and nums[i] == nums[i - 1]:
            continue
            
        left, right = i + 1, n - 1
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            if total == 0:
                res.append([nums[i], nums[left], nums[right]])
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1
                left += 1
                right -= 1
            elif total < 0:
                left += 1
            else:
                right -= 1
                
    return res`
    }
  },
  {
    id: 'lc-3-longest-substring-without-repeating-characters',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    level: 'Basics',
    category: 'Sliding Window',
    leetcodeNumber: 3,
    description:
      'Given a string s, find the length of the longest substring without duplicate characters.',
    inputExample: 's = "abcabcbb" -> Output: 3 ("abc")\ns = "bbbbb" -> Output: 1 ("b")\ns = "pwwkew" -> Output: 3 ("wke")',
    outputExample: '3',
    constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces.'],
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    approach: {
      intuition:
        'Maintain a dynamic sliding window [left...right]. Use an array or hash map of size 256 to track the last seen index of each character. When character s[right] was seen at or after left, jump left to last_seen[char] + 1 in O(1)!',
      stepByStep: [
        'Create last_pos array of 256 integers, initialized to -1.',
        'Initialize left = 0, max_len = 0.',
        'Iterate right from 0 to len - 1:',
        '  unsigned char c = s[right].',
        '  If last_pos[c] >= left, set left = last_pos[c] + 1.',
        '  last_pos[c] = right.',
        '  max_len = max(max_len, right - left + 1).',
        'Return max_len.'
      ],
      dryRun:
        's = "abcabcbb"\nr=0(\'a\'): left=0, max=1\nr=1(\'b\'): left=0, max=2\nr=2(\'c\'): left=0, max=3\nr=3(\'a\'): \'a\' seen at 0 >= left(0) -> left = 1. Window "bca", len=3.\nr=4(\'b\'): \'b\' seen at 1 >= left(1) -> left = 2. Window "cab", len=3.\nFinal max_len = 3.',
      edgeCases: ['Empty string "" -> 0', 'All identical chars "aaaa" -> 1', 'All unique chars "abcdef" -> 6']
    },
    timeComplexity: 'O(N) - single pass over string s',
    spaceComplexity: 'O(1) - fixed 256-element table for ASCII characters',
    solution: {
      c: `#include <stdio.h>
#include <string.h>

#define MAX(a, b) ((a) > (b) ? (a) : (b))

int lengthOfLongestSubstring(char* s) {
    if (!s || !*s) return 0;

    // Fast direct-mapped ASCII array for O(1) lookups
    int last_pos[256];
    for (int i = 0; i < 256; i++) {
        last_pos[i] = -1;
    }

    int max_len = 0;
    int left = 0;

    for (int right = 0; s[right] != '\\0'; right++) {
        unsigned char c = (unsigned char)s[right];

        if (last_pos[c] >= left) {
            left = last_pos[c] + 1;
        }

        last_pos[c] = right;
        max_len = MAX(max_len, right - left + 1);
    }

    return max_len;
}

int main(void) {
    printf("abcabcbb: %d\\n", lengthOfLongestSubstring("abcabcbb")); // 3
    printf("bbbbb:    %d\\n", lengthOfLongestSubstring("bbbbb"));    // 1
    printf("pwwkew:   %d\\n", lengthOfLongestSubstring("pwwkew"));   // 3
    return 0;
}`,
      python: `def length_of_longest_substring(s: str) -> int:
    last_pos = {}
    left = 0
    max_len = 0
    
    for right, char in enumerate(s):
        if char in last_pos and last_pos[char] >= left:
            left = last_pos[char] + 1
            
        last_pos[char] = right
        max_len = max(max_len, right - left + 1)
        
    return max_len

print(length_of_longest_substring("abcabcbb")) # 3
print(length_of_longest_substring("pwwkew"))   # 3`
    }
  },
  {
    id: 'lc-146-lru-cache',
    title: 'LRU Cache (Least Recently Used)',
    difficulty: 'Medium',
    level: 'Advanced',
    category: 'Design & System Data Structures',
    leetcodeNumber: 146,
    description:
      'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement LRUCache with get(key) and put(key, value) both in O(1) average time complexity.',
    inputExample:
      'LRUCache cache = new LRUCache(2);\ncache.put(1, 1);\ncache.put(2, 2);\ncache.get(1);    // return 1\ncache.put(3, 3); // evicts key 2\ncache.get(2);    // return -1\ncache.put(4, 4); // evicts key 1\ncache.get(1);    // return -1',
    outputExample: '[null, null, null, 1, null, -1, null, -1]',
    constraints: ['1 <= capacity <= 3000', '0 <= key <= 10^4', '0 <= value <= 10^5', 'At most 2 * 10^5 calls to get and put'],
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Uber', 'Apple', 'Netflix'],
    approach: {
      intuition:
        'To achieve O(1) for both get and put with eviction of oldest item: combine a Doubly Linked List with dummy head and dummy tail (for O(1) removal and insertion at head) and a Hash Map (for O(1) key-to-node lookup).',
      stepByStep: [
        'Create Node struct with key, val, prev, next.',
        'Use pseudo-head and pseudo-tail dummy nodes so we never need special edge cases for empty list.',
        'get(key): lookup node in map. If not found, return -1. If found, move node to head of doubly linked list, return node.val.',
        'put(key, value): if key exists, update value and move to head. If new key and size == capacity, remove node before tail (LRU), delete from map, then insert new node at head.'
      ],
      dryRun:
        'Cap=2. put(1,1): head <-> [1:1] <-> tail.\nput(2,2): head <-> [2:2] <-> [1:1] <-> tail.\nget(1): moves [1:1] to head -> head <-> [1:1] <-> [2:2] <-> tail.\nput(3,3): evicts LRU (which is [2:2] before tail). Now: head <-> [3:3] <-> [1:1] <-> tail.',
      edgeCases: ['Capacity of 1', 'Updating existing key should update value AND move to most recently used position']
    },
    timeComplexity: 'O(1) for both get() and put()',
    spaceComplexity: 'O(capacity) - stores at most capacity nodes in linked list and hash map',
    solution: {
      c: `#include <stdio.h>
#include <stdlib.h>

#define HASH_CAP 6007

typedef struct DNode {
    int key;
    int val;
    struct DNode *prev;
    struct DNode *next;
    struct DNode *hnext; // For hash table chaining
} DNode;

typedef struct {
    int capacity;
    int size;
    DNode *head;
    DNode *tail;
    DNode *buckets[HASH_CAP];
} LRUCache;

static unsigned int lru_hash(int key) {
    return (unsigned int)(key * 2654435761u) % HASH_CAP;
}

static void remove_node(DNode *node) {
    node->prev->next = node->next;
    node->next->prev = node->prev;
}

static void add_to_head(LRUCache *cache, DNode *node) {
    node->next = cache->head->next;
    node->prev = cache->head;
    cache->head->next->prev = node;
    cache->head->next = node;
}

LRUCache* lRUCacheCreate(int capacity) {
    LRUCache *cache = (LRUCache*)calloc(1, sizeof(LRUCache));
    cache->capacity = capacity;
    cache->size = 0;
    cache->head = (DNode*)calloc(1, sizeof(DNode));
    cache->tail = (DNode*)calloc(1, sizeof(DNode));
    cache->head->next = cache->tail;
    cache->tail->prev = cache->head;
    return cache;
}

static DNode* map_find(LRUCache *cache, int key) {
    unsigned int h = lru_hash(key);
    DNode *curr = cache->buckets[h];
    while (curr) {
        if (curr->key == key) return curr;
        curr = curr->hnext;
    }
    return NULL;
}

static void map_remove(LRUCache *cache, int key) {
    unsigned int h = lru_hash(key);
    DNode *curr = cache->buckets[h];
    DNode *prev = NULL;
    while (curr) {
        if (curr->key == key) {
            if (prev) prev->hnext = curr->hnext;
            else cache->buckets[h] = curr->hnext;
            return;
        }
        prev = curr;
        curr = curr->hnext;
    }
}

int lRUCacheGet(LRUCache* obj, int key) {
    DNode *node = map_find(obj, key);
    if (!node) return -1;
    remove_node(node);
    add_to_head(obj, node);
    return node->val;
}

void lRUCachePut(LRUCache* obj, int key, int value) {
    DNode *node = map_find(obj, key);
    if (node) {
        node->val = value;
        remove_node(node);
        add_to_head(obj, node);
    } else {
        if (obj->size == obj->capacity) {
            DNode *lru = obj->tail->prev;
            remove_node(lru);
            map_remove(obj, lru->key);
            free(lru);
            obj->size--;
        }
        DNode *new_node = (DNode*)malloc(sizeof(DNode));
        new_node->key = key;
        new_node->val = value;
        add_to_head(obj, new_node);
        unsigned int h = lru_hash(key);
        new_node->hnext = obj->buckets[h];
        obj->buckets[h] = new_node;
        obj->size++;
    }
}

void lRUCacheFree(LRUCache* obj) {
    if (!obj) return;
    DNode *curr = obj->head;
    while (curr) {
        DNode *tmp = curr;
        curr = curr->next;
        free(tmp);
    }
    free(obj);
}

int main(void) {
    LRUCache *cache = lRUCacheCreate(2);
    lRUCachePut(cache, 1, 1);
    lRUCachePut(cache, 2, 2);
    printf("get(1): %d\\n", lRUCacheGet(cache, 1)); // 1
    lRUCachePut(cache, 3, 3); // evicts key 2
    printf("get(2): %d\\n", lRUCacheGet(cache, 2)); // -1
    lRUCacheFree(cache);
    return 0;
}`,
      python: `from collections import OrderedDict

class LRUCache:
    """
    In Python, collections.OrderedDict is implemented in C with a doubly-linked list
    + hash table under the hood, making it the perfect Pythonic LRU structure.
    """
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        # Move to end (most recently used)
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            # popitem(last=False) pops the FIFO / least recently used item!
            self.cache.popitem(last=False)

# Test
cache = LRUCache(2)
cache.put(1, 1)
cache.put(2, 2)
print(cache.get(1)) # 1
cache.put(3, 3)    # evicts 2
print(cache.get(2)) # -1`
    }
  },
  {
    id: 'lc-42-trapping-rain-water',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    level: 'Advanced',
    category: 'Two Pointers / Monotonic Stack',
    leetcodeNumber: 42,
    description:
      'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    inputExample: 'height = [0,1,0,2,1,0,1,3,2,1,2,1] -> Output: 6',
    outputExample: '6',
    constraints: ['n == height.length', '1 <= n <= 2 * 10^4', '0 <= height[i] <= 10^5'],
    companyTags: ['Amazon', 'Google', 'Meta', 'Goldman Sachs', 'Apple', 'ByteDance'],
    approach: {
      intuition:
        'Water trapped above bar i is determined by min(max_left, max_right) - height[i]. Using two pointers (left at 0, right at n-1), we only need to advance whichever side has the smaller maximum wall, because the bottleneck is guaranteed by that side!',
      stepByStep: [
        'Initialize left = 0, right = n - 1, left_max = 0, right_max = 0, total_water = 0.',
        'While left < right:',
        '  If height[left] < height[right]:',
        '    If height[left] >= left_max: left_max = height[left];',
        '    Else: total_water += left_max - height[left];',
        '    left++;',
        '  Else:',
        '    If height[right] >= right_max: right_max = height[right];',
        '    Else: total_water += right_max - height[right];',
        '    right--;',
        'Return total_water.'
      ],
      dryRun:
        'height = [0,1,0,2,1,0,1,3,2,1,2,1]\nleft=0 (0), right=11 (1): left_max=0, left++\nleft=1 (1), right=11 (1): left_max=1, right_max=1, right--\nTraps 1 unit at idx 2, 1 unit at idx 4, 2 units at idx 5, 1 unit at idx 6, 1 unit at idx 9. Total = 6.',
      edgeCases: ['Array of size < 3 (always 0)', 'Strictly increasing or strictly decreasing stairs (always 0)']
    },
    timeComplexity: 'O(N) - single pass with two pointers',
    spaceComplexity: 'O(1) - constant space',
    solution: {
      c: `#include <stdio.h>

int trap(int* height, int heightSize) {
    if (heightSize <= 2) return 0;

    int left = 0;
    int right = heightSize - 1;
    int left_max = 0;
    int right_max = 0;
    int total_water = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= left_max) {
                left_max = height[left];
            } else {
                total_water += left_max - height[left];
            }
            left++;
        } else {
            if (height[right] >= right_max) {
                right_max = height[right];
            } else {
                total_water += right_max - height[right];
            }
            right--;
        }
    }

    return total_water;
}

int main(void) {
    int h[] = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};
    printf("Trapped water: %d\\n", trap(h, 12)); // 6
    return 0;
}`,
      python: `def trap(height: list[int]) -> int:
    if len(height) <= 2:
        return 0
        
    left, right = 0, len(height) - 1
    left_max, right_max = 0, 0
    total_water = 0
    
    while left < right:
        if height[left] < height[right]:
            if height[left] >= left_max:
                left_max = height[left]
            else:
                total_water += left_max - height[left]
            left += 1
        else:
            if height[right] >= right_max:
                right_max = height[right]
            else:
                total_water += right_max - height[right]
            right -= 1
            
    return total_water

print(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])) # 6`
    }
  },
  {
    id: 'lc-56-merge-intervals',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    level: 'Moderate',
    category: 'Intervals / Sorting',
    leetcodeNumber: 56,
    description:
      'Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.',
    inputExample: 'intervals = [[1,3],[2,6],[8,10],[15,18]] -> Output: [[1,6],[8,10],[15,18]]',
    outputExample: '[[1,6],[8,10],[15,18]]',
    constraints: ['1 <= intervals.length <= 10^4', 'intervals[i].length == 2', '0 <= start_i <= end_i <= 10^4'],
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg', 'Uber'],
    approach: {
      intuition:
        'Sort intervals by start time. Once sorted, an interval [s2, e2] overlaps with the previous merged interval [s1, e1] if and only if s2 <= e1. If they overlap, extend e1 = max(e1, e2). If not, add as a new separate interval.',
      stepByStep: [
        'Sort intervals by start coordinate intervals[i][0].',
        'Add the first interval to output.',
        'Iterate through remaining intervals:',
        '  Let last = output.last.',
        '  If curr.start <= last.end: last.end = max(last.end, curr.end).',
        '  Else: append curr to output.',
        'Return output.'
      ],
      dryRun:
        'Sorted: [[1,3], [2,6], [8,10], [15,18]]\nStart with [1,3].\n[2,6]: 2 <= 3 -> overlap! new end = max(3,6)=6 -> [1,6].\n[8,10]: 8 > 6 -> no overlap, append [8,10].\n[15,18]: 15 > 10 -> no overlap, append [15,18].\nResult: [[1,6], [8,10], [15,18]].',
      edgeCases: ['Single interval [[1,4]]', 'Intervals completely contained inside another [[1,10], [2,3]]', 'Touching boundaries [[1,4], [4,5]] -> [[1,5]]']
    },
    timeComplexity: 'O(N log N) - dominated by sorting',
    spaceComplexity: 'O(N) for output and qsort stack',
    solution: {
      c: `#include <stdio.h>
#include <stdlib.h>

#define MAX(a, b) ((a) > (b) ? (a) : (b))

int compare_intervals(const void *a, const void *b) {
    int *intA = *(int**)a;
    int *intB = *(int**)b;
    return intA[0] - intB[0];
}

int** merge(int** intervals, int intervalsSize, int* intervalsColSize, int* returnSize, int** returnColumnSizes) {
    if (intervalsSize <= 0) {
        *returnSize = 0;
        return NULL;
    }

    qsort(intervals, intervalsSize, sizeof(int*), compare_intervals);

    int** res = (int**)malloc(intervalsSize * sizeof(int*));
    *returnColumnSizes = (int*)malloc(intervalsSize * sizeof(int));
    int count = 0;

    // Push first interval
    res[count] = (int*)malloc(2 * sizeof(int));
    res[count][0] = intervals[0][0];
    res[count][1] = intervals[0][1];
    (*returnColumnSizes)[count] = 2;
    count++;

    for (int i = 1; i < intervalsSize; i++) {
        int curr_start = intervals[i][0];
        int curr_end = intervals[i][1];

        if (curr_start <= res[count - 1][1]) {
            res[count - 1][1] = MAX(res[count - 1][1], curr_end);
        } else {
            res[count] = (int*)malloc(2 * sizeof(int));
            res[count][0] = curr_start;
            res[count][1] = curr_end;
            (*returnColumnSizes)[count] = 2;
            count++;
        }
    }

    *returnSize = count;
    return res;
}`,
      python: `def merge(intervals: list[list[int]]) -> list[list[int]]:
    if not intervals:
        return []
        
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    
    for current in intervals[1:]:
        prev = merged[-1]
        if current[0] <= prev[1]:
            prev[1] = max(prev[1], current[1])
        else:
            merged.append(current)
            
    return merged

print(merge([[1,3],[2,6],[8,10],[15,18]])) # [[1, 6], [8, 10], [15, 18]]`
    }
  },
  {
    id: 'lc-207-course-schedule',
    title: 'Course Schedule (Cycle Detection & Topo Sort)',
    difficulty: 'Medium',
    level: 'Advanced',
    category: 'Graph / Topological Sort',
    leetcodeNumber: 207,
    description:
      'There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [a_i, b_i] indicates that you must take course b_i first if you want to take course a_i. Return true if you can finish all courses. Otherwise, return false.',
    inputExample: 'numCourses = 2, prerequisites = [[1,0]] -> Output: true\nnumCourses = 2, prerequisites = [[1,0],[0,1]] -> Output: false',
    outputExample: 'true',
    constraints: ['1 <= numCourses <= 2000', '0 <= prerequisites.length <= 5000', 'prerequisites[i].length == 2', 'All pairs are unique'],
    companyTags: ['Google', 'Amazon', 'Meta', 'Microsoft', 'Uber'],
    approach: {
      intuition:
        'This is classic cycle detection in a directed graph. If the graph contains a directed cycle, it is impossible to finish all courses. We can use Kahn’s Algorithm (BFS with in-degrees) or 3-color DFS (WHITE=unvisited, GRAY=in recursion stack, BLACK=processed).',
      stepByStep: [
        'Compute in-degree for every course.',
        'Build adjacency list: prereq -> dependent courses.',
        'Enqueue all courses with in-degree == 0 into a queue.',
        'While queue is not empty: pop course u, increment processed_count. For each neighbor v of u: decrement in-degree[v]. If in-degree[v] becomes 0, push v to queue.',
        'Return processed_count == numCourses.'
      ],
      dryRun:
        'prereqs: [1, 0], [0, 1]\nin-degree: 0: 1, 1: 1. No node has in-degree 0! Queue starts empty. Processed = 0 != 2 -> Cycle detected, return false!',
      edgeCases: ['Disjoint graphs', 'No prerequisites at all (always true)']
    },
    timeComplexity: 'O(V + E) where V = numCourses, E = prerequisites.length',
    spaceComplexity: 'O(V + E) for adjacency list and in-degree array',
    solution: {
      c: `#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int val;
    struct Node *next;
} Node;

bool canFinish(int numCourses, int** prerequisites, int prerequisitesSize, int* prerequisitesColSize) {
    int *in_degree = (int*)calloc(numCourses, sizeof(int));
    Node **adj = (Node**)calloc(numCourses, sizeof(Node*));

    // Build graph
    for (int i = 0; i < prerequisitesSize; i++) {
        int course = prerequisites[i][0];
        int prereq = prerequisites[i][1];
        in_degree[course]++;

        Node *new_node = (Node*)malloc(sizeof(Node));
        new_node->val = course;
        new_node->next = adj[prereq];
        adj[prereq] = new_node;
    }

    // Kahn's BFS queue
    int *queue = (int*)malloc(numCourses * sizeof(int));
    int head = 0, tail = 0;

    for (int i = 0; i < numCourses; i++) {
        if (in_degree[i] == 0) {
            queue[tail++] = i;
        }
    }

    int visited_count = 0;
    while (head < tail) {
        int u = queue[head++];
        visited_count++;

        Node *curr = adj[u];
        while (curr) {
            int v = curr->val;
            in_degree[v]--;
            if (in_degree[v] == 0) {
                queue[tail++] = v;
            }
            curr = curr->next;
        }
    }

    // Free allocated memory
    for (int i = 0; i < numCourses; i++) {
        Node *curr = adj[i];
        while (curr) {
            Node *tmp = curr;
            curr = curr->next;
            free(tmp);
        }
    }
    free(adj);
    free(in_degree);
    free(queue);

    return visited_count == numCourses;
}`,
      python: `from collections import deque

def can_finish(num_courses: int, prerequisites: list[list[int]]) -> bool:
    in_degree = [0] * num_courses
    adj = [[] for _ in range(num_courses)]
    
    for course, prereq in prerequisites:
        in_degree[course] += 1
        adj[prereq].append(course)
        
    queue = deque([i for i in range(num_courses) if in_degree[i] == 0])
    visited_count = 0
    
    while queue:
        u = queue.popleft()
        visited_count += 1
        for v in adj[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)
                
    return visited_count == num_courses`
    }
  },
  {
    id: 'lc-33-search-in-rotated-sorted-array',
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    level: 'Moderate',
    category: 'Binary Search',
    leetcodeNumber: 33,
    description:
      'There is an integer array nums sorted in ascending order (with distinct values) that is possibly rotated at an unknown pivot index. Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums. You must write an algorithm with O(log n) runtime complexity.',
    inputExample: 'nums = [4,5,6,7,0,1,2], target = 0 -> Output: 4\nnums = [4,5,6,7,0,1,2], target = 3 -> Output: -1',
    outputExample: '4',
    constraints: ['1 <= nums.length <= 5000', '-10^4 <= nums[i] <= 10^4', 'All values of nums are unique', 'Must run in O(log n)'],
    companyTags: ['Amazon', 'Meta', 'Microsoft', 'Google', 'Apple', 'Bloomberg'],
    approach: {
      intuition:
        'In any rotated sorted array, splitting at midpoint mid divides the array into two halves, at least ONE of which is guaranteed to be normally sorted! We identify which half is sorted, check if target falls within that sorted range, and discard the other half.',
      stepByStep: [
        'Set low = 0, high = n - 1.',
        'While low <= high:',
        '  mid = low + (high - low) / 2.',
        '  If nums[mid] == target, return mid.',
        '  If left half is sorted (nums[low] <= nums[mid]):',
        '    If target >= nums[low] and target < nums[mid]: high = mid - 1.',
        '    Else: low = mid + 1.',
        '  Else (right half is sorted):',
        '    If target > nums[mid] and target <= nums[high]: low = mid + 1.',
        '    Else: high = mid - 1.',
        'Return -1.'
      ],
      dryRun:
        'nums = [4, 5, 6, 7, 0, 1, 2], target = 0\nlow=0 (4), high=6 (2), mid=3 (7). Left half [4..7] sorted. 0 is NOT between 4 and 7 -> low = mid + 1 = 4.\nlow=4 (0), high=6 (2), mid=5 (1). nums[mid]=1. Right half [1..2] sorted. 0 is NOT between 1 and 2 -> high = mid - 1 = 4.\nlow=4, high=4, mid=4: nums[4] == 0 == target! Return 4.',
      edgeCases: ['Array not rotated at all', 'Array of length 1']
    },
    timeComplexity: 'O(log N) - halves the search space each step',
    spaceComplexity: 'O(1) - constant memory',
    solution: {
      c: `#include <stdio.h>

int search(int* nums, int numsSize, int target) {
    int low = 0;
    int high = numsSize - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;

        if (nums[mid] == target) {
            return mid;
        }

        // Left half is sorted
        if (nums[low] <= nums[mid]) {
            if (target >= nums[low] && target < nums[mid]) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        // Right half is sorted
        else {
            if (target > nums[mid] && target <= nums[high]) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
    }

    return -1;
}

int main(void) {
    int arr[] = {4, 5, 6, 7, 0, 1, 2};
    printf("Index of 0: %d\\n", search(arr, 7, 0)); // 4
    printf("Index of 3: %d\\n", search(arr, 7, 3)); // -1
    return 0;
}`,
      python: `def search(nums: list[int], target: int) -> int:
    low, high = 0, len(nums) - 1
    
    while low <= high:
        mid = (low + high) // 2
        
        if nums[mid] == target:
            return mid
            
        # Left half sorted
        if nums[low] <= nums[mid]:
            if nums[low] <= target < nums[mid]:
                high = mid - 1
            else:
                low = mid + 1
        # Right half sorted
        else:
            if nums[mid] < target <= nums[high]:
                low = mid + 1
            else:
                high = mid - 1
                
    return -1

print(search([4, 5, 6, 7, 0, 1, 2], 0)) # 4
print(search([4, 5, 6, 7, 0, 1, 2], 3)) # -1`
    }
  },
  {
    id: 'lc-124-binary-tree-maximum-path-sum',
    title: 'Binary Tree Maximum Path Sum',
    difficulty: 'Hard',
    level: 'Advanced',
    category: 'Binary Tree / DFS Postorder',
    leetcodeNumber: 124,
    description:
      'A path in a binary tree is a sequence of nodes where each pair of adjacent nodes has an edge connecting them. A node can only appear at most once in the sequence. Return the maximum path sum of any non-empty path.',
    inputExample: 'root = [-10,9,20,null,null,15,7] -> Output: 42 (15 + 20 + 7)',
    outputExample: '42',
    constraints: ['The number of nodes in the tree is in the range [1, 3 * 10^4]', '-1000 <= Node.val <= 1000'],
    companyTags: ['Meta', 'Amazon', 'Google', 'Microsoft', 'DoorDash'],
    approach: {
      intuition:
        'For each node acting as the highest turning point of a path, the max path through it is node.val + max(0, left_gain) + max(0, right_gain). But what this node returns to its parent can only pick ONE branch: node.val + max(0, max(left_gain, right_gain))!',
      stepByStep: [
        'Maintain a global max_sum initialized to INT_MIN.',
        'Define recursive helper max_gain(node):',
        '  If node is NULL, return 0.',
        '  Recursively compute left = max(0, max_gain(node->left)).',
        '  Recursively compute right = max(0, max_gain(node->right)).',
        '  Update global max_sum = max(max_sum, node->val + left + right).',
        '  Return node->val + max(left, right) to parent.'
      ],
      dryRun:
        'Root -10, left=9, right=20 (children 15, 7).\nNode 15 returns 15.\nNode 7 returns 7.\nNode 20 computes path 20+15+7 = 42 (updates max_sum=42). Returns 20+max(15,7)=35.\nNode 9 returns 9.\nNode -10 computes -10+9+35 = 34. Max remains 42.',
      edgeCases: ['All negative node values (must pick single largest negative node)', 'Single node tree']
    },
    timeComplexity: 'O(N) - visits each node once in post-order',
    spaceComplexity: 'O(H) - recursion call stack where H is tree height',
    solution: {
      c: `#include <stdio.h>
#include <limits.h>

#define MAX(a, b) ((a) > (b) ? (a) : (b))

struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

static int dfs_gain(struct TreeNode* node, int* max_sum) {
    if (node == NULL) return 0;

    // Discard negative gains by maxing with 0
    int left_gain = MAX(0, dfs_gain(node->left, max_sum));
    int right_gain = MAX(0, dfs_gain(node->right, max_sum));

    // Path sum where this node is the apex/root of the path
    int current_path = node->val + left_gain + right_gain;
    *max_sum = MAX(*max_sum, current_path);

    // Return to parent: can only extend one side
    return node->val + MAX(left_gain, right_gain);
}

int maxPathSum(struct TreeNode* root) {
    int max_sum = INT_MIN;
    dfs_gain(root, &max_sum);
    return max_sum;
}`,
      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def max_path_sum(root: TreeNode) -> int:
    max_sum = float('-inf')
    
    def max_gain(node):
        nonlocal max_sum
        if not node:
            return 0
            
        left_gain = max(0, max_gain(node.left))
        right_gain = max(0, max_gain(node.right))
        
        # Max path through current node
        current_path = node.val + left_gain + right_gain
        max_sum = max(max_sum, current_path)
        
        return node.val + max(left_gain, right_gain)
        
    max_gain(root)
    return max_sum`
    }
  },
  {
    id: 'lc-300-longest-increasing-subsequence',
    title: 'Longest Increasing Subsequence (LIS)',
    difficulty: 'Medium',
    level: 'Advanced',
    category: 'Dynamic Programming / Binary Search',
    leetcodeNumber: 300,
    description:
      'Given an integer array nums, return the length of the longest strictly increasing subsequence. Can you do it in O(N log N) time complexity?',
    inputExample: 'nums = [10,9,2,5,3,7,101,18] -> Output: 4 ([2,3,7,101] or [2,5,7,18])',
    outputExample: '4',
    constraints: ['1 <= nums.length <= 2500', '-10^4 <= nums[i] <= 10^4'],
    companyTags: ['Google', 'Amazon', 'Meta', 'Microsoft', 'Bloomberg'],
    approach: {
      intuition:
        'Patience Sorting algorithm: Maintain an array tails, where tails[i] stores the smallest tail of all increasing subsequences of length i + 1 found so far. Because tails is always strictly increasing, we can use Binary Search to find where each num belongs in O(log N)!',
      stepByStep: [
        'Initialize empty array tails.',
        'For each x in nums:',
        '  Binary search the first index idx in tails such that tails[idx] >= x.',
        '  If idx == len(tails), append x to tails (we extended the longest subsequence).',
        '  Else, tails[idx] = x (we found a smaller tail for length idx + 1, giving more room for future elements).',
        'Return len(tails).'
      ],
      dryRun:
        'nums = [10, 9, 2, 5, 3, 7, 101, 18]\ntails=[10] -> [9] -> [2] -> [2, 5] -> [2, 3] -> [2, 3, 7] -> [2, 3, 7, 101] -> [2, 3, 7, 18].\nLength is 4.',
      edgeCases: ['Array already sorted (len = N)', 'Array strictly decreasing (len = 1)']
    },
    timeComplexity: 'O(N log N) with Binary Search (Patience Sort)',
    spaceComplexity: 'O(N) for tails array',
    solution: {
      c: `#include <stdio.h>
#include <stdlib.h>

int lengthOfLIS(int* nums, int numsSize) {
    if (numsSize == 0) return 0;

    int *tails = (int*)malloc(numsSize * sizeof(int));
    int len = 0;

    for (int i = 0; i < numsSize; i++) {
        int x = nums[i];

        // Binary search for first element >= x
        int low = 0, high = len - 1;
        int idx = len;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (tails[mid] >= x) {
                idx = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        tails[idx] = x;
        if (idx == len) {
            len++;
        }
    }

    free(tails);
    return len;
}

int main(void) {
    int arr[] = {10, 9, 2, 5, 3, 7, 101, 18};
    printf("LIS length: %d\\n", lengthOfLIS(arr, 8)); // 4
    return 0;
}`,
      python: `import bisect

def length_of_lis(nums: list[int]) -> int:
    tails = []
    for x in nums:
        idx = bisect.bisect_left(tails, x)
        if idx == len(tails):
            tails.append(x)
        else:
            tails[idx] = x
    return len(tails)

print(length_of_lis([10, 9, 2, 5, 3, 7, 101, 18])) # 4`
    }
  },
  {
    id: 'lc-53-maximum-subarray',
    title: 'Maximum Subarray (Kadane’s Algorithm)',
    difficulty: 'Medium',
    level: 'Basics',
    category: 'Dynamic Programming / Greedy',
    leetcodeNumber: 53,
    description:
      'Given an integer array nums, find the subarray with the largest sum, and return its sum.',
    inputExample: 'nums = [-2,1,-3,4,-1,2,1,-5,4] -> Output: 6 ([4,-1,2,1])',
    outputExample: '6',
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    companyTags: ['Amazon', 'Microsoft', 'Google', 'Apple', 'Meta', 'LinkedIn'],
    approach: {
      intuition:
        'Kadane’s Algorithm: At each index i, we decide whether to add nums[i] to the existing running subarray sum, or start a brand new subarray starting at nums[i]: current_sum = max(nums[i], current_sum + nums[i]).',
      stepByStep: [
        'Initialize max_so_far = nums[0], current_max = nums[0].',
        'Loop from index 1 to n - 1:',
        '  current_max = max(nums[i], current_max + nums[i]).',
        '  max_so_far = max(max_so_far, current_max).',
        'Return max_so_far.'
      ],
      dryRun:
        'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]\ncur=1, max=1\ncur=-2, max=1\ncur=4, max=4\ncur=3, max=4\ncur=5, max=5\ncur=6, max=6\ncur=1, max=6\ncur=5, max=6\nFinal: 6.',
      edgeCases: ['All negative numbers [-5, -1, -3] -> returns -1']
    },
    timeComplexity: 'O(N) - single pass',
    spaceComplexity: 'O(1) - constant space',
    solution: {
      c: `#include <stdio.h>

#define MAX(a, b) ((a) > (b) ? (a) : (b))

int maxSubArray(int* nums, int numsSize) {
    int max_so_far = nums[0];
    int current_max = nums[0];

    for (int i = 1; i < numsSize; i++) {
        current_max = MAX(nums[i], current_max + nums[i]);
        max_so_far = MAX(max_so_far, current_max);
    }

    return max_so_far;
}

int main(void) {
    int arr[] = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    printf("Max subarray sum: %d\\n", maxSubArray(arr, 9)); // 6
    return 0;
}`,
      python: `def max_sub_array(nums: list[int]) -> int:
    max_so_far = current_max = nums[0]
    for num in nums[1:]:
        current_max = max(num, current_max + num)
        max_so_far = max(max_so_far, current_max)
    return max_so_far

print(max_sub_array([-2, 1, -3, 4, -1, 2, 1, -5, 4])) # 6`
    }
  }
];
