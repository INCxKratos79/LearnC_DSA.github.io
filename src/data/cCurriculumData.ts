import { CTopicModule } from '../types';

export const C_CURRICULUM: CTopicModule[] = [
  {
    id: 'c-basics-memory-model',
    title: '1. C Re-Immersion & Core Memory Layout',
    level: 'Basics',
    tagline: 'Understand how C talks to bare hardware, stack vs heap, and data representation.',
    estimatedHours: 15,
    concepts: [
      {
        title: 'Compilation Pipeline & Execution Model',
        description:
          'Unlike Python (interpreted / bytecode in CPython), C translates directly to machine instructions via 4 steps: 1. Preprocessor (expands #include, #define) -> 2. Compiler (C to Assembly) -> 3. Assembler (Assembly to Object file .o) -> 4. Linker (combines object files & libraries into ELF/PE binary).',
        codeSnippetC: `// Preprocessor, Header & Main entry
#include <stdio.h>
#include <stdint.h>
#include <limits.h>

int global_initialized = 42;    // .data segment
int global_uninitialized;       // .bss segment (zero-filled by OS)

int main(void) {
    int stack_var = 10;         // Stack frame of main()
    printf("Stack var address: %p\\n", (void*)&stack_var);
    printf("Data seg address:  %p\\n", (void*)&global_initialized);
    return 0;
}`,
        codeSnippetPython: `# Python executes via bytecode in virtual machine (PVM)
import sys

x = 42  # Everything in Python is a PyObject heap allocated!
print(f"Address/id in Python: {hex(id(x))}")
print(f"Size of int object in Python: {sys.getsizeof(x)} bytes") # 28 bytes vs 4 bytes in C!`,
        notes: [
          'Stack grows downward on x86/ARM architectures, Heap grows upward towards Stack.',
          'Local variables are allocated on the Stack in O(1) time simply by moving the stack pointer register (RSP/ESP).',
          'Python integers have arbitrary precision (bignum), whereas C ints are fixed 32-bit or 64-bit and WILL overflow silently.'
        ],
        memoryDiagram: `+---------------------------------------+ High Memory (0xFFFFFFFF)
| Kernel Space (OS mapping)             |
+---------------------------------------+
| Stack (Local vars, return addresses)  | | Grows DOWNWARDS (↓)
|                  |                    | v
|                  v                    |
|                                       |
|                  ^                    |
|                  |                    | ^ Grows UPWARDS (↑)
| Heap (malloc / dynamic allocation)    | |
+---------------------------------------+
| BSS Segment (Uninitialized globals=0) |
+---------------------------------------+
| Data Segment (Initialized globals)    |
+---------------------------------------+
| Text / Code Segment (Machine code)    | Low Memory (0x00000000)
+---------------------------------------+`,
        pitfallWarning: 'Never return the address of a local stack variable from a function. When the function returns, its stack frame is invalidated and the pointer becomes a dangling pointer!'
      },
      {
        title: 'Data Types, Primitive Sizes & Integer Overflow',
        description:
          'In C, standard integer types have architecture-dependent sizes unless you use <stdint.h> (int32_t, uint64_t). Signed overflow in C is Undefined Behavior (UB), while unsigned overflow wraps around modulo 2^N.',
        codeSnippetC: `#include <stdio.h>
#include <stdint.h>
#include <limits.h>

int main(void) {
    int32_t max_signed = INT32_MAX; // 2147483647
    uint32_t max_unsigned = UINT32_MAX; // 4294967295

    printf("Signed int32 max: %d\\n", max_signed);
    // Beware: max_signed + 1 is UB! Always check before adding:
    if (max_signed > INT32_MAX - 1) {
        printf("Overflow would occur! Guard triggered.\\n");
    }
    
    // Unsigned wrap-around is defined:
    printf("Unsigned wrap: %u + 1 = %u\\n", max_unsigned, max_unsigned + 1); // prints 0
    return 0;
}`,
        codeSnippetPython: `# Python automatically promotes integers to arbitrary precision
import sys

x = 2147483647
x = x + 1 # Becomes 2147483648 without any overflow!
print("Python handles arbitrarily large integers:", x ** 2)`,
        notes: [
          'Always use size_t for array indexing and sizes, uint8_t for raw byte buffers.',
          'Format specifiers: %d (int), %u (unsigned), %ld (long), %zu (size_t), %p (pointer).'
        ]
      }
    ],
    problems: [
      {
        id: 'c-prob-1-reverse-int',
        title: 'Reverse 32-bit Integer with Overflow Guard',
        difficulty: 'Medium',
        level: 'Basics',
        category: 'Core C & Math',
        leetcodeNumber: 7,
        description:
          'Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0. Assume the environment does not allow you to store 64-bit integers (must check bounds before multiplying).',
        inputExample: 'x = 123  -> Output: 321\nx = -123 -> Output: -321\nx = 1534236469 -> Output: 0 (overflows INT32_MAX)',
        outputExample: '321',
        constraints: [
          '-2^31 <= x <= 2^31 - 1',
          'Must not use 64-bit integer (long long) to bypass 32-bit checks'
        ],
        approach: {
          intuition:
            'We pop digits from x using modulo % 10 and push them onto rev using rev = rev * 10 + pop. However, rev * 10 can overflow INT32_MAX. We must check rev > INT_MAX/10 before multiplying.',
          stepByStep: [
            'Initialize rev = 0.',
            'While x != 0: extract pop = x % 10 and do x /= 10.',
            'Check for overflow: if rev > INT_MAX / 10 or (rev == INT_MAX / 10 && pop > 7), return 0.',
            'Check for underflow: if rev < INT_MIN / 10 or (rev == INT_MIN / 10 && pop < -8), return 0.',
            'Update rev = rev * 10 + pop.',
            'Return rev.'
          ],
          dryRun:
            'x = 123:\n1. pop = 3, rev = 0*10+3 = 3, x = 12\n2. pop = 2, rev = 3*10+2 = 32, x = 1\n3. pop = 1, rev = 32*10+1 = 321, x = 0\nResult: 321.',
          edgeCases: ['Negative numbers (x = -123)', 'Numbers ending in zero (x = 120 -> 21)', 'Bound overflow (x = 1534236469)']
        },
        timeComplexity: 'O(log10(|x|)) - at most 10 iterations for a 32-bit integer',
        spaceComplexity: 'O(1) - constant auxiliary memory',
        solution: {
          c: `#include <stdio.h>
#include <limits.h>

int reverse(int x) {
    int rev = 0;
    while (x != 0) {
        int pop = x % 10;
        x /= 10;

        // Check positive overflow: INT_MAX is 2147483647
        if (rev > INT_MAX / 10 || (rev == INT_MAX / 10 && pop > 7)) {
            return 0;
        }
        // Check negative underflow: INT_MIN is -2147483648
        if (rev < INT_MIN / 10 || (rev == INT_MIN / 10 && pop < -8)) {
            return 0;
        }

        rev = rev * 10 + pop;
    }
    return rev;
}

int main(void) {
    printf("Reversed 123: %d\\n", reverse(123));         // 321
    printf("Reversed -123: %d\\n", reverse(-123));       // -321
    printf("Reversed 1534236469: %d\\n", reverse(1534236469)); // 0 (overflow)
    return 0;
}`,
          python: `import math

def reverse(x: int) -> int:
    INT_MAX = 2**31 - 1
    INT_MIN = -2**31
    
    rev = 0
    # In Python, negative modulo behaves differently than C (-123 % 10 is 7 in Python, -3 in C)
    sign = -1 if x < 0 else 1
    x = abs(x)
    
    while x != 0:
        pop = x % 10
        x //= 10
        
        # Check overflow bounds manually because Python won't overflow automatically
        if rev > (INT_MAX - pop) // 10:
            return 0
        
        rev = rev * 10 + pop
        
    return sign * rev

# Test cases
print(reverse(123))         # 321
print(reverse(-123))        # -321
print(reverse(1534236469))  # 0`
        }
      },
      {
        id: 'c-prob-2-palindrome-num',
        title: 'Palindrome Number (Without String Conversion)',
        difficulty: 'Easy',
        level: 'Basics',
        category: 'Core C & Math',
        leetcodeNumber: 9,
        description:
          'Given an integer x, return true if x is a palindrome, and false otherwise. Do this without converting the integer to a string or allocating extra buffers.',
        inputExample: 'x = 121 -> Output: true\nx = -121 -> Output: false\nx = 10 -> Output: false',
        outputExample: 'true',
        constraints: ['-2^31 <= x <= 2^31 - 1'],
        approach: {
          intuition:
            'Negative numbers are never palindromes (e.g. -121 != 121-). Numbers ending in 0 (except 0 itself) are not palindromes. We only need to reverse the second half of the number and compare with the first half!',
          stepByStep: [
            'If x < 0 or (x % 10 == 0 && x != 0), return false.',
            'Maintain revertedNumber = 0.',
            'While x > revertedNumber, pull digits: revertedNumber = revertedNumber * 10 + x % 10, x /= 10.',
            'When loop terminates, for even length digits x == revertedNumber; for odd length x == revertedNumber / 10.'
          ],
          dryRun:
            'x = 1221:\n1. reverted = 1, x = 122\n2. reverted = 12, x = 12\nLoop exits because x (12) is not > reverted (12). x == reverted (12 == 12) -> true!',
          edgeCases: ['x = 0 (true)', 'Single digits (true)', 'Ends with 0 like 10, 100 (false)']
        },
        timeComplexity: 'O(log10(x)) - We only reverse half of the digits',
        spaceComplexity: 'O(1) - In-place integer arithmetic',
        solution: {
          c: `#include <stdbool.h>
#include <stdio.h>

bool isPalindrome(int x) {
    // Special cases: negative numbers or trailing zero (except 0 itself)
    if (x < 0 || (x % 10 == 0 && x != 0)) {
        return false;
    }

    int revertedNumber = 0;
    while (x > revertedNumber) {
        revertedNumber = revertedNumber * 10 + (x % 10);
        x /= 10;
    }

    // When the length is odd, we can get rid of the middle digit via revertedNumber / 10
    // Example: at end of 12321, x = 12, revertedNumber = 123 -> 123/10 = 12 == x
    return x == revertedNumber || x == revertedNumber / 10;
}

int main(void) {
    printf("121 is palindrome: %s\\n", isPalindrome(121) ? "true" : "false");
    printf("-121 is palindrome: %s\\n", isPalindrome(-121) ? "true" : "false");
    printf("10 is palindrome: %s\\n", isPalindrome(10) ? "true" : "false");
    return 0;
}`,
          python: `def is_palindrome(x: int) -> bool:
    if x < 0 or (x % 10 == 0 and x != 0):
        return False
        
    reverted_number = 0
    while x > reverted_number:
        reverted_number = reverted_number * 10 + (x % 10)
        x //= 10
        
    return x == reverted_number or x == (reverted_number // 10)

print(is_palindrome(121))   # True
print(is_palindrome(-121))  # False
print(is_palindrome(10))    # False`
        }
      }
    ]
  },
  {
    id: 'c-pointers-memory-arithmetic',
    title: '2. Pointers, Memory Addresses & Pointer Arithmetic',
    level: 'Moderate',
    tagline: 'The defining superpower of C. Master dereferencing, pointer decay, double pointers, and function pointers.',
    estimatedHours: 20,
    concepts: [
      {
        title: 'Pointer Mechanics, Step Sizes & Dereferencing',
        description:
          'A pointer is simply a variable that stores a memory address (8 bytes on 64-bit systems). When you do ptr + 1, it advances by sizeof(*ptr) bytes, NOT 1 byte! Dereferencing (*ptr) reads or writes the value stored at that address.',
        codeSnippetC: `#include <stdio.h>

int main(void) {
    int arr[3] = {10, 20, 30};
    int *p = arr; // Decay: arr decays into pointer to first element &arr[0]

    printf("Address p:     %p, Value: %d\\n", (void*)p, *p);       // 10
    printf("Address p+1:   %p, Value: %d\\n", (void*)(p+1), *(p+1)); // 20 (+4 bytes)
    
    // Pointer arithmetic equivalences:
    // arr[i] == *(arr + i) == *(i + arr) == i[arr] (valid in C!)
    printf("2[arr] is valid C: %d\\n", 2[arr]); // prints 30
    return 0;
}`,
        codeSnippetPython: `# Python does NOT have raw pointers or manual memory addresses.
# Instead, every variable in Python is a reference to a heap-allocated object.
a = [10, 20, 30]
b = a # b references the EXACT same list in memory!
b[0] = 999
print(a) # [999, 20, 30] - mutated through reference b!`,
        notes: [
          'sizeof(any_pointer) is 8 bytes on 64-bit OS, 4 bytes on 32-bit OS.',
          'Array names decay to pointers when passed to functions: void foo(int arr[]) is IDENTICAL to void foo(int *arr).',
          'Void pointers (void*) represent generic pointers without type information. Must cast before dereferencing.'
        ],
        memoryDiagram: `Memory Address:  0x1000      0x1004      0x1008
Array Values:    [  10  ]    [  20  ]    [  30  ]
Index:           arr[0]      arr[1]      arr[2]
Pointers:          ^           ^           ^
                   |           |           |
                 ptr         ptr+1       ptr+2  (each step is +4 bytes)`
      },
      {
        title: 'Double Pointers (int**) & Function Pointers',
        description:
          'Double pointers are pointers to pointers. They are required when a function needs to modify the address held by the caller pointer (e.g. inserting into linked list head, or allocating 2D matrices). Function pointers store the address of executable code and enable callbacks and polymorphic behavior.',
        codeSnippetC: `#include <stdio.h>
#include <stdlib.h>

// Modifying the caller's pointer requires a double pointer!
void allocate_buffer(char **ptr_to_ptr, size_t size) {
    *ptr_to_ptr = (char*)malloc(size);
}

// Function pointer signature: ReturnType (*Name)(ParamTypes)
int compare_desc(const void *a, const void *b) {
    return (*(int*)b - *(int*)a); // for qsort
}

int main(void) {
    char *buf = NULL;
    allocate_buffer(&buf, 64);
    free(buf);

    int numbers[] = {5, 2, 8, 1, 9};
    qsort(numbers, 5, sizeof(int), compare_desc); // callback!
    return 0;
}`,
        codeSnippetPython: `# In Python, functions are first-class citizens:
numbers = [5, 2, 8, 1, 9]
numbers.sort(key=lambda x: -x) # Lambda functions as first-class objects
print(numbers) # [9, 8, 5, 2, 1]`,
        pitfallWarning: 'If you pass a single pointer to a function: void foo(int *ptr) { ptr = malloc(...); }, the original caller pointer outside foo remains unchanged! You must pass int **ptr.'
      }
    ],
    problems: [
      {
        id: 'c-prob-3-string-to-integer-atoi',
        title: 'String to Integer (myAtoi) with Pointer Scanning',
        difficulty: 'Medium',
        level: 'Moderate',
        category: 'Pointers & Strings',
        leetcodeNumber: 8,
        description:
          'Implement the myAtoi(char *s) function in pure C, which converts a string to a 32-bit signed integer. The algorithm must: 1. Discard leading whitespaces. 2. Check for optional "+" or "-" sign. 3. Read digits until non-digit or null terminator. 4. Clamp within [-2^31, 2^31 - 1] without undefined behavior.',
        inputExample: 's = "   -42" -> Output: -42\ns = "1337c0d3" -> Output: 1337\ns = "0-1" -> Output: 0\ns = "words and 987" -> Output: 0',
        outputExample: '-42',
        constraints: [
          '0 <= s.length <= 200',
          's consists of English letters, digits, spaces, and signs',
          'Must handle 32-bit overflow cleanly'
        ],
        approach: {
          intuition:
            'Use pointer traversal to scan the char array sequentially without allocating extra buffers. Advance the pointer past whitespace, process the sign flag, then parse digits while watching for 32-bit integer boundaries before multiplying by 10.',
          stepByStep: [
            'While *s == " " (space), advance s++.',
            'Check if *s == "-" (sign = -1, s++) or *s == "+" (sign = 1, s++).',
            'Iterate while *s >= "0" and *s <= "9":',
            'Compute digit = *s - "0".',
            'Check overflow: if total > INT_MAX/10 or (total == INT_MAX/10 && digit > 7), return sign == 1 ? INT_MAX : INT_MIN.',
            'total = total * 10 + digit; s++.',
            'Return sign * total.'
          ],
          dryRun:
            's = "   -42"\n1. Skip 3 spaces -> s points to "-".\n2. Detect "-" -> sign = -1, advance to "4".\n3. total = 4, advance to "2".\n4. total = 42, next is \'\\0\'.\nResult: -42.',
          edgeCases: ['Leading spaces', 'No digits found', 'Overflow beyond INT_MAX', 'Underflow below INT_MIN']
        },
        timeComplexity: 'O(N) - single pass over string',
        spaceComplexity: 'O(1) - zero heap allocations',
        solution: {
          c: `#include <stdio.h>
#include <limits.h>

int myAtoi(const char *s) {
    if (!s) return 0;

    // 1. Discard leading whitespace using pointer arithmetic
    while (*s == ' ') {
        s++;
    }

    // 2. Check optional sign
    int sign = 1;
    if (*s == '+') {
        s++;
    } else if (*s == '-') {
        sign = -1;
        s++;
    }

    // 3. Convert digits with overflow detection
    int total = 0;
    while (*s >= '0' && *s <= '9') {
        int digit = *s - '0';

        // Check if total * 10 + digit overflows INT_MAX
        if (total > INT_MAX / 10 || (total == INT_MAX / 10 && digit > 7)) {
            return (sign == 1) ? INT_MAX : INT_MIN;
        }

        total = total * 10 + digit;
        s++;
    }

    return total * sign;
}

int main(void) {
    printf("myAtoi('   -42'): %d\\n", myAtoi("   -42"));
    printf("myAtoi('1337c0d3'): %d\\n", myAtoi("1337c0d3"));
    printf("myAtoi('-91283472332'): %d\\n", myAtoi("-91283472332")); // Clamps to INT_MIN
    return 0;
}`,
          python: `def my_atoi(s: str) -> int:
    INT_MAX = 2**31 - 1
    INT_MIN = -2**31
    
    # 1. Strip whitespace
    s = s.lstrip()
    if not s:
        return 0
        
    # 2. Sign detection
    sign = 1
    idx = 0
    if s[0] == '+':
        idx += 1
    elif s[0] == '-':
        sign = -1
        idx += 1
        
    # 3. Read digits
    total = 0
    while idx < len(s) and s[idx].isdigit():
        digit = int(s[idx])
        
        # Check overflow
        if total > (INT_MAX - digit) // 10:
            return INT_MAX if sign == 1 else INT_MIN
            
        total = total * 10 + digit
        idx += 1
        
    return total * sign

print(my_atoi("   -42"))            # -42
print(my_atoi("1337c0d3"))          # 1337
print(my_atoi("-91283472332"))      # -2147483648`
        }
      },
      {
        id: 'c-prob-4-reverse-string-inplace',
        title: 'Reverse String In-Place (Two Pointers)',
        difficulty: 'Easy',
        level: 'Moderate',
        category: 'Pointers & Strings',
        leetcodeNumber: 344,
        description:
          'Write a function that reverses a string or character array in-place with O(1) extra memory. In C, mutate the raw char array using two pointer dereferencing and XOR swap or temporary char.',
        inputExample: 's = ["h","e","l","l","o"] -> Output: ["o","l","l","e","h"]',
        outputExample: '["o","l","l","e","h"]',
        constraints: ['1 <= s.length <= 10^5', 's[i] is a printable ascii character'],
        approach: {
          intuition:
            'Set one pointer at the start (left = 0) and one pointer at the end (right = n - 1). Swap their values, advance left, decrement right until they meet in the middle.',
          stepByStep: [
            'Initialize left pointer at start, right pointer at end.',
            'While left < right:',
            'Swap *left and *right using temp char or XOR swap.',
            'Increment left, decrement right.'
          ],
          dryRun:
            's = "hello", left = 0 (\'h\'), right = 4 (\'o\') -> swap -> "oellh"\nleft = 1 (\'e\'), right = 3 (\'l\') -> swap -> "olleh"\nleft = 2, right = 2 -> terminate.',
          edgeCases: ['Empty or 1-character string', 'Even length vs odd length']
        },
        timeComplexity: 'O(N) - N/2 swaps',
        spaceComplexity: 'O(1) - in-place modification',
        solution: {
          c: `#include <stdio.h>
#include <string.h>

void reverseString(char *s, int sSize) {
    if (!s || sSize <= 1) return;

    char *left = s;
    char *right = s + sSize - 1;

    while (left < right) {
        // Swap values at pointers
        char temp = *left;
        *left = *right;
        *right = temp;

        left++;
        right--;
    }
}

int main(void) {
    char str[] = "hello";
    reverseString(str, 5);
    printf("Reversed: %s\\n", str); // "olleh"
    return 0;
}`,
          python: `def reverse_string(s: list[str]) -> None:
    """
    Do not return anything, modify s in-place instead.
    """
    left, right = 0, len(s) - 1
    while left < right:
        s[left], s[right] = s[right], s[left] # Python tuple unpacking swap
        left += 1
        right -= 1

s = ["h","e","l","l","o"]
reverse_string(s)
print(s) # ['o', 'l', 'l', 'e', 'h']`
        }
      }
    ]
  },
  {
    id: 'c-dynamic-memory-safety',
    title: '3. Dynamic Memory Allocation & Memory Safety',
    level: 'Moderate',
    tagline: 'Take control of the Heap. Master malloc, calloc, realloc, free, and guard against leaks and segmentation faults.',
    estimatedHours: 20,
    concepts: [
      {
        title: 'Heap Allocation Functions: malloc, calloc, realloc & free',
        description:
          'malloc(size) allocates uninitialized bytes. calloc(num, size) allocates and zero-initializes memory. realloc(ptr, new_size) expands or shrinks a block (relocating if necessary). free(ptr) returns the block to the allocator. Always check for NULL return!',
        codeSnippetC: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    size_t capacity = 4;
    int *arr = (int*)malloc(capacity * sizeof(int));
    if (arr == NULL) { // ALWAYS check!
        perror("Allocation failed");
        return 1;
    }

    // Resize buffer dynamically
    capacity *= 2;
    int *temp = (int*)realloc(arr, capacity * sizeof(int));
    if (temp == NULL) {
        // arr is STILL VALID! Do not overwrite arr directly before checking!
        free(arr);
        return 1;
    }
    arr = temp;

    // Always free heap memory when finished:
    free(arr);
    arr = NULL; // Defend against dangling pointer!
    return 0;
}`,
        codeSnippetPython: `# Python manages heap memory completely automatically via Reference Counting + GC.
# Lists automatically resize dynamically with over-allocation strategy:
arr = []
for i in range(10):
    arr.append(i) # Python handles reallocation under the hood`,
        notes: [
          'Rule 1: Every malloc/calloc MUST have exactly one matching free().',
          'Rule 2: Never do arr = realloc(arr, new_size). If realloc fails, it returns NULL and your old pointer is lost forever (memory leak)! Use a temp pointer.',
          'Rule 3: After freeing, set ptr = NULL so accidental use causes an immediate predictable crash instead of silent memory corruption.'
        ],
        pitfallWarning: 'Double Free Error: Calling free(ptr) twice on the same pointer corrupts the glibc memory manager metadata and triggers heap exploitation defenses (abort crash).'
      },
      {
        title: 'Building a Dynamic Resizable Vector in Pure C',
        description:
          'In C, you frequently need to implement your own dynamic array (like std::vector in C++ or list in Python). The amortized time complexity of append is O(1) by doubling capacity when full.',
        codeSnippetC: `typedef struct {
    int *data;
    size_t size;
    size_t capacity;
} Vector;

Vector* vector_create(size_t initial_cap) {
    Vector *v = (Vector*)malloc(sizeof(Vector));
    v->size = 0;
    v->capacity = initial_cap ? initial_cap : 4;
    v->data = (int*)malloc(v->capacity * sizeof(int));
    return v;
}

void vector_push(Vector *v, int val) {
    if (v->size == v->capacity) {
        v->capacity *= 2;
        v->data = (int*)realloc(v->data, v->capacity * sizeof(int));
    }
    v->data[v->size++] = val;
}

void vector_free(Vector *v) {
    if (v) {
        free(v->data);
        free(v);
    }
}`,
        codeSnippetPython: `# In Python, list is already a dynamic array (array of PyObject pointers):
vec = []
vec.append(10)
vec.append(20)
print(vec[0])`
      }
    ],
    problems: [
      {
        id: 'c-prob-5-merge-sorted-array',
        title: 'Merge Sorted Array (In-Place from Back)',
        difficulty: 'Easy',
        level: 'Moderate',
        category: 'Arrays & Memory',
        leetcodeNumber: 88,
        description:
          'You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively. Merge nums1 and nums2 into a single array sorted in non-decreasing order in-place inside nums1.',
        inputExample: 'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3\nOutput: [1,2,2,3,5,6]',
        outputExample: '[1,2,2,3,5,6]',
        constraints: [
          'nums1.length == m + n',
          'nums2.length == n',
          '0 <= m, n <= 200',
          'Must merge in O(1) extra space without overwriting elements'
        ],
        approach: {
          intuition:
            'Merging from the front would overwrite elements of nums1 before they are read. By filling nums1 from the BACK (index m + n - 1), we compare the largest elements of nums1 and nums2 and place them without disturbing unprocessed data!',
          stepByStep: [
            'Set p1 = m - 1 (last valid element in nums1).',
            'Set p2 = n - 1 (last valid element in nums2).',
            'Set p = m + n - 1 (write index at tail of nums1).',
            'While p2 >= 0:',
            'If p1 >= 0 and nums1[p1] > nums2[p2], nums1[p--] = nums1[p1--].',
            'Else, nums1[p--] = nums2[p2--].'
          ],
          dryRun:
            'nums1 = [1,2,3,0,0,0], nums2 = [2,5,6]\nCompare 3 and 6 -> nums1[5] = 6\nCompare 3 and 5 -> nums1[4] = 5\nCompare 3 and 2 -> nums1[3] = 3\nCompare 2 and 2 -> nums1[2] = 2\nResult: [1,2,2,3,5,6].',
          edgeCases: ['m = 0 (nums1 is empty)', 'n = 0 (nums2 is empty)', 'All elements in nums2 smaller than nums1']
        },
        timeComplexity: 'O(m + n) - single pass from back',
        spaceComplexity: 'O(1) - in-place inside nums1 buffer',
        solution: {
          c: `#include <stdio.h>

void merge(int* nums1, int nums1Size, int m, int* nums2, int nums2Size, int n) {
    int p1 = m - 1;
    int p2 = n - 1;
    int p = m + n - 1;

    // Fill nums1 starting from the end
    while (p2 >= 0) {
        if (p1 >= 0 && nums1[p1] > nums2[p2]) {
            nums1[p] = nums1[p1];
            p1--;
        } else {
            nums1[p] = nums2[p2];
            p2--;
        }
        p--;
    }
}

int main(void) {
    int nums1[6] = {1, 2, 3, 0, 0, 0};
    int nums2[3] = {2, 5, 6};
    merge(nums1, 6, 3, nums2, 3, 3);

    for (int i = 0; i < 6; i++) {
        printf("%d ", nums1[i]); // 1 2 2 3 5 6
    }
    printf("\\n");
    return 0;
}`,
          python: `def merge(nums1: list[int], m: int, nums2: list[int], n: int) -> None:
    """
    Do not return anything, modify nums1 in-place instead.
    """
    p1 = m - 1
    p2 = n - 1
    p = m + n - 1

    while p2 >= 0:
        if p1 >= 0 and nums1[p1] > nums2[p2]:
            nums1[p] = nums1[p1]
            p1 -= 1
        else:
            nums1[p] = nums2[p2]
            p2 -= 1
        p -= 1

nums1 = [1, 2, 3, 0, 0, 0]
nums2 = [2, 5, 6]
merge(nums1, 3, nums2, 3)
print(nums1) # [1, 2, 2, 3, 5, 6]`
        }
      }
    ]
  },
  {
    id: 'c-structs-unions-alignment',
    title: '4. Structs, Unions & Memory Alignment',
    level: 'Moderate',
    tagline: 'Understand byte padding, CPU cache line alignment, and union-based type punning.',
    estimatedHours: 15,
    concepts: [
      {
        title: 'Struct Memory Alignment & Padding Rules',
        description:
          'CPUs read memory in word chunks (4 or 8 bytes). To optimize memory bus transfers, compilers insert padding bytes so that an n-byte type is aligned on an address divisible by n. Reordering struct fields from largest to smallest can cut struct size in half!',
        codeSnippetC: `#include <stdio.h>

// Poorly ordered: 1 + (3 pad) + 4 + 8 = 16 bytes? Wait!
struct BadPadding {
    char a;      // 1 byte + 3 padding
    int b;       // 4 bytes
    char c;      // 1 byte + 7 padding
    double d;    // 8 bytes -> Total: 24 bytes!
};

// Optimized ordering (largest to smallest):
struct GoodPadding {
    double d;    // 8 bytes
    int b;       // 4 bytes
    char a;      // 1 byte
    char c;      // 1 byte + 2 padding -> Total: 16 bytes!
};

int main(void) {
    printf("Bad struct size:  %zu bytes\\n", sizeof(struct BadPadding));  // 24
    printf("Good struct size: %zu bytes\\n", sizeof(struct GoodPadding)); // 16
    return 0;
}`,
        codeSnippetPython: `# Python objects have hefty memory overhead.
# A Python class instance uses a __dict__ by default (~150+ bytes).
# Using __slots__ optimizes Python memory layout:
class Point:
    __slots__ = ['x', 'y'] # Prevents dynamic __dict__
    def __init__(self, x, y):
        self.x = x
        self.y = y`,
        notes: [
          'Use #pragma pack(push, 1) to disable padding when reading binary network protocols or disk files, but beware of CPU alignment faults on ARM architectures.',
          'Unions allocate enough memory for their single largest member. All members share the same starting memory address.'
        ]
      }
    ],
    problems: [
      {
        id: 'c-prob-6-min-stack',
        title: 'Design Min Stack with Pure C Structs',
        difficulty: 'Medium',
        level: 'Moderate',
        category: 'Data Structures in C',
        leetcodeNumber: 155,
        description:
          'Design a stack that supports push, pop, top, and retrieving the minimum element in constant O(1) time. Implement MinStack in pure C with dynamic array resizing.',
        inputExample: 'MinStack* obj = minStackCreate();\nminStackPush(obj, -2);\nminStackPush(obj, 0);\nminStackPush(obj, -3);\nminStackGetMin(obj); // return -3\nminStackPop(obj);\nminStackTop(obj);    // return 0\nminStackGetMin(obj); // return -2',
        outputExample: '[-3, 0, -2]',
        constraints: [
          '-2^31 <= val <= 2^31 - 1',
          'Methods pop, top, and getMin will always be called on non-empty stacks',
          'All operations must be O(1) time'
        ],
        approach: {
          intuition:
            'Store pairs of (value, current_min) in the stack array. When pushing x, new_min = min(x, current_min). This ensures that every element carries the minimum up to that point in history, so pop automatically restores the previous minimum in O(1)!',
          stepByStep: [
            'Define struct Element { int val; int min; }.',
            'Maintain dynamic array of Element with capacity and top index.',
            'Push: if empty, min is val; else min is min(val, top.min).',
            'Pop: decrement top index.',
            'Top: return stack[top - 1].val.',
            'GetMin: return stack[top - 1].min.'
          ],
          dryRun:
            'Push -2: pair=(-2, -2)\nPush 0: pair=(0, -2)\nPush -3: pair=(-3, -3)\ngetMin() -> -3\nPop -> removes (-3, -3)\ngetMin() -> top is (0, -2) -> -2!',
          edgeCases: ['Single element stack', 'Repeated minimum values']
        },
        timeComplexity: 'O(1) for push, pop, top, and getMin',
        spaceComplexity: 'O(N) for storing min alongside values',
        solution: {
          c: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int val;
    int min;
} StackNode;

typedef struct {
    StackNode *data;
    int top;
    int capacity;
} MinStack;

MinStack* minStackCreate(void) {
    MinStack *s = (MinStack*)malloc(sizeof(MinStack));
    s->capacity = 8;
    s->top = 0;
    s->data = (StackNode*)malloc(s->capacity * sizeof(StackNode));
    return s;
}

void minStackPush(MinStack* obj, int val) {
    if (obj->top == obj->capacity) {
        obj->capacity *= 2;
        obj->data = (StackNode*)realloc(obj->data, obj->capacity * sizeof(StackNode));
    }
    int current_min = val;
    if (obj->top > 0) {
        int prev_min = obj->data[obj->top - 1].min;
        if (prev_min < current_min) current_min = prev_min;
    }
    obj->data[obj->top].val = val;
    obj->data[obj->top].min = current_min;
    obj->top++;
}

void minStackPop(MinStack* obj) {
    if (obj->top > 0) {
        obj->top--;
    }
}

int minStackTop(MinStack* obj) {
    return obj->data[obj->top - 1].val;
}

int minStackGetMin(MinStack* obj) {
    return obj->data[obj->top - 1].min;
}

void minStackFree(MinStack* obj) {
    if (obj) {
        free(obj->data);
        free(obj);
    }
}

int main(void) {
    MinStack *s = minStackCreate();
    minStackPush(s, -2);
    minStackPush(s, 0);
    minStackPush(s, -3);
    printf("Min: %d\\n", minStackGetMin(s)); // -3
    minStackPop(s);
    printf("Top: %d\\n", minStackTop(s));    // 0
    printf("Min: %d\\n", minStackGetMin(s)); // -2
    minStackFree(s);
    return 0;
}`,
          python: `class MinStack:
    def __init__(self):
        # Stack stores tuples of (val, current_min)
        self.stack = []

    def push(self, val: int) -> None:
        if not self.stack:
            self.stack.append((val, val))
        else:
            current_min = min(val, self.stack[-1][1])
            self.stack.append((val, current_min))

    def pop(self) -> None:
        self.stack.pop()

    def top(self) -> int:
        return self.stack[-1][0]

    def getMin(self) -> int:
        return self.stack[-1][1]

obj = MinStack()
obj.push(-2)
obj.push(0)
obj.push(-3)
print(obj.getMin()) # -3
obj.pop()
print(obj.top())    # 0
print(obj.getMin()) # -2`
        }
      }
    ]
  },
  {
    id: 'c-bitwise-tricks-advanced',
    title: '5. Bit Manipulation & Low-Level CP Hacks',
    level: 'Advanced',
    tagline: 'Supercharge algorithm execution with O(1) bitwise operations: masks, Brian Kernighan, XOR trick, power-of-two.',
    estimatedHours: 18,
    concepts: [
      {
        title: 'Essential Bitwise Idioms in C & Competitive Programming',
        description:
          'Bitwise operators work directly on the ALU registers in a single CPU clock cycle. Fundamental idioms: x & (x - 1) clears the lowest set bit. x & (-x) isolates the lowest set bit. x ^ x = 0 (self-inverse).',
        codeSnippetC: `#include <stdio.h>
#include <stdbool.h>

// Check if power of 2:
bool isPowerOfTwo(int n) {
    return (n > 0) && ((n & (n - 1)) == 0);
}

// Brian Kernighan's bit counting:
int countSetBits(unsigned int n) {
    int count = 0;
    while (n) {
        n &= (n - 1); // Clears rightmost set bit
        count++;
    }
    return count;
}

// In-place XOR swap (no temp variable needed):
void xorSwap(int *a, int *b) {
    if (a != b) { // Must check distinct addresses!
        *a ^= *b;
        *b ^= *a;
        *a ^= *b;
    }
}`,
        codeSnippetPython: `# Bitwise operations in Python:
def count_set_bits(n: int) -> int:
    return bin(n).count('1') # Or (n).bit_count() in Python 3.10+

def is_power_of_two(n: int) -> bool:
    return n > 0 and (n & (n - 1)) == 0`,
        notes: [
          'Warning with XOR swap: if a and b point to the SAME memory address, *a ^= *b wipes the number to 0!',
          'C builtin functions: __builtin_popcount(x), __builtin_clz(x) (count leading zeros), __builtin_ctz(x) (count trailing zeros).'
        ]
      }
    ],
    problems: [
      {
        id: 'c-prob-7-single-number',
        title: 'Single Number (Find Unique with XOR)',
        difficulty: 'Easy',
        level: 'Advanced',
        category: 'Bit Manipulation',
        leetcodeNumber: 136,
        description:
          'Given a non-empty array of integers nums, every element appears twice except for one. Find that single one. Implement a solution with linear runtime complexity O(N) and use only constant extra space O(1).',
        inputExample: 'nums = [4,1,2,1,2] -> Output: 4',
        outputExample: '4',
        constraints: [
          '1 <= nums.length <= 3 * 10^4',
          '-3 * 10^4 <= nums[i] <= 3 * 10^4',
          'Every element appears twice except one which appears once'
        ],
        approach: {
          intuition:
            'XOR has two magical properties: a ^ a = 0 (identical numbers cancel out) and a ^ 0 = a. Because XOR is commutative and associative, XORing all elements together will cancel all paired duplicates and leave only the unique number!',
          stepByStep: [
            'Initialize result = 0.',
            'Loop through every element in the array.',
            'Compute result ^= nums[i].',
            'Return result.'
          ],
          dryRun:
            'nums = [4, 1, 2, 1, 2]\nres = 0 ^ 4 = 4\nres = 4 ^ 1\nres = (4 ^ 1) ^ 2\nres = (4 ^ 1 ^ 2) ^ 1 = 4 ^ 2\nres = (4 ^ 2) ^ 2 = 4 ^ 0 = 4!',
          edgeCases: ['Array of size 1 (returns nums[0])']
        },
        timeComplexity: 'O(N) - single pass over array',
        spaceComplexity: 'O(1) - no extra memory needed',
        solution: {
          c: `#include <stdio.h>

int singleNumber(int* nums, int numsSize) {
    int unique = 0;
    for (int i = 0; i < numsSize; i++) {
        unique ^= nums[i];
    }
    return unique;
}

int main(void) {
    int arr[] = {4, 1, 2, 1, 2};
    printf("Single number: %d\\n", singleNumber(arr, 5)); // 4
    return 0;
}`,
          python: `def single_number(nums: list[int]) -> int:
    unique = 0
    for num in nums:
        unique ^= num
    return unique

print(single_number([4, 1, 2, 1, 2])) # 4`
        }
      }
    ]
  }
];
