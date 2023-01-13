# SUDOKU GENERATE ALGORITHM
###### by `mems2001`

This is the first part of a whole Sudoku app project started as a personal exercise of coding logic and node. 

The whole project expects to have: `GENERATE ALGORITHM` , `SOLVING ALGORITHM` & `PUZZLING ALGORITHM`.

## GENERATE ALGORITHM

This one is in charge to randomly produce a complete sudoku table. This is, a 9 x 9 table completely filled with 1 to 9 numbers acordding to [sudoku rules]().

### How does it work?

At first we have to talk about the main strategy used to generate the sudoku table. There are different strategies to chooso, however, in this particular exercise i choose to work by rows. 

This means, the main algorithm will be splited into 9 algorithms acordding to every row of the table. In `node.js` terms we'll have 9 models, and their related `controllers` and `services`, we'll talk about the `routes` later.

We'll look the logic behind this closely. First we have to know that the main porpouse of this algorithm is to produce a sudoku table randomly, later on we may notice that randomness imply lots of potential errors, bugs and loops. We have to consider the rules on every cell, row, column and quadrant. It doesn't matter which strategy we choose, allways there will be rules that interact in complex ways to the other elements. 

So, in every step, no matter that we´re working with rows, we have to find a way to process quadrants and columns as well.

### Row model structure and operations

In general, rows will be managed as arrays. Every model (therefore, row) has its corresponding operations and functions in it. Its crutial to know that every row operations code are different, despite this, they all have the same kind of functions, theese are:

- `generateRandom()`: This one produces a random number between 1 and 9.

- `check(elements, n , j)`: This function return a `boolean` and is in charge to verify if a specyfic number `n` is allowed to ocupy a certain position `j`. According to sudoku rules and the position of `n` it will check the numbers of the columns, rows or quadrants looking for coincidence returning `true` if it is the case and `false` otherwise. 
- `verifyDuplicate(array , n , j)`: This function return a `boolean` and check if the `n` satisfies other conditions derived from the rules and the previously selected numbers. Making it by runing its own algorithm acordding to those conditions and calling `check(elements , n , j)` when needed. This will be clarified later.
- `generateNumber(array, n , j)`: This one is a recursive fuction that return a number `n` in case it satisfies the previus function conditions, `check()` and `verifyRepeated()`, or calling itself back again otherwise. In this function `n` will be provided by `generateRandom()`, while the previous functions will recieve `n` from this one. Position `j` will be received by a `for` operation which iterates from 1 to 9, wich are ir order all the positions avaliable in every road. 
This menas that, considering the whole table, every cell or position name will be given by a conbitation or the row name and de `j` position in it, for example the cell `C7`.

Rows will be named after letters from A to I in alphabetical order. And columns afert numbers from 1 to 9. 
The resulting object will be something like this:
```bash
{ 5111
  "id": "d091c979-69b6-4219-ba85-1dc62ea133c3",
  "rows": {
    "id": "60be1d84-3f1b-4ac2-a4fd-de0d24c0d842",
    "row_A": {
      "values": [5,7,2,3,4,9,1,8,6]
    },
    "row_B": {
      "values": [4,9,3,8,1,6,5,7,2]
    },
    "row_C": {
      "values": [6,1,8,7,2,5,3,4,9]
    },
    "row_D": {
      "values": [3,4,9,6,5,8,2,1,7]
    },
    "row_E": {
      "values": [2,5,6,9,7,1,4,3,8]
    }
  },
  "quadrants": {
    "q1": [5,4,6,7,9,1,2,3,8],
    "q2": [3,8,7,4,1,2,9,6,5],
    "q3": [1,5,3,8,7,4,6,2,9],
    "q4": [3,2,1,4,5,8,9,6,7],
    "q5": [6,9,4,5,7,3,8,1,2],
    "q6": [2,4,9,1,3,6,7,8,5],
    "q7": [7,9,8,2,3,6,1,4,5],
    "q8": [5,2,1,6,8,9,3,7,4],
    "q9": [8,6,7,9,5,2,4,1,3]
  }
}
```

### Row A

The first row is the easiest one, since, all we have to do is to make sure that every sucesive number is different form the ones which were previosly generated. 

Lets supouse the first number is 6, then the next can not be 6, maybe 4, so the third one can not be neither 6 nor 4, and so on. 

We make this by saving every number generated in the array `numbers` than is ussually found at the begining of the `createRow` controller, and calling the `check()` function with that array as one of the arguments. 

### Row B

The process is similar to Row A, but in this case we have to consider the numbers already generated corresponding to every quadrante, as numbers that can not appear in the positions related to that quadrant.

We make this by simple give another argument to `check()`, which is an array of the numbers that appear in every quadrant. 

But, in this casi `j` is usefull because it allows us to know in which quadrant we are testing `n`. For example, if we are in Row B, and the position `j` is 7, then we are in the thir quadrant. 

Quadrants wil be named in order, from left to right, and from top to bottom, from Q1 to Q9. In a way that Q1 will be in the left and top corner position, Q9 the right and bottom position, and Q3 the right and top position.

Also, in this case and for the rest of thw rows we have to make sure for every quadrant on the right that its numbers appear before the position `j` that begins that quadrant. This is beacause the number already generated in a quadrant can not reappear on it, and it's posible (since the algorithm is random) that the numbers left are exactly the ones that appears in the quadrant, taking the alrogithm to an infinite loop beacause every number it test can not take the position it is trying to fill. 

To undestand this, lets imagine the following scenario:
```
RowA: [1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9]
RowB: [4 , 5 , 6 , 1 , 2 , 3 , ...]
```
There are three numbers left to appear in `RowB`: 7 , 8 , 9. But they are the same numbers that already appear in Q3, so, no matter what, if we follow the rules, the numbers left to check will never fill the next position. Then, the algorithm will enter in an infity loop, trying numbers from 1 to 9 and, one by one, finding every time that the number can not appear in `j` and then, calling the function again and again (remember, `generateNumber()` is a recursive function that calls itself every time the `verifyDuplicate()` function return false, and in this case it will always return false).

To fix this, since the algorithm points to be random, we'll need a code that guarantees us that the three numbers left of the row are not the same numbers of `Q3`. 

This is easy. First we wanna identify the numbers of `Q3`. Then we want a code that compares the length of `Q3` and the remaining positions before `j=7` in a way that, if the remaining positions are the same number as the length of `Q3`, our code must reject every random `n` that is different of the members of `Q3`. We make it like this because it is posible that those number just randomly appear before it represents a problem, but the problem is only posible when they haven't appear before `j=7`. So, if there is just one number left, at `j=6` the algorithm will reject all numbers that ara not the number in question. This way, we preserve randomness but at the same time we prevent a mistake. (We do not preseve randomness for example, if our code force those three problematic numbers to always appear in the first three positions, or, to always appear at any determined position stipulated by us)

### Row C

This is the last of the easy ones. 
