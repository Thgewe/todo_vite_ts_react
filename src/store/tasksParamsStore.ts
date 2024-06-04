import {create} from "zustand";
import ITasksParamsState from "../models/ITasksParamsState";

const useTasksParamsStore = create<ITasksParamsState>()((set) => ({
    filters: {
        status: "all",
    },
    pagination: null, // если null, то значит не было еще ни одного запроса списка тасок
    setParams: (filters, pagination) => set(() => ({filters, pagination})),
}));

export default useTasksParamsStore;