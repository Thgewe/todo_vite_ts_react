import ITaskListResponseDataItem from "./ITaskListResponseDataItem";

export default interface ITaskListResponse {
    data: ITaskListResponseDataItem[],
    meta: {
        pagination: {
            page: number,
            pageSize: number,
            pageCount: number,
            total: number,
        }
    }
}