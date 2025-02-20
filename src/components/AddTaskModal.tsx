import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { addTask, updateTask, Priority, Task } from "../store/taskSlice";
import CustomSelect from "./CustomSelect";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingTask: Task | null;
}

const inputClasses =
  "w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 hover:bg-white transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

function AddTaskModal({ isOpen, onClose, editingTask }: AddTaskModalProps) {
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState({
    title: editingTask?.title || "",
    description: editingTask?.description || "",
    dueDate: editingTask?.dueDate || "",
    priority: editingTask?.priority || ("Medium" as Priority),
    status: editingTask?.status || "upcoming",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask) {
      dispatch(
        updateTask({
          ...editingTask,
          ...newTask,
          status:
            new Date(newTask.dueDate) < new Date() ? "overdue" : "upcoming",
        })
      );
    } else {
      dispatch(addTask(newTask));
    }
    onClose();
  };

  const handleSelectChange = React.useCallback(
    (value: string) => {
      setNewTask({ ...newTask, priority: value as Priority });
    },
    [newTask]
  );

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl max-w-md w-full p-8 shadow-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {editingTask ? "Edit Task" : "Add New Task"}
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </motion.button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              required
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className={inputClasses}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              required
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className={inputClasses}
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <input
              type="date"
              required
              value={newTask.dueDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) =>
                setNewTask({ ...newTask, dueDate: e.target.value })
              }
              className={inputClasses}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <CustomSelect
              selected={newTask.priority}
              onChange={handleSelectChange}
              options={[
                { value: "Low", label: "Low" },
                { value: "Medium", label: "Medium" },
                { value: "High", label: "High" },
              ]}
              up={true}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg mt-6"
          >
            {editingTask ? "Update Task" : "Add Task"}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default React.memo(AddTaskModal);
