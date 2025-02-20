# Task Manager App

## 📌 Overview

Task Manager is a React-based application designed to help users organize their tasks efficiently. It allows users to add, edit, search, filter, and sort tasks based on priority and status.

[Live Demo](https://task-manager-three-ruby.vercel.app/)

### techical question answer link

[Technical Question Answer](questions.md)

---

## 📁 Project Structure

📦 Task-Manager-App

```
├── 📂 src # Main source code directory
│ ├── 📂 components # Reusable UI components
│ │ ├── AddTaskModal.tsx # Modal for adding and editing tasks
│ │ ├── CustomSelect.tsx # Custom dropdown component
│ │ ├── SearchBar.tsx # Search bar with filters
│ │ ├── TaskList.tsx # Displays the list of tasks
│ ├── 📂 store # Redux store setup
│ │ ├── store.ts # Configures Redux store
│ │ ├── taskSlice.ts # Redux slice for task management
│ ├── App.tsx # Main application component
│ ├── main.tsx # Entry point of the app
│ ├── index.css # Global styles
│ ├── vite-env.d.ts # Vite environment configuration
├── 📂 public # Static assets
├── 📜 .gitignore # Files to be ignored by Git
├── 📜 eslint.config.js # ESLint configuration
├── 📜 tailwind.config.js # Tailwind CSS configuration
├── 📜 tsconfig.json # TypeScript configuration
├── 📜 vite.config.ts # Vite configuration
├── 📜 package.json # Project dependencies and scripts
├── 📜 README.md #
```

---

## 🚀 Setup Instructions

### **1️⃣ Prerequisites**

Make sure you have the following installed:

- **Node.js** (>= 16.x)
- **npm** or **yarn** (Package manager)

### **2️⃣ Installation**

Clone the repository and install dependencies:

```sh
git clone https://github.com/Chadokar/task-manager.git
cd task-manager
npm i -D
```

### **3️⃣ Run the Development Server**

Start the app in development mode:

```sh
npm run dev
```

### **🔍 Features**

- ✔ **Add, Edit, Delete Tasks**
- ✔ **Search Tasks**
- ✔ **Filter by Priority & Status**
- ✔ **Sort by Priority (High → Low, Low → High)**

### **📝 Assumptions Made During Development**

1. **Task Priorities**: Tasks can have `High`, `Medium`, or `Low` priority.

2. **Task Status**:

   - _Upcoming_: Due date is in the future.
   - _Overdue_: Due date is in the past.
   - _Completed_: Marked as done by the user.

3. **Sorting**: Sorting is handled by `toSorted()`, which ensures a new sorted array is returned without mutating the original list.

4. **Search Functionality**: Searches both **title** and **description** of tasks.

5. **Redux State Management**: Redux Toolkit is used for state management, including search, filters, and sorting.

---

Happy Coding! 🚀

Thank you! 🙏
