import {TTaskWithID} from "./TTaskWithID";
import {TStatus} from "./TStatus";

export default interface ITasksState {
    tasks: TTaskWithID[],
    clear: () => void,
    overrideTasks: (tasks: TTaskWithID[]) => void,
    addTask: (task: TTaskWithID) => void,
    addTaskList: (tasks: TTaskWithID[]) => void,
    removeTask: (id: number) => void,
    updateTask: (newTask: TTaskWithID) => void,
    updateTaskStatus: (id: number, newStatus: TStatus) => void,
}