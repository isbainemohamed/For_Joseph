# For_Joseph

Here is the following Question Answer:
## First Question:
Q2 [JavaScript, TypeScript] Implement a 5-star widget for an eCommerce site for users to record a
product rating. The widget displays a horizontal row of stars that are either outlined or black according to
the product rating, from left to right. E.g. ★★★☆☆ = rating of 3. Multiple 5-star widgets can be present on a
single page. If a user has not rated a product, the widget will have 5 outlined stars (☆☆☆☆☆). Each product
on the page has a UUID. Hovering over the Nth star will light up stars 1 to N with a grey colour (e.g. ★★★★☆).
Clicking a star will record the rating by sending a request to a web server with enough information to record
the product and the rating. After clicking, the widget will then display the rating the user submitted with
black stars (e.g. ★★★★☆). Submitting the rating is handled without refreshing the page.
NOTE: You do not need to implement the backend.

Fo this question you will find the 3 files, above index.html , style.css and script.js download them and put them at the same directory then open index page with your browser to see the rating widget

## Second Question:

Q3 [C] Design and implement a stack class (i.e. struct with accompanying functions). The interface should
allow storing any data type including complex structures. Describe different implementation strategies and
compare their pros and cons. What is the best approach in an embedded real-time system? What is the
best approach when memory resources are very limited? You can use “malloc” and “free” functions.

### Implementation: 
There are two ways to implement a stack: 

    Using array
    Using linked list
 1. First implementation : Implementing Stack using Arrays
 The first way is sasy to implement. Since memory is saved as pointers are not involved. Which is best approach when memory resources are very limited.
 But, It is not dynamic. It doesn’t grow and shrink depending on needs at runtime.

````
// First implementation of stack using Arrays
#include <limits.h>
#include <stdio.h>
#include <stdlib.h>
 
// A data structure to represent a stack
struct stack {
    int top;
    unsigned capacity;
    int* array;
};
 
// Initialization function : to initialize the stack with a 0 size
struct stack* createStack(unsigned capacity)
{
    struct stack* stack = (struct stack*)malloc(sizeof(struct stack));
    stack->capacity = capacity;
    stack->top = -1;
    stack->array = (int*)malloc(stack->capacity * sizeof(int));
    return stack;
}
 

 // defining a function that return the size of the stack
int getSize(struct stack *pt) {
    return pt->top + 1;
}
// defining a function that check if the stack is empty or not
int isEmpty(struct stack *pt) {
    return getSize(pt) == 0;
}
//defining a function that check if the stack is full or not
int isFull(struct stack *pt) {
    return getSize(pt) == pt->capacity;
}
int peek(struct stack* pt)
{
    if (isEmpty(pt))
        return INT_MIN;
    return pt->array[pt->top];
}
 
// defining a function that add an element `e` to the stack. It increases top by 1
void push(struct stack* pt, int e)
{
    // First, we need to check if the stack is already full. 
    if (isFull(pt))
    {
        printf("The stack is Overflow\nProgram Terminated\n");
        exit(EXIT_FAILURE);
    }
 
    printf("pushing element %d\n", e);
 
    // add an element and increment the top's index
    
    pt->array[++pt->top] = e;
    
    printf("%d was pushed to stack\n", e);
}
 
// defining a function that remove an element `e` from the stack. It increases top by 1
int pop(struct stack *pt)
{
    // check for stack underflow
    if (isEmpty(pt))
    {
        printf("No items to remomve\nProgram Terminated\n");
        exit(EXIT_FAILURE);
    }
 
    printf("Removing %d\n", peek(pt));
 
    // decrement stack size by 1 and (optionally) return the popped element
    return pt->array[pt->top--];
}
 
// defining a function that return the top from stack without removing it

 
// Main function to test our code:
int main()
{
    struct stack* stack = createStack(100);
 
    push(stack, 5484);
    push(stack, 545341);
    push(stack, 54351);
 
    printf("%d popped from stack\n", pop(stack));
 
    return 0;
}
````

 2. Second implementation : Implementing Stack using Linked List
The linked list implementation of a stack can grow and shrink according to the needs at runtime which is the best approach in an embedded real-time system.But it requires extra memory due to involvement of pointers. 


````
// Second implementation of stack using Pointers
#include <limits.h>
#include <stdio.h>
#include <stdlib.h>
 
// A structure to represent a stack
struct Stack {
    int data;
    struct Stack* next;
};
 
struct Stack* newStack(int data)
{
    struct Stack* stack =
      (struct Stack*)
      malloc(sizeof(struct Stack));
    stack->data = data;
    stack->next = NULL;
    return stack;
}
 
int isEmpty(struct Stack* root)
{
    return !root;
}
 
void push(struct Stack** root, int data)
{
    struct Stack* stack = newStack(data);
    stack->next = *root;
    *root = stack;
    printf("%d is pushed to stack\n", data);
}
 
int pop(struct Stack** root)
{
    if (isEmpty(*root))
        return INT_MIN;
    struct Stack* temp = *root;
    *root = (*root)->next;
    int popped = temp->data;
    free(temp);
 
    return popped;
}
 
int peek(struct Stack* root)
{
    if (isEmpty(root))
        return INT_MIN;
    return root->data;
}
 
int main()
{
    struct Stack* root = NULL;
 
    push(&root, 5484);
    push(&root, 545341);
    push(&root, 54351);
 
    printf("%d popped from stack\n", pop(&root));
 
    printf("Top element is %d\n", peek(root));
 
    return 0;
}
````
