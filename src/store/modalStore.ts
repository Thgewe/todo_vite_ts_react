import {create} from "zustand";
import IModalState from "../models/IModalState";

const useModalStore = create<IModalState>()((set) => ({
    show: false,
    task: null,
    open: (task?) => set(() => ({show: true, task: task ? task : null})),
    close: () => set(() => ({show: false, task: null})),
}))

export default useModalStore;