import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Priority = "Low" | "Medium" | "High";
export type Status = "upcoming" | "overdue" | "completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  searchQuery: string;
  priorityFilter: Priority | "all";
  statusFilter: Status | "all";
  sortOrder: "asc" | "desc";
}

const loadTasksFromStorage = (): Task[] => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
};

const initialState: TaskState = {
  tasks: loadTasksFromStorage(),
  searchQuery: "",
  priorityFilter: "all",
  statusFilter: "all",
  sortOrder: "asc",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, "id" | "completed">>) => {
      const newTask: Task = {
        id: crypto.randomUUID(),
        ...action.payload,
        completed: false,
      };
      state.tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    toggleTaskCompletion: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setPriorityFilter: (state, action: PayloadAction<Priority | "all">) => {
      state.priorityFilter = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<Status | "all">) => {
      state.statusFilter = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<"asc" | "desc">) => {
      state.sortOrder = action.payload;
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
  setSearchQuery,
  setPriorityFilter,
  setStatusFilter,
  setSortOrder,
} = taskSlice.actions;

export default taskSlice.reducer;
