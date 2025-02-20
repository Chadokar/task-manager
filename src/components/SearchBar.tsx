import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchQuery,
  setPriorityFilter,
  setStatusFilter,
  Priority,
  Status,
  setSortOrder,
} from "../store/taskSlice";
import { RootState } from "../store/store";
import CustomSelect from "./CustomSelect";

const inputClasses =
  "w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 hover:bg-white transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

const priorityOptions = [
  { value: "all", label: "All Priorities" },
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "upcoming", label: "Upcoming" },
  { value: "overdue", label: "Overdue" },
  { value: "completed", label: "Completed" },
];

const sortedOptions = [
  { value: "asc", label: "Sort by Priority (Low to High)" },
  { value: "desc", label: "Sort by Priority (High to Low)" },
];

export default function SearchBar() {
  const dispatch = useDispatch();
  const { searchQuery, priorityFilter, statusFilter, sortOrder } = useSelector(
    (state: RootState) => state.tasks
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr_1fr_1.5fr] gap-6 mb-8 w-full">
      {/* Search Input */}
      <div className="relative w-full">
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className={`${inputClasses} pl-12`}
        />
      </div>

      {/* Custom Select for Priority */}
      <CustomSelect
        selected={priorityFilter}
        onChange={(value) => dispatch(setPriorityFilter(value as Priority))}
        options={priorityOptions}
      />

      {/* Custom Select for Status */}
      <CustomSelect
        selected={statusFilter}
        onChange={(value) => dispatch(setStatusFilter(value as Status))}
        options={statusOptions}
      />

      {/* Custom Select for Sorting */}
      <CustomSelect
        selected={sortOrder}
        onChange={(value) => dispatch(setSortOrder(value as "asc" | "desc"))}
        options={sortedOptions}
      />
    </div>
  );
}
