import ITaskRequest from "./ITaskRequest";
import ITaskID from "./ITaskID";

export default interface IModalState {
    show: boolean,
    task: (ITaskRequest & ITaskID) | null,
    open: (task?: (ITaskRequest & ITaskID) | null) => void,
    close: () => void,
}
