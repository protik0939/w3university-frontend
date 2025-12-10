// Exercise data for all programming languages

export interface Exercise {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  problemStatement: string;
  inputDescription: string;
  outputDescription: string;
  sampleInput: string;
  sampleOutput: string;
  tags: string[];
}

export interface LanguageExercises {
  languageId: string;
  languageName: string;
  exercises: Exercise[];
}

export const exercisesData: LanguageExercises[] = [
  {
    languageId: 'javascript',
    languageName: 'JavaScript',
    exercises: [
      {
        id: 'js-001',
        title: 'Hello World',
        difficulty: 'Beginner',
        problemStatement: 'Write a function that returns the string "Hello, World!".',
        inputDescription: 'No input required.',
        outputDescription: 'Return the string "Hello, World!".',
        sampleInput: '',
        sampleOutput: 'Hello, World!',
        tags: ['basics', 'strings']
      },
      {
        id: 'js-002',
        title: 'Sum of Two Numbers',
        difficulty: 'Beginner',
        problemStatement: 'Write a function that takes two numbers as parameters and returns their sum.',
        inputDescription: 'Two numbers a and b.',
        outputDescription: 'The sum of a and b.',
        sampleInput: 'a = 5, b = 3',
        sampleOutput: '8',
        tags: ['basics', 'arithmetic']
      },
      {
        id: 'js-003',
        title: 'Check Even or Odd',
        difficulty: 'Beginner',
        problemStatement: 'Write a function that takes a number and returns "Even" if it\'s even, "Odd" if it\'s odd.',
        inputDescription: 'A single integer n.',
        outputDescription: 'String "Even" or "Odd".',
        sampleInput: 'n = 4',
        sampleOutput: 'Even',
        tags: ['conditionals', 'basics']
      },
      {
        id: 'js-004',
        title: 'Reverse a String',
        difficulty: 'Intermediate',
        problemStatement: 'Write a function that takes a string and returns it reversed.',
        inputDescription: 'A string str.',
        outputDescription: 'The reversed string.',
        sampleInput: 'str = "hello"',
        sampleOutput: 'olleh',
        tags: ['strings', 'manipulation']
      },
      {
        id: 'js-005',
        title: 'Find Largest in Array',
        difficulty: 'Intermediate',
        problemStatement: 'Write a function that takes an array of numbers and returns the largest number.',
        inputDescription: 'An array of integers.',
        outputDescription: 'The largest integer in the array.',
        sampleInput: '[3, 7, 2, 9, 1]',
        sampleOutput: '9',
        tags: ['arrays', 'loops']
      },
      {
        id: 'js-006',
        title: 'Palindrome Checker',
        difficulty: 'Intermediate',
        problemStatement: 'Write a function that checks if a given string is a palindrome (reads the same forwards and backwards).',
        inputDescription: 'A string str.',
        outputDescription: 'Boolean true if palindrome, false otherwise.',
        sampleInput: 'str = "racecar"',
        sampleOutput: 'true',
        tags: ['strings', 'algorithms']
      },
      {
        id: 'js-007',
        title: 'Fibonacci Sequence',
        difficulty: 'Advanced',
        problemStatement: 'Write a function that generates the first n numbers in the Fibonacci sequence.',
        inputDescription: 'An integer n (n >= 1).',
        outputDescription: 'An array containing the first n Fibonacci numbers.',
        sampleInput: 'n = 7',
        sampleOutput: '[0, 1, 1, 2, 3, 5, 8]',
        tags: ['recursion', 'algorithms']
      },
      {
        id: 'js-008',
        title: 'Deep Clone Object',
        difficulty: 'Advanced',
        problemStatement: 'Write a function that creates a deep clone of a nested object.',
        inputDescription: 'A nested object obj.',
        outputDescription: 'A deep cloned copy of the object.',
        sampleInput: 'obj = {a: 1, b: {c: 2}}',
        sampleOutput: '{a: 1, b: {c: 2}}',
        tags: ['objects', 'recursion']
      },
      {
        id: 'js-009',
        title: 'Debounce Function',
        difficulty: 'Advanced',
        problemStatement: 'Implement a debounce function that delays the execution of a function until after a specified time has elapsed since the last time it was invoked.',
        inputDescription: 'A function func and delay time in milliseconds.',
        outputDescription: 'A debounced version of the function.',
        sampleInput: 'func = console.log, delay = 300',
        sampleOutput: 'Debounced function',
        tags: ['closures', 'async', 'performance']
      }
    ]
  },
  {
    languageId: 'python',
    languageName: 'Python',
    exercises: [
      {
        id: 'py-001',
        title: 'Hello World',
        difficulty: 'Beginner',
        problemStatement: 'Write a program that prints "Hello, World!" to the console.',
        inputDescription: 'No input required.',
        outputDescription: 'Print "Hello, World!" to the console.',
        sampleInput: '',
        sampleOutput: 'Hello, World!',
        tags: ['basics', 'print']
      },
      {
        id: 'py-002',
        title: 'Calculate Area of Circle',
        difficulty: 'Beginner',
        problemStatement: 'Write a function that calculates the area of a circle given its radius. Use π = 3.14159.',
        inputDescription: 'A float radius.',
        outputDescription: 'The area of the circle (float).',
        sampleInput: 'radius = 5',
        sampleOutput: '78.53975',
        tags: ['math', 'basics']
      },
      {
        id: 'py-003',
        title: 'List Comprehension',
        difficulty: 'Beginner',
        problemStatement: 'Create a list of squares of numbers from 1 to n using list comprehension.',
        inputDescription: 'An integer n.',
        outputDescription: 'A list of squares [1, 4, 9, 16, ...].',
        sampleInput: 'n = 5',
        sampleOutput: '[1, 4, 9, 16, 25]',
        tags: ['lists', 'comprehension']
      },
      {
        id: 'py-004',
        title: 'Count Vowels',
        difficulty: 'Intermediate',
        problemStatement: 'Write a function that counts the number of vowels (a, e, i, o, u) in a given string.',
        inputDescription: 'A string text.',
        outputDescription: 'The count of vowels (integer).',
        sampleInput: 'text = "Hello World"',
        sampleOutput: '3',
        tags: ['strings', 'iteration']
      },
      {
        id: 'py-005',
        title: 'Prime Number Checker',
        difficulty: 'Intermediate',
        problemStatement: 'Write a function that checks if a given number is prime.',
        inputDescription: 'An integer n (n > 1).',
        outputDescription: 'Boolean True if prime, False otherwise.',
        sampleInput: 'n = 17',
        sampleOutput: 'True',
        tags: ['algorithms', 'math']
      },
      {
        id: 'py-006',
        title: 'Merge Two Sorted Lists',
        difficulty: 'Intermediate',
        problemStatement: 'Write a function that merges two sorted lists into one sorted list.',
        inputDescription: 'Two sorted lists list1 and list2.',
        outputDescription: 'A single merged and sorted list.',
        sampleInput: 'list1 = [1, 3, 5], list2 = [2, 4, 6]',
        sampleOutput: '[1, 2, 3, 4, 5, 6]',
        tags: ['lists', 'sorting', 'algorithms']
      },
      {
        id: 'py-007',
        title: 'Binary Search',
        difficulty: 'Advanced',
        problemStatement: 'Implement binary search algorithm to find the index of a target value in a sorted array.',
        inputDescription: 'A sorted list arr and a target value.',
        outputDescription: 'Index of target if found, -1 otherwise.',
        sampleInput: 'arr = [1, 3, 5, 7, 9], target = 5',
        sampleOutput: '2',
        tags: ['algorithms', 'search', 'divide-and-conquer']
      },
      {
        id: 'py-008',
        title: 'Class Inheritance',
        difficulty: 'Advanced',
        problemStatement: 'Create a base class Animal with method speak(), and derived classes Dog and Cat that override speak() with their own sounds.',
        inputDescription: 'No input required.',
        outputDescription: 'Demonstrate polymorphism with different animal sounds.',
        sampleInput: '',
        sampleOutput: 'Dog: Woof! Cat: Meow!',
        tags: ['oop', 'inheritance', 'polymorphism']
      },
      {
        id: 'py-009',
        title: 'Decorator Function',
        difficulty: 'Advanced',
        problemStatement: 'Create a decorator that measures the execution time of a function.',
        inputDescription: 'A function to be decorated.',
        outputDescription: 'Execution time in seconds.',
        sampleInput: 'def slow_function(): time.sleep(2)',
        sampleOutput: 'Execution time: 2.001s',
        tags: ['decorators', 'advanced', 'functions']
      }
    ]
  },
  {
    languageId: 'java',
    languageName: 'Java',
    exercises: [
      {
        id: 'java-001',
        title: 'Hello World',
        difficulty: 'Beginner',
        problemStatement: 'Write a Java program that prints "Hello, World!" to the console.',
        inputDescription: 'No input required.',
        outputDescription: 'Print "Hello, World!".',
        sampleInput: '',
        sampleOutput: 'Hello, World!',
        tags: ['basics', 'output']
      },
      {
        id: 'java-002',
        title: 'Sum of Array Elements',
        difficulty: 'Beginner',
        problemStatement: 'Write a method that calculates the sum of all elements in an integer array.',
        inputDescription: 'An integer array arr.',
        outputDescription: 'The sum of all elements (integer).',
        sampleInput: 'arr = {1, 2, 3, 4, 5}',
        sampleOutput: '15',
        tags: ['arrays', 'loops']
      },
      {
        id: 'java-003',
        title: 'String Manipulation',
        difficulty: 'Beginner',
        problemStatement: 'Write a method that converts a string to uppercase and removes all spaces.',
        inputDescription: 'A string str.',
        outputDescription: 'Modified string without spaces and in uppercase.',
        sampleInput: 'str = "hello world"',
        sampleOutput: 'HELLOWORLD',
        tags: ['strings', 'manipulation']
      },
      {
        id: 'java-004',
        title: 'Find Duplicates in Array',
        difficulty: 'Intermediate',
        problemStatement: 'Write a method that finds all duplicate elements in an array and returns them as a list.',
        inputDescription: 'An integer array arr.',
        outputDescription: 'ArrayList of duplicate elements.',
        sampleInput: 'arr = {1, 2, 3, 2, 4, 1}',
        sampleOutput: '[1, 2]',
        tags: ['arrays', 'collections', 'algorithms']
      },
      {
        id: 'java-005',
        title: 'Implement Stack',
        difficulty: 'Intermediate',
        problemStatement: 'Implement a Stack data structure with push, pop, peek, and isEmpty methods.',
        inputDescription: 'Stack operations.',
        outputDescription: 'Working stack implementation.',
        sampleInput: 'push(1), push(2), pop(), peek()',
        sampleOutput: '2, 1',
        tags: ['data-structures', 'stack', 'oop']
      },
      {
        id: 'java-006',
        title: 'Binary Tree Traversal',
        difficulty: 'Intermediate',
        problemStatement: 'Implement inorder, preorder, and postorder traversal for a binary tree.',
        inputDescription: 'A binary tree root node.',
        outputDescription: 'Three lists representing different traversals.',
        sampleInput: 'Tree: 1, 2, 3, 4, 5',
        sampleOutput: 'Inorder: [4,2,5,1,3]',
        tags: ['trees', 'recursion', 'data-structures']
      },
      {
        id: 'java-007',
        title: 'Thread Synchronization',
        difficulty: 'Advanced',
        problemStatement: 'Create a multi-threaded program that safely increments a shared counter using synchronization.',
        inputDescription: 'Multiple threads accessing shared counter.',
        outputDescription: 'Final count should be accurate.',
        sampleInput: '5 threads, 1000 increments each',
        sampleOutput: '5000',
        tags: ['multithreading', 'synchronization', 'concurrency']
      },
      {
        id: 'java-008',
        title: 'Generic Class Implementation',
        difficulty: 'Advanced',
        problemStatement: 'Create a generic Pair<T, U> class that can hold two values of different types with getters and setters.',
        inputDescription: 'Generic type parameters.',
        outputDescription: 'Working generic class.',
        sampleInput: 'Pair<String, Integer> p = new Pair<>("Age", 25)',
        sampleOutput: 'Age: 25',
        tags: ['generics', 'oop', 'advanced']
      },
      {
        id: 'java-009',
        title: 'Design Pattern: Singleton',
        difficulty: 'Advanced',
        problemStatement: 'Implement the Singleton design pattern with thread-safe lazy initialization.',
        inputDescription: 'No input required.',
        outputDescription: 'Thread-safe Singleton class.',
        sampleInput: '',
        sampleOutput: 'Same instance returned always',
        tags: ['design-patterns', 'singleton', 'multithreading']
      }
    ]
  },
  {
    languageId: 'cpp',
    languageName: 'C++',
    exercises: [
      {
        id: 'cpp-001',
        title: 'Hello World',
        difficulty: 'Beginner',
        problemStatement: 'Write a C++ program that outputs "Hello, World!" to the console.',
        inputDescription: 'No input required.',
        outputDescription: 'Print "Hello, World!".',
        sampleInput: '',
        sampleOutput: 'Hello, World!',
        tags: ['basics', 'iostream']
      },
      {
        id: 'cpp-002',
        title: 'Swap Two Numbers',
        difficulty: 'Beginner',
        problemStatement: 'Write a function to swap two numbers using pointers.',
        inputDescription: 'Two integers a and b.',
        outputDescription: 'Swapped values of a and b.',
        sampleInput: 'a = 5, b = 10',
        sampleOutput: 'a = 10, b = 5',
        tags: ['pointers', 'basics']
      },
      {
        id: 'cpp-003',
        title: 'Array Sum',
        difficulty: 'Beginner',
        problemStatement: 'Write a function that calculates the sum of elements in an array.',
        inputDescription: 'An integer array and its size.',
        outputDescription: 'Sum of all elements.',
        sampleInput: 'arr[] = {1, 2, 3, 4, 5}, n = 5',
        sampleOutput: '15',
        tags: ['arrays', 'loops']
      },
      {
        id: 'cpp-004',
        title: 'Vector Operations',
        difficulty: 'Intermediate',
        problemStatement: 'Create a program that uses STL vector to store integers, sort them, and remove duplicates.',
        inputDescription: 'A vector of integers.',
        outputDescription: 'Sorted vector without duplicates.',
        sampleInput: 'vec = {5, 2, 8, 2, 9, 5}',
        sampleOutput: '{2, 5, 8, 9}',
        tags: ['stl', 'vectors', 'algorithms']
      },
      {
        id: 'cpp-005',
        title: 'Class with Constructor',
        difficulty: 'Intermediate',
        problemStatement: 'Create a Rectangle class with private members length and width, constructor, and methods to calculate area and perimeter.',
        inputDescription: 'Length and width values.',
        outputDescription: 'Area and perimeter calculations.',
        sampleInput: 'length = 5, width = 3',
        sampleOutput: 'Area: 15, Perimeter: 16',
        tags: ['oop', 'classes', 'constructors']
      },
      {
        id: 'cpp-006',
        title: 'Linked List Implementation',
        difficulty: 'Intermediate',
        problemStatement: 'Implement a singly linked list with insert, delete, and display operations.',
        inputDescription: 'Various operations on linked list.',
        outputDescription: 'Working linked list.',
        sampleInput: 'insert(1), insert(2), insert(3)',
        sampleOutput: '1 -> 2 -> 3',
        tags: ['linked-list', 'data-structures', 'pointers']
      },
      {
        id: 'cpp-007',
        title: 'Template Function',
        difficulty: 'Advanced',
        problemStatement: 'Create a template function that works with any data type to find the maximum of two values.',
        inputDescription: 'Two values of any comparable type.',
        outputDescription: 'The larger value.',
        sampleInput: 'max(5, 3) or max(5.5, 3.2)',
        sampleOutput: '5 or 5.5',
        tags: ['templates', 'generics', 'advanced']
      },
      {
        id: 'cpp-008',
        title: 'Smart Pointers',
        difficulty: 'Advanced',
        problemStatement: 'Demonstrate the use of unique_ptr, shared_ptr, and weak_ptr for memory management.',
        inputDescription: 'Dynamic memory allocations.',
        outputDescription: 'Safe memory management without leaks.',
        sampleInput: 'Create and destroy objects',
        sampleOutput: 'No memory leaks',
        tags: ['smart-pointers', 'memory-management', 'modern-cpp']
      },
      {
        id: 'cpp-009',
        title: 'Operator Overloading',
        difficulty: 'Advanced',
        problemStatement: 'Create a Complex number class and overload +, -, *, and << operators.',
        inputDescription: 'Complex number operations.',
        outputDescription: 'Working complex arithmetic.',
        sampleInput: 'Complex(1, 2) + Complex(3, 4)',
        sampleOutput: '4 + 6i',
        tags: ['operator-overloading', 'oop', 'advanced']
      }
    ]
  },
  {
    languageId: 'csharp',
    languageName: 'C#',
    exercises: [
      {
        id: 'cs-001',
        title: 'Hello World',
        difficulty: 'Beginner',
        problemStatement: 'Write a C# program that prints "Hello, World!" to the console.',
        inputDescription: 'No input required.',
        outputDescription: 'Print "Hello, World!".',
        sampleInput: '',
        sampleOutput: 'Hello, World!',
        tags: ['basics', 'console']
      },
      {
        id: 'cs-002',
        title: 'String Interpolation',
        difficulty: 'Beginner',
        problemStatement: 'Create a program that uses string interpolation to display a person\'s name and age.',
        inputDescription: 'String name and int age.',
        outputDescription: 'Formatted string with name and age.',
        sampleInput: 'name = "Alice", age = 25',
        sampleOutput: 'Alice is 25 years old',
        tags: ['strings', 'interpolation']
      },
      {
        id: 'cs-003',
        title: 'LINQ Basics',
        difficulty: 'Beginner',
        problemStatement: 'Use LINQ to filter a list of integers and return only even numbers.',
        inputDescription: 'A List<int> of numbers.',
        outputDescription: 'A new list containing only even numbers.',
        sampleInput: 'numbers = {1, 2, 3, 4, 5, 6}',
        sampleOutput: '{2, 4, 6}',
        tags: ['linq', 'collections']
      },
      {
        id: 'cs-004',
        title: 'Property and Auto-Properties',
        difficulty: 'Intermediate',
        problemStatement: 'Create a Person class with properties FirstName, LastName, and a read-only property FullName.',
        inputDescription: 'First and last names.',
        outputDescription: 'Full name concatenation.',
        sampleInput: 'FirstName = "John", LastName = "Doe"',
        sampleOutput: 'FullName = "John Doe"',
        tags: ['oop', 'properties', 'classes']
      },
      {
        id: 'cs-005',
        title: 'Async/Await',
        difficulty: 'Intermediate',
        problemStatement: 'Create an async method that simulates fetching data with a delay and returns the result.',
        inputDescription: 'Delay time in milliseconds.',
        outputDescription: 'Data after specified delay.',
        sampleInput: 'delay = 2000',
        sampleOutput: 'Data fetched after 2 seconds',
        tags: ['async', 'await', 'tasks']
      },
      {
        id: 'cs-006',
        title: 'Interface Implementation',
        difficulty: 'Intermediate',
        problemStatement: 'Create an IShape interface with Area() method and implement it in Circle and Rectangle classes.',
        inputDescription: 'Shape dimensions.',
        outputDescription: 'Area calculations for different shapes.',
        sampleInput: 'Circle(radius=5), Rectangle(5,3)',
        sampleOutput: '78.54, 15',
        tags: ['interfaces', 'oop', 'polymorphism']
      },
      {
        id: 'cs-007',
        title: 'Delegates and Events',
        difficulty: 'Advanced',
        problemStatement: 'Create a custom event system using delegates that notifies subscribers when a value changes.',
        inputDescription: 'Value changes.',
        outputDescription: 'Event notifications.',
        sampleInput: 'value changes from 10 to 20',
        sampleOutput: 'Event raised: Value changed',
        tags: ['delegates', 'events', 'advanced']
      },
      {
        id: 'cs-008',
        title: 'Extension Methods',
        difficulty: 'Advanced',
        problemStatement: 'Create extension methods for the string class to add ToTitleCase() and WordCount() functionality.',
        inputDescription: 'String values.',
        outputDescription: 'Extended functionality.',
        sampleInput: 'str = "hello world"',
        sampleOutput: 'ToTitleCase: "Hello World", WordCount: 2',
        tags: ['extension-methods', 'advanced', 'strings']
      },
      {
        id: 'cs-009',
        title: 'Generic Repository Pattern',
        difficulty: 'Advanced',
        problemStatement: 'Implement a generic repository pattern with CRUD operations for any entity type.',
        inputDescription: 'Generic type parameter.',
        outputDescription: 'Reusable repository class.',
        sampleInput: 'Repository<User>',
        sampleOutput: 'CRUD operations available',
        tags: ['generics', 'design-patterns', 'advanced']
      }
    ]
  },
  {
    languageId: 'typescript',
    languageName: 'TypeScript',
    exercises: [
      {
        id: 'ts-001',
        title: 'Type Annotations',
        difficulty: 'Beginner',
        problemStatement: 'Create a function with proper type annotations that adds two numbers.',
        inputDescription: 'Two numbers with type annotations.',
        outputDescription: 'Sum with return type annotation.',
        sampleInput: 'a: number = 5, b: number = 3',
        sampleOutput: '8',
        tags: ['basics', 'types']
      },
      {
        id: 'ts-002',
        title: 'Interface Definition',
        difficulty: 'Beginner',
        problemStatement: 'Define an interface for a User with properties id, name, email, and optional age.',
        inputDescription: 'User properties.',
        outputDescription: 'Type-safe user object.',
        sampleInput: 'id: 1, name: "John", email: "john@example.com"',
        sampleOutput: 'Valid User object',
        tags: ['interfaces', 'types']
      },
      {
        id: 'ts-003',
        title: 'Enum Usage',
        difficulty: 'Beginner',
        problemStatement: 'Create an enum for days of the week and a function that returns if a day is a weekend.',
        inputDescription: 'Day enum value.',
        outputDescription: 'Boolean indicating if weekend.',
        sampleInput: 'Day.Saturday',
        sampleOutput: 'true',
        tags: ['enums', 'basics']
      },
      {
        id: 'ts-004',
        title: 'Generic Function',
        difficulty: 'Intermediate',
        problemStatement: 'Create a generic function that returns the first element of an array of any type.',
        inputDescription: 'Array of any type.',
        outputDescription: 'First element with correct type inference.',
        sampleInput: '[1, 2, 3] or ["a", "b", "c"]',
        sampleOutput: '1 or "a"',
        tags: ['generics', 'arrays']
      },
      {
        id: 'ts-005',
        title: 'Type Guards',
        difficulty: 'Intermediate',
        problemStatement: 'Create a type guard function that checks if an object is of type Dog or Cat.',
        inputDescription: 'Animal object.',
        outputDescription: 'Type narrowing with proper checks.',
        sampleInput: 'animal = {name: "Buddy", bark: () => {}}',
        sampleOutput: 'Type is Dog',
        tags: ['type-guards', 'types', 'advanced']
      },
      {
        id: 'ts-006',
        title: 'Union and Intersection Types',
        difficulty: 'Intermediate',
        problemStatement: 'Create functions that demonstrate union types (string | number) and intersection types.',
        inputDescription: 'Various type combinations.',
        outputDescription: 'Type-safe operations.',
        sampleInput: 'value: string | number',
        sampleOutput: 'Proper type handling',
        tags: ['types', 'unions', 'intersections']
      },
      {
        id: 'ts-007',
        title: 'Mapped Types',
        difficulty: 'Advanced',
        problemStatement: 'Create a mapped type that makes all properties of an interface optional and readonly.',
        inputDescription: 'Original interface.',
        outputDescription: 'Transformed type.',
        sampleInput: 'interface User {name: string, age: number}',
        sampleOutput: 'Readonly<Partial<User>>',
        tags: ['mapped-types', 'advanced', 'utility-types']
      },
      {
        id: 'ts-008',
        title: 'Conditional Types',
        difficulty: 'Advanced',
        problemStatement: 'Create a conditional type that extracts the return type of a function or returns never.',
        inputDescription: 'Type parameter.',
        outputDescription: 'Conditional type logic.',
        sampleInput: 'T extends (...args: any) => infer R ? R : never',
        sampleOutput: 'Return type extracted',
        tags: ['conditional-types', 'advanced', 'utility-types']
      },
      {
        id: 'ts-009',
        title: 'Decorators',
        difficulty: 'Advanced',
        problemStatement: 'Create a class decorator that logs method calls and a property decorator that validates values.',
        inputDescription: 'Class with decorators.',
        outputDescription: 'Enhanced class behavior.',
        sampleInput: '@log class MyClass {}',
        sampleOutput: 'Method calls logged',
        tags: ['decorators', 'advanced', 'metaprogramming']
      }
    ]
  },
  {
    languageId: 'php',
    languageName: 'PHP',
    exercises: [
      {
        id: 'php-001',
        title: 'Hello World',
        difficulty: 'Beginner',
        problemStatement: 'Write a PHP script that outputs "Hello, World!".',
        inputDescription: 'No input required.',
        outputDescription: 'Echo "Hello, World!".',
        sampleInput: '',
        sampleOutput: 'Hello, World!',
        tags: ['basics', 'echo']
      },
      {
        id: 'php-002',
        title: 'Form Handling',
        difficulty: 'Beginner',
        problemStatement: 'Create a script that receives form data via POST and sanitizes it.',
        inputDescription: 'POST data with name and email.',
        outputDescription: 'Sanitized and validated data.',
        sampleInput: 'name = "John", email = "john@example.com"',
        sampleOutput: 'Valid sanitized data',
        tags: ['forms', 'validation', 'security']
      },
      {
        id: 'php-003',
        title: 'Array Functions',
        difficulty: 'Beginner',
        problemStatement: 'Use array functions to filter, map, and reduce an array of numbers.',
        inputDescription: 'Array of integers.',
        outputDescription: 'Filtered, mapped, and reduced results.',
        sampleInput: '$arr = [1, 2, 3, 4, 5]',
        sampleOutput: 'Even numbers: [2, 4]',
        tags: ['arrays', 'functions']
      },
      {
        id: 'php-004',
        title: 'Database Connection',
        difficulty: 'Intermediate',
        problemStatement: 'Create a PDO database connection with prepared statements to prevent SQL injection.',
        inputDescription: 'Database credentials and query.',
        outputDescription: 'Safe database operations.',
        sampleInput: 'SELECT * FROM users WHERE id = ?',
        sampleOutput: 'User data retrieved safely',
        tags: ['database', 'pdo', 'security']
      },
      {
        id: 'php-005',
        title: 'Session Management',
        difficulty: 'Intermediate',
        problemStatement: 'Create a login system using sessions to track authenticated users.',
        inputDescription: 'Username and password.',
        outputDescription: 'Session-based authentication.',
        sampleInput: 'username = "admin", password = "pass123"',
        sampleOutput: 'Session started, user logged in',
        tags: ['sessions', 'authentication', 'security']
      },
      {
        id: 'php-006',
        title: 'File Upload Handling',
        difficulty: 'Intermediate',
        problemStatement: 'Create a secure file upload script with validation for file type, size, and proper storage.',
        inputDescription: 'Uploaded file.',
        outputDescription: 'File stored securely.',
        sampleInput: 'image.jpg (2MB)',
        sampleOutput: 'File uploaded successfully',
        tags: ['files', 'upload', 'validation']
      },
      {
        id: 'php-007',
        title: 'RESTful API',
        difficulty: 'Advanced',
        problemStatement: 'Create a RESTful API endpoint with proper HTTP methods (GET, POST, PUT, DELETE) and JSON responses.',
        inputDescription: 'API requests.',
        outputDescription: 'JSON responses with proper status codes.',
        sampleInput: 'GET /api/users/1',
        sampleOutput: '{"id": 1, "name": "John"}',
        tags: ['api', 'rest', 'json']
      },
      {
        id: 'php-008',
        title: 'Namespace and Autoloading',
        difficulty: 'Advanced',
        problemStatement: 'Implement PSR-4 autoloading and organize classes using namespaces.',
        inputDescription: 'Multiple class files.',
        outputDescription: 'Autoloaded classes.',
        sampleInput: 'namespace App\\Models; class User {}',
        sampleOutput: 'Classes autoloaded',
        tags: ['namespaces', 'autoloading', 'psr-4']
      },
      {
        id: 'php-009',
        title: 'Dependency Injection',
        difficulty: 'Advanced',
        problemStatement: 'Implement a dependency injection container for managing class dependencies.',
        inputDescription: 'Classes with dependencies.',
        outputDescription: 'DI container managing dependencies.',
        sampleInput: 'class UserController { __construct(UserRepository $repo) }',
        sampleOutput: 'Dependencies injected automatically',
        tags: ['di', 'design-patterns', 'advanced']
      }
    ]
  },
  {
    languageId: 'ruby',
    languageName: 'Ruby',
    exercises: [
      {
        id: 'rb-001',
        title: 'Hello World',
        difficulty: 'Beginner',
        problemStatement: 'Write a Ruby program that prints "Hello, World!".',
        inputDescription: 'No input required.',
        outputDescription: 'Print "Hello, World!".',
        sampleInput: '',
        sampleOutput: 'Hello, World!',
        tags: ['basics', 'puts']
      },
      {
        id: 'rb-002',
        title: 'Blocks and Iterators',
        difficulty: 'Beginner',
        problemStatement: 'Use the each method with a block to iterate over an array and print each element.',
        inputDescription: 'An array of values.',
        outputDescription: 'Each element printed.',
        sampleInput: '[1, 2, 3, 4, 5]',
        sampleOutput: '1 2 3 4 5',
        tags: ['blocks', 'iterators']
      },
      {
        id: 'rb-003',
        title: 'Symbol Usage',
        difficulty: 'Beginner',
        problemStatement: 'Create a hash using symbols as keys and demonstrate symbol immutability.',
        inputDescription: 'Hash with symbol keys.',
        outputDescription: 'Hash operations.',
        sampleInput: '{name: "John", age: 25}',
        sampleOutput: 'Hash with symbols',
        tags: ['symbols', 'hashes']
      },
      {
        id: 'rb-004',
        title: 'Class Definition',
        difficulty: 'Intermediate',
        problemStatement: 'Create a Book class with attr_accessor for title and author, and instance methods.',
        inputDescription: 'Book properties.',
        outputDescription: 'Working class with accessors.',
        sampleInput: 'title = "1984", author = "Orwell"',
        sampleOutput: 'Book instance created',
        tags: ['classes', 'oop', 'attr_accessor']
      },
      {
        id: 'rb-005',
        title: 'Modules and Mixins',
        difficulty: 'Intermediate',
        problemStatement: 'Create a module with methods and include it in multiple classes to demonstrate mixins.',
        inputDescription: 'Module and classes.',
        outputDescription: 'Shared behavior across classes.',
        sampleInput: 'module Swimmable',
        sampleOutput: 'Classes can swim',
        tags: ['modules', 'mixins', 'oop']
      },
      {
        id: 'rb-006',
        title: 'Regular Expressions',
        difficulty: 'Intermediate',
        problemStatement: 'Use regex to validate email addresses and extract domain names.',
        inputDescription: 'Email strings.',
        outputDescription: 'Validation and extraction results.',
        sampleInput: 'email = "user@example.com"',
        sampleOutput: 'Valid email, domain: example.com',
        tags: ['regex', 'strings', 'validation']
      },
      {
        id: 'rb-007',
        title: 'Metaprogramming',
        difficulty: 'Advanced',
        problemStatement: 'Use define_method to dynamically create getter and setter methods.',
        inputDescription: 'Method names.',
        outputDescription: 'Dynamically created methods.',
        sampleInput: 'define_method(:name)',
        sampleOutput: 'Methods created dynamically',
        tags: ['metaprogramming', 'advanced', 'dynamic']
      },
      {
        id: 'rb-008',
        title: 'Proc and Lambda',
        difficulty: 'Advanced',
        problemStatement: 'Demonstrate the differences between Proc and Lambda in terms of return behavior.',
        inputDescription: 'Proc and Lambda objects.',
        outputDescription: 'Different behaviors shown.',
        sampleInput: 'proc vs lambda return',
        sampleOutput: 'Different return behaviors',
        tags: ['proc', 'lambda', 'closures']
      },
      {
        id: 'rb-009',
        title: 'Rails ActiveRecord',
        difficulty: 'Advanced',
        problemStatement: 'Create an ActiveRecord model with associations (has_many, belongs_to) and validations.',
        inputDescription: 'Model definitions.',
        outputDescription: 'Working associations.',
        sampleInput: 'User has_many :posts',
        sampleOutput: 'Associations working',
        tags: ['rails', 'activerecord', 'orm']
      }
    ]
  },
  {
    languageId: 'go',
    languageName: 'Go',
    exercises: [
      {
        id: 'go-001',
        title: 'Hello World',
        difficulty: 'Beginner',
        problemStatement: 'Write a Go program that prints "Hello, World!".',
        inputDescription: 'No input required.',
        outputDescription: 'Print "Hello, World!".',
        sampleInput: '',
        sampleOutput: 'Hello, World!',
        tags: ['basics', 'fmt']
      },
      {
        id: 'go-002',
        title: 'Slices and Arrays',
        difficulty: 'Beginner',
        problemStatement: 'Create a function that demonstrates the difference between arrays and slices.',
        inputDescription: 'Array and slice operations.',
        outputDescription: 'Understanding of both data structures.',
        sampleInput: 'arr := [3]int{1,2,3}, slice := []int{1,2,3}',
        sampleOutput: 'Different behaviors',
        tags: ['slices', 'arrays', 'basics']
      },
      {
        id: 'go-003',
        title: 'Struct Definition',
        difficulty: 'Beginner',
        problemStatement: 'Define a Person struct with fields and methods.',
        inputDescription: 'Person properties.',
        outputDescription: 'Working struct with methods.',
        sampleInput: 'type Person struct { Name string, Age int }',
        sampleOutput: 'Struct created',
        tags: ['structs', 'basics']
      },
      {
        id: 'go-004',
        title: 'Goroutines',
        difficulty: 'Intermediate',
        problemStatement: 'Create multiple goroutines that execute concurrently and use WaitGroup to synchronize.',
        inputDescription: 'Multiple goroutines.',
        outputDescription: 'Concurrent execution.',
        sampleInput: '5 goroutines',
        sampleOutput: 'All goroutines completed',
        tags: ['goroutines', 'concurrency']
      },
      {
        id: 'go-005',
        title: 'Channels',
        difficulty: 'Intermediate',
        problemStatement: 'Use channels to communicate between goroutines and demonstrate buffered vs unbuffered channels.',
        inputDescription: 'Channel operations.',
        outputDescription: 'Data passed between goroutines.',
        sampleInput: 'ch := make(chan int)',
        sampleOutput: 'Channel communication',
        tags: ['channels', 'concurrency']
      },
      {
        id: 'go-006',
        title: 'Interface Implementation',
        difficulty: 'Intermediate',
        problemStatement: 'Create an interface and implement it with multiple types to demonstrate polymorphism.',
        inputDescription: 'Interface and implementations.',
        outputDescription: 'Polymorphic behavior.',
        sampleInput: 'type Shape interface { Area() float64 }',
        sampleOutput: 'Multiple shapes',
        tags: ['interfaces', 'polymorphism']
      },
      {
        id: 'go-007',
        title: 'Context Package',
        difficulty: 'Advanced',
        problemStatement: 'Use the context package to manage cancellation, timeouts, and deadlines in goroutines.',
        inputDescription: 'Context with timeout.',
        outputDescription: 'Proper cancellation handling.',
        sampleInput: 'ctx, cancel := context.WithTimeout()',
        sampleOutput: 'Timeout handled',
        tags: ['context', 'concurrency', 'advanced']
      },
      {
        id: 'go-008',
        title: 'HTTP Server',
        difficulty: 'Advanced',
        problemStatement: 'Create a simple HTTP server with multiple routes and middleware.',
        inputDescription: 'HTTP requests.',
        outputDescription: 'Working web server.',
        sampleInput: 'GET /api/users',
        sampleOutput: 'JSON response',
        tags: ['http', 'server', 'web']
      },
      {
        id: 'go-009',
        title: 'Reflection',
        difficulty: 'Advanced',
        problemStatement: 'Use the reflect package to inspect and manipulate types at runtime.',
        inputDescription: 'Various types.',
        outputDescription: 'Type information extracted.',
        sampleInput: 'reflect.TypeOf(variable)',
        sampleOutput: 'Type information',
        tags: ['reflection', 'advanced', 'metaprogramming']
      }
    ]
  },
  {
    languageId: 'rust',
    languageName: 'Rust',
    exercises: [
      {
        id: 'rust-001',
        title: 'Hello World',
        difficulty: 'Beginner',
        problemStatement: 'Write a Rust program that prints "Hello, World!".',
        inputDescription: 'No input required.',
        outputDescription: 'Print "Hello, World!".',
        sampleInput: '',
        sampleOutput: 'Hello, World!',
        tags: ['basics', 'println']
      },
      {
        id: 'rust-002',
        title: 'Ownership Basics',
        difficulty: 'Beginner',
        problemStatement: 'Demonstrate ownership rules by moving and borrowing values.',
        inputDescription: 'String operations.',
        outputDescription: 'Understanding of ownership.',
        sampleInput: 'let s1 = String::from("hello")',
        sampleOutput: 'Ownership moved',
        tags: ['ownership', 'basics']
      },
      {
        id: 'rust-003',
        title: 'References and Borrowing',
        difficulty: 'Beginner',
        problemStatement: 'Use references to borrow values without taking ownership.',
        inputDescription: 'Borrowed values.',
        outputDescription: 'Immutable and mutable references.',
        sampleInput: '&s or &mut s',
        sampleOutput: 'References used',
        tags: ['borrowing', 'references']
      },
      {
        id: 'rust-004',
        title: 'Enums and Pattern Matching',
        difficulty: 'Intermediate',
        problemStatement: 'Create an enum and use match expressions to handle different variants.',
        inputDescription: 'Enum variants.',
        outputDescription: 'Pattern matching on variants.',
        sampleInput: 'enum Message { Quit, Move { x: i32, y: i32 } }',
        sampleOutput: 'Variants matched',
        tags: ['enums', 'pattern-matching']
      },
      {
        id: 'rust-005',
        title: 'Error Handling',
        difficulty: 'Intermediate',
        problemStatement: 'Use Result and Option types for error handling instead of exceptions.',
        inputDescription: 'Operations that may fail.',
        outputDescription: 'Proper error handling.',
        sampleInput: 'Result<T, E>',
        sampleOutput: 'Errors handled',
        tags: ['error-handling', 'result', 'option']
      },
      {
        id: 'rust-006',
        title: 'Traits',
        difficulty: 'Intermediate',
        problemStatement: 'Define a trait and implement it for multiple types.',
        inputDescription: 'Trait definition and implementations.',
        outputDescription: 'Trait-based polymorphism.',
        sampleInput: 'trait Summary { fn summarize(&self) -> String }',
        sampleOutput: 'Traits implemented',
        tags: ['traits', 'polymorphism']
      },
      {
        id: 'rust-007',
        title: 'Lifetimes',
        difficulty: 'Advanced',
        problemStatement: 'Use lifetime annotations to ensure references are valid.',
        inputDescription: 'Functions with references.',
        outputDescription: 'Lifetime-annotated code.',
        sampleInput: 'fn longest<\'a>(x: &\'a str, y: &\'a str) -> &\'a str',
        sampleOutput: 'Lifetimes specified',
        tags: ['lifetimes', 'advanced', 'references']
      },
      {
        id: 'rust-008',
        title: 'Concurrency with Threads',
        difficulty: 'Advanced',
        problemStatement: 'Create multiple threads and use channels for safe communication.',
        inputDescription: 'Thread operations.',
        outputDescription: 'Safe concurrent execution.',
        sampleInput: 'thread::spawn(|| {})',
        sampleOutput: 'Threads synchronized',
        tags: ['threads', 'concurrency', 'channels']
      },
      {
        id: 'rust-009',
        title: 'Unsafe Code',
        difficulty: 'Advanced',
        problemStatement: 'Demonstrate when and how to use unsafe Rust for low-level operations.',
        inputDescription: 'Raw pointer operations.',
        outputDescription: 'Unsafe block used correctly.',
        sampleInput: 'unsafe { *raw_pointer }',
        sampleOutput: 'Unsafe operations',
        tags: ['unsafe', 'advanced', 'pointers']
      }
    ]
  },
  {
    languageId: 'swift',
    languageName: 'Swift',
    exercises: [
      {
        id: 'swift-001',
        title: 'Hello World',
        difficulty: 'Beginner',
        problemStatement: 'Write a Swift program that prints "Hello, World!".',
        inputDescription: 'No input required.',
        outputDescription: 'Print "Hello, World!".',
        sampleInput: '',
        sampleOutput: 'Hello, World!',
        tags: ['basics', 'print']
      },
      {
        id: 'swift-002',
        title: 'Optionals',
        difficulty: 'Beginner',
        problemStatement: 'Demonstrate optional binding and nil coalescing with optional values.',
        inputDescription: 'Optional values.',
        outputDescription: 'Safe unwrapping of optionals.',
        sampleInput: 'var name: String?',
        sampleOutput: 'Optional handled safely',
        tags: ['optionals', 'safety']
      },
      {
        id: 'swift-003',
        title: 'Collections',
        difficulty: 'Beginner',
        problemStatement: 'Work with Arrays, Sets, and Dictionaries in Swift.',
        inputDescription: 'Collection operations.',
        outputDescription: 'Understanding of collections.',
        sampleInput: '[1, 2, 3], Set([1, 2]), ["key": "value"]',
        sampleOutput: 'Collections manipulated',
        tags: ['collections', 'arrays', 'dictionaries']
      },
      {
        id: 'swift-004',
        title: 'Structs and Classes',
        difficulty: 'Intermediate',
        problemStatement: 'Create both a struct and a class to demonstrate value vs reference semantics.',
        inputDescription: 'Struct and class definitions.',
        outputDescription: 'Different behaviors shown.',
        sampleInput: 'struct vs class',
        sampleOutput: 'Value vs reference',
        tags: ['structs', 'classes', 'oop']
      },
      {
        id: 'swift-005',
        title: 'Protocols',
        difficulty: 'Intermediate',
        problemStatement: 'Define a protocol and implement it in multiple types.',
        inputDescription: 'Protocol definition.',
        outputDescription: 'Protocol conformance.',
        sampleInput: 'protocol Drawable { func draw() }',
        sampleOutput: 'Protocol implemented',
        tags: ['protocols', 'interfaces']
      },
      {
        id: 'swift-006',
        title: 'Closures',
        difficulty: 'Intermediate',
        problemStatement: 'Use closures for callbacks and demonstrate capturing values.',
        inputDescription: 'Closure expressions.',
        outputDescription: 'Closures working correctly.',
        sampleInput: '{ (x: Int) -> Int in return x * 2 }',
        sampleOutput: 'Closure executed',
        tags: ['closures', 'functions']
      },
      {
        id: 'swift-007',
        title: 'Generics',
        difficulty: 'Advanced',
        problemStatement: 'Create generic functions and types that work with any type.',
        inputDescription: 'Generic type parameters.',
        outputDescription: 'Type-safe generic code.',
        sampleInput: 'func swap<T>(_ a: inout T, _ b: inout T)',
        sampleOutput: 'Generics working',
        tags: ['generics', 'advanced']
      },
      {
        id: 'swift-008',
        title: 'Property Observers',
        difficulty: 'Advanced',
        problemStatement: 'Use willSet and didSet property observers to respond to value changes.',
        inputDescription: 'Properties with observers.',
        outputDescription: 'Observers triggered.',
        sampleInput: 'var value: Int { willSet { } didSet { } }',
        sampleOutput: 'Value changes observed',
        tags: ['property-observers', 'advanced']
      },
      {
        id: 'swift-009',
        title: 'Async/Await',
        difficulty: 'Advanced',
        problemStatement: 'Use async/await for asynchronous programming in Swift.',
        inputDescription: 'Async operations.',
        outputDescription: 'Async code executed.',
        sampleInput: 'async func fetchData() -> Data',
        sampleOutput: 'Data fetched asynchronously',
        tags: ['async', 'await', 'concurrency']
      }
    ]
  },
  {
    languageId: 'kotlin',
    languageName: 'Kotlin',
    exercises: [
      {
        id: 'kt-001',
        title: 'Hello World',
        difficulty: 'Beginner',
        problemStatement: 'Write a Kotlin program that prints "Hello, World!".',
        inputDescription: 'No input required.',
        outputDescription: 'Print "Hello, World!".',
        sampleInput: '',
        sampleOutput: 'Hello, World!',
        tags: ['basics', 'println']
      },
      {
        id: 'kt-002',
        title: 'Null Safety',
        difficulty: 'Beginner',
        problemStatement: 'Demonstrate nullable and non-nullable types with safe calls and Elvis operator.',
        inputDescription: 'Nullable values.',
        outputDescription: 'Safe null handling.',
        sampleInput: 'var name: String?',
        sampleOutput: 'Null safety enforced',
        tags: ['null-safety', 'basics']
      },
      {
        id: 'kt-003',
        title: 'Data Classes',
        difficulty: 'Beginner',
        problemStatement: 'Create a data class and demonstrate copy, equals, and toString methods.',
        inputDescription: 'Data class definition.',
        outputDescription: 'Data class features.',
        sampleInput: 'data class User(val name: String, val age: Int)',
        sampleOutput: 'Data class working',
        tags: ['data-classes', 'oop']
      },
      {
        id: 'kt-004',
        title: 'Extension Functions',
        difficulty: 'Intermediate',
        problemStatement: 'Create extension functions to add functionality to existing classes.',
        inputDescription: 'Extension function definitions.',
        outputDescription: 'Extended functionality.',
        sampleInput: 'fun String.addExclamation() = this + "!"',
        sampleOutput: 'Extension working',
        tags: ['extensions', 'functions']
      },
      {
        id: 'kt-005',
        title: 'Higher-Order Functions',
        difficulty: 'Intermediate',
        problemStatement: 'Create functions that take other functions as parameters or return functions.',
        inputDescription: 'Function parameters.',
        outputDescription: 'Higher-order functions.',
        sampleInput: 'fun operate(x: Int, op: (Int) -> Int)',
        sampleOutput: 'Function passed',
        tags: ['higher-order', 'functions', 'lambdas']
      },
      {
        id: 'kt-006',
        title: 'Sealed Classes',
        difficulty: 'Intermediate',
        problemStatement: 'Use sealed classes to represent restricted class hierarchies.',
        inputDescription: 'Sealed class hierarchy.',
        outputDescription: 'Exhaustive when expressions.',
        sampleInput: 'sealed class Result',
        sampleOutput: 'All cases handled',
        tags: ['sealed-classes', 'oop']
      },
      {
        id: 'kt-007',
        title: 'Coroutines',
        difficulty: 'Advanced',
        problemStatement: 'Use Kotlin coroutines for asynchronous programming with launch and async.',
        inputDescription: 'Coroutine operations.',
        outputDescription: 'Async execution.',
        sampleInput: 'GlobalScope.launch { }',
        sampleOutput: 'Coroutine executed',
        tags: ['coroutines', 'async', 'concurrency']
      },
      {
        id: 'kt-008',
        title: 'Delegation',
        difficulty: 'Advanced',
        problemStatement: 'Use class delegation and property delegation (lazy, observable).',
        inputDescription: 'Delegated properties.',
        outputDescription: 'Delegation working.',
        sampleInput: 'val lazyValue: String by lazy { }',
        sampleOutput: 'Lazy initialization',
        tags: ['delegation', 'advanced', 'patterns']
      },
      {
        id: 'kt-009',
        title: 'DSL Builder',
        difficulty: 'Advanced',
        problemStatement: 'Create a type-safe DSL using Kotlin\'s builder pattern with lambdas.',
        inputDescription: 'DSL definition.',
        outputDescription: 'Working DSL.',
        sampleInput: 'html { body { div { } } }',
        sampleOutput: 'DSL executed',
        tags: ['dsl', 'builders', 'advanced']
      }
    ]
  }
];
