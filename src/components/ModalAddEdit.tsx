import {styled} from "styled-components";
import {Input, Modal} from "antd";
import useModalStore from "../store/modalStore";
import IModalState from "../models/IModalState";
import {useEffect, useState} from "react";
import ITaskRequest from "../models/ITaskRequest";
import useTasksStore from "../store/tasksStore";
import ITasksState from "../models/ITasksState";
import {useFetch} from "../hooks/useFetch";
import {postNewTask, updateTaskById} from "../service/todoAPI";

const InputWrapper = styled.div`
  margin-top: 2rem;
  & > input {
    margin-bottom: 1rem;
  }
`

// TODO: Error handling

const ModalAddEdit = () => {

    const { show, close, task } = useModalStore<IModalState>((state) => state);
    const { addTask, updateTask } = useTasksStore<ITasksState>((state) => state);
    const [newTask, setNewTask] = useState<ITaskRequest["data"]>({
        status: "not_completed",
        title: "",
        description: "",
    });
    const [postTaskFetch, loadingPost, errorPost] = useFetch(
        async (newTask: ITaskRequest["data"]) => {
            const res = await postNewTask(newTask);

            addTask({
                id: res.data.id,
                ...res.data.attributes,
            });

            close();
    })
    const [updateTaskFetch, loadingUpdate, errorUpdate] = useFetch(
        async (newTask: ITaskRequest["data"]) => {
            if (task) {
                const res = await updateTaskById(task.id, newTask);

                updateTask({
                    id: res.data.id,
                    ...res.data.attributes,
                });

                close();
            }
    })

    useEffect(() => {
        setNewTask({
            status: task ? task.data.status : "not_completed",
            title: task ? task.data.title : "",
            description: task ? task.data.description : "",
        })
    }, [task, show])


    const cancelHandler = () => {
        close();
    }
    const okHandler = () => {
        if (task) {
            updateTaskFetch(newTask);
        } else {
            postTaskFetch(newTask);
        }
    }

    return (
        <Modal
            open={show}
            okText={task ? "Edit" : "Add"}
            onCancel={cancelHandler}
            onOk={okHandler}
            confirmLoading={loadingPost | loadingUpdate}
        >
            <InputWrapper>
                <Input
                    placeholder={"Title"}
                    value={newTask.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTask((prevState) => ({
                        status: prevState.status,
                        title: e.currentTarget.value,
                        description: prevState.description,
                    }))}
                />
                <Input.TextArea
                    placeholder={"Description"}
                    value={newTask.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewTask((prevState) => ({
                        status: prevState.status,
                        title: prevState.title,
                        description: e.currentTarget.value,
                    }))}
                />
            </InputWrapper>
        </Modal>
    );
};

export default ModalAddEdit;