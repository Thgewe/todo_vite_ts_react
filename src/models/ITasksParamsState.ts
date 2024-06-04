import ITaskListResponse from "./ITaskListResponse";
import {TSelectStatusValue} from "./TSelectStatusValue";

export default interface ITasksParamsState {
    filters: {
        status: TSelectStatusValue,
    },
    pagination: null | ITaskListResponse["meta"]["pagination"],
    setParams: (filters: ITasksParamsState["filters"], pagination: ITasksParamsState["pagination"]) => void,
}