# 🧠 React Fundamentals – Assignments

This assignment set is designed to practice **JSX**, **Props**, **State**, **Synthetic Events**, **Virtual DOM**, and **useEffect** concepts.
There are **3 levels**: ✅ Easy, 🟡 Medium, 🔴 Semi-Hard.
Work through them in order. 💪

---

## ✅ Easy Level (5 Questions)

1. **JSX Basics**
   Create a component that renders a `<div>` with your name and age using JSX variables.

   ```jsx
   const name = "John";
   const age = 25;
   ```

2. **Props Rendering**
   Create a `Welcome` component that takes a `name` prop and displays:
   **“Hello, {name}!”**
   Render it 3 times with different names.

3. **Basic State**
   Build a simple counter with **+** and **-** buttons to increase/decrease the number using `useState`.

4. **Synthetic Event**
   Add an `<input>` field and a button. When the button is clicked, log the input value in the console. Use `onChange` and `onClick`.

5. **Virtual DOM Concept** (Theory)
   In a comment block inside the code file, explain what the **Virtual DOM** is and why React uses it (2–3 lines).

---

## 🟡 Medium Level (5 Questions)

1. **Props + State Combo**
   Create a `UserCard` component that accepts `name` and `age` as props.
   In the parent, keep a list of 3 users in state and render multiple `UserCard`s dynamically.

2. **Parent → Child Communication**
   Pass a number as prop from parent to child and display it in the child.
   Add a button in the parent that updates that number and observe the child re-render.

3. **Child → Parent Communication**
   In the child component, have a button that triggers a function passed from the parent via props to update the parent’s state.

4. **useEffect Introduction**
   Display a message in the console every time a number in state changes using `useEffect`.

5. **Toggle UI Using Synthetic Events**
   Create a button that toggles between showing and hiding a `<p>` tag with the message “Hello React”.

---

## 🔴 Semi-Hard Level (3 Questions)

1. **⏱ Timer using useEffect**
   Create a **Timer Component** that:

   * Starts counting seconds when mounted using `setInterval`.
   * Uses `useEffect` to clean up the interval on unmount.
   * Has **Start / Stop / Reset** buttons.

2. **Two-way Communication**
   Implement **Parent ↔ Child** communication (like a shared counter):

   * Parent passes count & updater function.
   * Child updates parent count.
   * Parent updates child count through a callback.

3. **Reusable Button Component**
   Create a reusable `Button` component that accepts:

   * `text` prop for label
   * `onClick` for event handling
   * Optional `color` prop for styling
     Use this `Button` in multiple places.

---

## 📝 Tips

* ✅ Always include a **dependency array** in `useEffect` to avoid infinite loops.
* 🧠 Think in **components** — break UI into smaller reusable parts.
* ✍️ Use **camelCase** for event handlers: `onClick`, `onChange`.
* 🧱 Start from static JSX → add props → add state → add events → finally side effects.

---

### 💡 Suggested Folder Structure

```
/react-assignments
  /easy
  /medium
  /semi-hard
  README.md
```

---
