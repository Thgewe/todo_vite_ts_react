import ITasksParamsState from "../models/ITasksParamsState";

export const paginationDebounce = (callback: (pagination: ITasksParamsState["pagination"] | null, isLoading: boolean) => void, ms: number) => {
    let isDelay = false;

    return (pagination: ITasksParamsState["pagination"], isLoading: boolean) => {
        if (!isDelay) {
            callback(pagination, isLoading);
            isDelay = true;

            setTimeout(() => {
                isDelay = false;
            }, ms)
        }
    }
}