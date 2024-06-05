import './App.css'
import TaskList from "./components/TaskList";
import {useFetch} from "./hooks/useFetch";
import {useEffect, useRef} from "react";
import {getTaskList} from "./service/todoAPI";
import useTasksStore from "./store/tasksStore";
import ModalAddEdit from "./components/ModalAddEdit";
import useModalStore from "./store/modalStore";
import IModalState from "./models/IModalState";
import {Alert, Button, Select} from "antd";
import {paginationDebounce} from "./utils/paginationDebounce";
import useTasksParamsStore from "./store/tasksParamsStore";
import ITasksParamsState from "./models/ITasksParamsState";
import styled from "styled-components";
import {buildFiltersStatusParamsString} from "./utils/buildFiltersStatusParamsString";
import {TSelectStatusValue} from "./models/TSelectStatusValue";
import ITasksState from "./models/ITasksState";
import {LoadingOutlined} from "@ant-design/icons";

const AppWrapper = styled.div`
  padding: 1rem;
  margin: 0 auto;
  max-width: 1440px;
`;
const RefWrapper = styled.div`
  // loadingSvg
  & > span {
    display: block;
    margin: 1rem auto;
  }
`;
const Controls = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;  
  gap: 1rem;
`;

function App() {
    const {addTaskList, clear} = useTasksStore<ITasksState>(state => state);
    const { filters, pagination, setParams } = useTasksParamsStore<ITasksParamsState>(state => state)
    const { open } = useModalStore<IModalState>(state => state);
    const list = useRef(null);

    const [fetching, isLoading, isError] = useFetch(async (statusFilter: TSelectStatusValue, page: number) => {
        const data = await getTaskList(buildFiltersStatusParamsString(statusFilter), page);

        if ("error" in data) {
            throw data.error;
        }

        addTaskList(data.data.map((item) => ({...item.attributes, id: item.id})));
        setParams({status: statusFilter}, data.meta.pagination);
    });

    useEffect(() => {
        fetching(filters.status, 1);
    }, [])

    useEffect(() => {
        window.addEventListener("scroll", windowScrollHandler);

        return () => {
            window.removeEventListener("scroll", windowScrollHandler);
        }
    }, [pagination, isLoading])

    const windowScrollHandler = () => {
        scrollHandler(pagination, isLoading);
    }
    const scrollHandler = paginationDebounce((pagination: ITasksParamsState["pagination"], isLoading: boolean) => {
        if (list.current) {
            if ((list.current as HTMLDivElement).clientHeight
                - document.documentElement.clientHeight
                - document.documentElement.scrollTop
                < document.documentElement.clientHeight + 100 && !isLoading) {
                if (pagination && pagination.page < pagination.pageCount) {
                    console.log("fetching");
                    fetching(filters.status, pagination.page + 1)
                }
            }
        }
    }, 200)


    const changeStatusFilter = (value: TSelectStatusValue) => {
        clear();
        fetching(value, 1);
    }

    return (
        <AppWrapper>
            <Controls>
                <Button onClick={() => {open()}}>Add</Button>
                <Select
                    value={filters.status}
                    options={[
                        {value: "all", label: <span>All</span>},
                        {value: "completed", label: <span>Completed</span>},
                        {value: "not_completed", label: <span>In progress</span>},
                        {value: "favourite", label: <span>Favourite</span>},
                    ]}
                    onChange={changeStatusFilter}
                />
            </Controls>
            <RefWrapper ref={list}>
                {isError
                    ? <Alert message={isError.error.status + " " + isError.error.message} type={"error"}/>
                    : <>
                        <TaskList />
                        {isLoading && <LoadingOutlined />}
                    </>
                }
                {pagination && pagination.page === pagination.pageCount && !isLoading
                    && <Alert message={"That's all"} type={"info"}/>
                }
            </RefWrapper>
            <ModalAddEdit />
        </AppWrapper>
    )
}

export default App
