import { create } from "zustand";
import ITasksState from "../models/ITasksState";

const useTasksStore = create<ITasksState>()((set) => ({
    tasks: [],
    clear: () => set(() => ({tasks: []})),
    overrideTasks: (tasks) => set(() => ({tasks: tasks})),
    addTask: (task) => set((state) => ({tasks: [task, ...state.tasks]})),
    addTaskList: (tasks) => set((state) => ({tasks: [...state.tasks, ...tasks]})),
    removeTask: (id) => set((state) =>
        ({tasks: state.tasks.filter((task) => task.id !== id)})),
    updateTask: (newTask) => set((state) =>
        ({tasks: state.tasks.map((task) => task.id === newTask.id ? newTask : task)})),
    updateTaskStatus: (id, newStatus) => set((state) =>
        ({tasks: state.tasks.map((task) =>
            task.id === id ? {
                ...task,
                status: newStatus,
            } : task)
        })),
}));

export default useTasksStore;