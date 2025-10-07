# JavaScript Assignments - Operators, Loops, Arrays, Objects

This document contains JavaScript assignment tasks covering operators,
conditional operators, loops, array functions, truthy/falsy values,
optional chaining, and object methods like seal and freeze.

---

## 🟢 Easy Level

1. **Operators Practice**  
   Predict the output of given `console.log` statements:

   - `console.log(3 + 3 * 6 / 6);`  
   - `console.log(10 % 4 * 2 + 5);`  
   - `console.log(1 + "1" - 1);`  
   - `console.log(true + false);`  
   - `console.log("5" * 2 + 1);`  
   **Answers:**
        - console.log(3 + 3 * 6 / 6); return the 5
        - console.log(10 % 4 * 2 + 5); return the 7
        - console.log(1 + "1" - 1); return the 1
        - console.log(true + false); return the 1
        - console.log("5" * 2 + 1); return the 11

2. **Truthy/Falsy Filters**  
    ```js
    const arr = [0, "", null, undefined, NaN, 1, "hello", true, false];
    ```
   - Filter only truthy values from an array.  
   - Filter only falsy values from an array.  
**Answers:**
        - arr.filter(i => i) return the [1, "hello", true]
        - arr.filter(i => !i) return the [0, "", null, undefined, NaN, false]

3. **Optional Chaining**  
    ``` js
    const user = { profile: { name: "Pablo" } };
    ```
   - Access a property safely when the path exists.  
   - Try accessing a deeply nested property that doesn’t exist (without throwing error).  
**Answers:**
     - user.profile.name will return the "Pablo"
     - When we try ti use the property that does not exist it will show undefined error.

4. **Object Freeze/Seal**  
    ``` js
    const car = { brand: "Tesla", model: "X" };
    ```
   - Create an object and seal it. Try adding and modifying properties.  
   - Freeze the object and try modifying properties.  
**Answers:**
     ```js 
     Object.seal(car)
     car.brand = "BMW"
     car.color = "red"
     console.log(car) // { brand: "BMW", model: "X" }
     ```
     
     ```js 
     Object.freeze(car)
     car.brand = "BMW"
     car.color = "red"
     console.log(car) // { brand: "Tesla", model: "X" } 
     ```    
     
        - Object.seal(car) will seal the object
        - Object.freeze(car) will freeze the object
        - Object.seal(car) will not allow to add new properties but will allow to modify existing properties
        - Object.freeze(car) will not allow to add new properties and will not allow to modify existing properties

---

## 🟡 Medium Level

1. **Array Functions** 
    ``` js
    const nums = [1, 2, 3, 4, 5];
    ``` 
   - Given an array of numbers, use `map`, `filter`, and `reduce` in a chain to:  
     - Multiply each number by 2.  
     - Keep only numbers >= 6.  
     - Return the sum of the resulting numbers.  
     **Answers:**
     ```js
     const nums = [1, 2, 3, 4, 5];
     console.log(nums.map(num=> num*2)
                     .filter(fnum => fnum>=6)
                     .reduce((acc, Rnum)=> {
                         acc += Rnum
                         return acc
                     }))
     ```
     

2. **Custom Reduce → Object**  
   - Convert an array of students (e.g., `["Alice", "Bob", "Charlie"]`) into an object where indices are keys.  
    **Answers:**
    ```js
    const students = ["Alice", "Bob", "Charlie"];
    console.log(students.reduce((acc, student,index)=> {
        acc[index] = student
        return acc
    }, {}))
    ```
   
3. **Find Unique Values**  
    ``` js
    const arr = [1, 2, 2, 3, 4, 4, 5];
    ```
   - Given an array with duplicates, return an array of unique values.  
   - Solve once with `filter`.  
   - Solve again with `reduce`.  
   **Answers:**
   ```js
   const arr = [1, 2, 2, 3, 4, 4, 5];
   console.log(arr.filter((num, index) => arr.indexOf(num) === index))
   console.log(arr.reduce((acc, num) => {
       if (!acc.includes(num)) {
           acc.push(num)
       }
       return acc
   }, []))
   ```
   

4. **Dynamic Object Keys**  
    ``` js
    function addKeyValue(obj, key, value) {
      // code here
    }

    const person = { name: "Pablo" };
    console.log(addKeyValue(person, "age", 25));
    ```
   - Write a function to add a key-value pair to an object.  
   - Test the behavior when the object is sealed.  
   - Test the behavior when the object is frozen.  
   **Answers:**
   ```js
   function addKeyValue(obj, key, value) {
    obj[key] = value
    return obj
   }

   const person = { name: "Pablo" };
   console.log(addKeyValue(person, "age", 25));
   ```
   

---
