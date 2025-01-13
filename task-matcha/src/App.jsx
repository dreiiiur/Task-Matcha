import { useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { MdDelete, MdEditSquare } from "react-icons/md";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrEditTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = { task: newTask.trim(), completed: tasks[editIndex].completed };
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { task: newTask.trim(), completed: false }]);
    }

    setNewTask("");
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
    setNewTask(tasks[index].task);
  };

  const handleToggleCompleted = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskToDelete) => {
    setTasks(tasks.filter((task) => task.task !== taskToDelete.task));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent py-8 px-4 font-mono">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
        <h1 className="text-2xl font-mono font-semibold text-center text-[#76885B] mb-6">
          Task Matcha
        </h1>
        <form onSubmit={handleAddOrEditTask} className="mb-6">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder={editIndex !== null ? "Edit task" : "Add a new task"}
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-grow border border-[#727D73] rounded-md px-4 py-2 text-[#727D73] focus:outline-none focus:ring-2 focus:ring-[#AAB99A]"
              aria-label="Task input"
            />
            <button
              type="submit"
              disabled={!newTask.trim()}
              className={`flex items-center justify-center ${editIndex !== null ? "bg-orange-400" : "bg-[#76885B]"
                } hover:bg-opacity-90 text-white px-4 py-3 rounded-md text-xl ${!newTask.trim() ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              aria-label={editIndex !== null ? "Update task" : "Add task"}
            >
              <IoAddCircle />
            </button>

          </div>
        </form>
        <ul className="divide-y divide-gray-200">
          {tasks.length === 0 ? (
            <li className="text-center text-[#76885B] py-4">No tasks yet</li>
          ) : (
            tasks.map((task, index) => (
              <li
                key={index}
                className="flex items-center text-start py-4 px-2 text-[#76885B] border rounded-md mb-2"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleCompleted(index)}
                  className="mr-2"
                  aria-label="Toggle completed"
                />
                <span
                  className={`flex-grow ${task.completed ? "line-through" : ""}`}
                >
                  {task.task}
                </span>
                <button
                  type="button"
                  onClick={() => handleEditTask(index)}
                  className="cursor-pointer mx-2"
                  aria-label="Edit task"
                >
                  <MdEditSquare className="text-[#399918] text-xl" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteTask(task)}
                  className="cursor-pointer"
                  aria-label="Delete task"
                >
                  <MdDelete className="text-[#FF8383] text-xl" />
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;

