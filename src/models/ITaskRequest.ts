import {TStatus} from "./TStatus";

export default interface ITaskRequest {
    data: {
        title: string,
        description: string,
        status: TStatus,
    }
}