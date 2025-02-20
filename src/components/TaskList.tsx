import { motion } from "framer-motion";
import { Check, Edit2, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { Task, toggleTaskCompletion, deleteTask } from "../store/taskSlice";
import React from "react";

interface TaskListProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
}

function TaskList({ tasks, onEditTask }: TaskListProps) {
  const dispatch = useDispatch();

  const priorityColors = {
    Low: "bg-blue-100 text-blue-800",
    Medium: "bg-yellow-100 text-yellow-800",
    High: "bg-red-100 text-red-800",
  };

  const taskColors = {
    upcoming: "bg-blue-100 text-blue-800",
    overdue: "bg-red-100 text-red-800",
    completed: "bg-green-100 text-green-800",
  };

  return (
    <motion.div className="space-y-4 overflow-y-auto h-full">
      {tasks.map((task) => (
        <motion.div
          key={task.id}
          className={`border border-gray-200 rounded-xl p-6 ${
            task.completed ? "bg-gray-50" : "bg-white"
          } hover:shadow-md transition-all duration-200`}
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => dispatch(toggleTaskCompletion(task.id))}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                      ${
                        task.completed
                          ? "border-green-500 bg-green-500"
                          : "border-gray-300"
                      }`}
                >
                  {task.completed && <Check size={16} className="text-white" />}
                </motion.button>
                <h3
                  className={`text-lg sm:text-xl font-semibold ${
                    task.completed ? " text-gray-400" : "text-gray-900"
                  }`}
                >
                  {task.title}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium pb-1.5 ${
                    task.completed
                      ? "bg-gray-200 text-gray-500"
                      : priorityColors[task.priority]
                  }`}
                >
                  {task.priority}
                </span>
              </div>
              <p className="mt-3 text-gray-600 text-sm sm:text-base">
                {task.description}
              </p>
              <div className="flex items-center gap-4 mt-4">
                {!task.completed && (
                  <p className="text-sm text-gray-500 text-center h-full flex">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                )}
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium capitalize pb-1.5
                    ${taskColors[task.status!]}`}
                >
                  {task.status}
                </span>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-4 self-start sm:self-auto">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onEditTask(task)}
                className="p-2 text-gray-600 hover:text-indigo-600 transition-colors disabled:opacity-50"
                disabled={task.completed}
              >
                <Edit2 size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => dispatch(deleteTask(task.id))}
                className="p-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <Trash2 size={20} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}

      {tasks.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-gray-500"
        >
          No tasks found. Add a new task to get started!
        </motion.div>
      )}
    </motion.div>
  );
}

export default React.memo(TaskList);
