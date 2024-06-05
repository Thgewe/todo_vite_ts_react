import ITaskListResponse from "../models/ITaskListResponse";
import ITaskResponse from "../models/ITaskResponse";
import ITaskRequest from "../models/ITaskRequest";
import IError from "../models/IError";

const API_BASE = "https://cms.dev-land.host/api";

export const getTaskList = async (statusParams: string, page: number): Promise<ITaskListResponse | IError> => {

    // Не понял как в URLSearchParams вставить 2 одинаковых параметра с разным значением через последовательность name-value пар,
    // он просто перезаписывает их.
    // Поэтому приходится руками вводить параметры
    const res: ITaskListResponse | IError = await fetch(API_BASE + "/tasks?" + new URLSearchParams(
        {"pagination[page]": page.toString(),}
        ) + statusParams,
        {
        }).then((response) => {
            return response.json();
        }).then((data) => {
            return data;
        });

    return res;
}

export const postNewTask = async (task: ITaskRequest["data"]): Promise<ITaskResponse> => {
    const res = await fetch(API_BASE + "/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({data: task}),
    }).then((response) => {
        return response.json();
    }).then((data) => {
        return data;
    })

    return res;
}

export const updateTaskById = async (id: number, task: ITaskRequest["data"]): Promise<ITaskResponse> => {
    const res = await fetch(API_BASE + "/tasks/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({data: task}),
    }).then((response) => {
        return response.json();
    }).then((data) => {
        return data;
    })

    return res;
}

export const removeTaskById = async (id: number): Promise<ITaskResponse | IError> => {
    const res = await fetch(API_BASE + "/tasks/" + id, {
        method: "DELETE",
    }).then((response) => {
        return response.json();
    }).then((data) => {
        return data;
    })

    return res;
}
