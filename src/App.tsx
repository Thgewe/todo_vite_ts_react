import './App.css'
import TaskList from "./components/TaskList";
import {useFetch} from "./hooks/useFetch";
import {useEffect} from "react";
import {getTaskList} from "./service/todoAPI";
import useTasksStore from "./store/tasksStore";
import ModalAddEdit from "./components/ModalAddEdit";
import useModalStore from "./store/modalStore";
import IModalState from "./models/IModalState";
import {Button} from "antd";

function App() {
    const addTaskList = useTasksStore(state => state.addTaskList);
    const { open } = useModalStore<IModalState>(state => state);

    const [fetching, isLoading, isError] = useFetch(async (page = 1) => {
        const data = await getTaskList({status: null}, page);
        addTaskList(data.data.map((item) => ({...item.attributes, id: item.id})))
    });

    useEffect(() => {
        fetching();
    }, [])

    if (isLoading)
        return <>Loading</>

    if (isError)
        return <div>
            {isError.error.status + " | " + isError.error.message}
        </div>

    return (
        <>
            <Button onClick={() => {open()}}>Add</Button>
            <TaskList/>
            <ModalAddEdit />
            {/*<Alert message={"success"} type={"error"}/>*/}
        </>
    )
}

export default App
