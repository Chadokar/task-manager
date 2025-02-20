# 📌 Answers to Technical Questions

## 1. How long did you spend on the coding test?

I spent approximately **2 hours** on the coding test. The time was mainly spent on implementing task filtering, sorting, and search functionalities, as well as ensuring a clean and modular code structure.

---

## 2. What was the most useful feature that was added to the latest version of your chosen language?

One of the most useful features in **JavaScript (ES2023)** is the `Array.prototype.toSorted()` method. This method allows sorting an array without mutating the original array, which is beneficial for functional programming and state management in React.

### Example Usage:

```js
const tasks = [
  { title: "Task 1", priority: "High" },
  { title: "Task 2", priority: "Low" },
  { title: "Task 3", priority: "Medium" },
];

const priorityOrder = { High: 1, Medium: 2, Low: 3 };

const sortedTasks = tasks.toSorted(
  (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
);

console.log(sortedTasks);

// my code snippet in App.tsx

.toSorted((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return sortOrder === "asc"
        ? priorityOrder[b.priority] - priorityOrder[a.priority]
        : priorityOrder[a.priority] - priorityOrder[b.priority];
});
```

## 3. How would you track down a performance issue in production? Have you ever had to do this?

To track down a performance issue in production, I would follow these steps:

1. **Monitor Performance Metrics**: Use browser DevTools (Lighthouse, Performance tab) or application monitoring tools like New Relic, Sentry, or Datadog to identify slow operations.

2. **Analyze Network Requests**: Check for excessive API calls, large payloads, or slow responses using the Network tab in DevTools.

3. **Optimize Rendering**: Use React's Profiler API tracking tools to identify unnecessary re-renders.

4. **Check JavaScript Bottlenecks**: Use Chrome DevTools (Performance tab) to detect long-running JavaScript tasks that block the main thread.

5. **Optimize Database Queries**: If applicable, profile and optimize queries using indexing, caching, or pagination (`React Query`).

6. **Profiling and Benchmarking**: Use tools like Node.js Performance Hooks or Web Vitals API to analyze CPU/memory usage.

   **Other**: Reduce unnecessary re-renders (use React.memo, useCallback, useMemo), optimize bundle size (tree shaking, lazy loading, code splitting), and reduce heavy computations in the UI thread (Web Workers, background tasks).

Yes, I have previously debugged performance issues in a React + FastAPI project, where unnecessary re-renders were causing lag in UI updates. Using React.memo and optimizing API calls helped resolve the issue. Even in this project I have used React.memo, useCallback and useMemo.
Page load times were also improved by optimizing image loading and lazy loading components.

### Example (React Performance Profiling):

```javascript
import { Profiler } from "react";

const onRenderCallback = (id, phase, actualDuration) => {
  console.log(`Component ${id} re-rendered in ${actualDuration}ms`);
};

<Profiler id="TaskList" onRender={onRenderCallback}>
  <TaskList tasks={tasks} />
</Profiler>;
```

## 4. If you had more time, what additional features or improvements would you consider adding to the task management application?

If I had more time, I would implement the following improvements:

1. **Persistent Data Storage**: Instead of using `localStorage`, I would integrate `IndexedDB` or a backend database (e.g., Firebase, SQLite) for better scalability.

2. **User Authentication**: Implement user login functionality to store tasks on a per-user basis securely.

3. **Drag-and-Drop Task Management**: I will create three columns and implement a drag-and-drop interface using HTML5's `dragstart`, `dragover`, and `drop` events to allow users to intuitively rearrange tasks within the application. This would provide a more interactive and user-friendly task management experience.

4. **Notifications & Reminders**: Add a feature to send reminders for upcoming or overdue tasks using Web Notifications API or a third-party service.

5. **Dark Mode Support**: Allow users to toggle between light and dark themes for better accessibility and user experience.

6. **Progress Tracking & Analytics**: Provide task completion analytics using charts and graphs (e.g., Chart.js) to visualize team's productivity and task management trends.

7. **Option for daily/weekly/monthly view**: Add a calendar view to see tasks scheduled for a specific day, week, or month.

---

Happy Coding! 🚀

Thank you! 🙏
