import {TStatus} from "./TStatus";

export default interface ITask {
    title: string,
    description: string,
    status: TStatus,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
}