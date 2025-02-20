import React, { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { Task, Status } from "./store/taskSlice";
import AddTaskModal from "./components/AddTaskModal";
import TaskList from "./components/TaskList";
import SearchBar from "./components/SearchBar";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const { tasks, searchQuery, priorityFilter, statusFilter, sortOrder } =
    useSelector((state: RootState) => state.tasks);

  const sortedAndFilteredTasks = React.useMemo(() => {
    return tasks
      .filter((task) => {
        const matchesSearch =
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPriority =
          priorityFilter === "all" || task.priority === priorityFilter;

        const matchesStatus =
          statusFilter === "all" || task.status === statusFilter;

        return matchesSearch && matchesPriority && matchesStatus;
      })
      .toSorted((a, b) => {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return sortOrder === "asc"
          ? priorityOrder[b.priority] - priorityOrder[a.priority]
          : priorityOrder[a.priority] - priorityOrder[b.priority];
      });
  }, [tasks, searchQuery, priorityFilter, statusFilter, sortOrder]);

  const handleEditTask = React.useCallback((task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = React.useCallback(() => {
    setEditingTask(null);
    setIsModalOpen(false);
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex flex-col items-center">
      <div className="h-full md:w-4/5 w-full px-4 py-8 flex flex-col">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900">Task Manager</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg"
          >
            <Plus size={20} />
            Add Task
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-xl shadow-xl p-8 flex-grow overflow-hidden h-full flex flex-col"
        >
          <div className="flex justify-between items-center mb-4 w-full">
            <SearchBar />
          </div>
          {/* Ensure the task list container takes up the remaining height */}
          <div className="flex-grow overflow-y-auto">
            <TaskList
              tasks={sortedAndFilteredTasks}
              onEditTask={handleEditTask}
            />
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <AddTaskModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            editingTask={editingTask}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
