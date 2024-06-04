import {Typography, Button, Select} from "antd";
import styled from "styled-components";
import {DeleteOutlined, EditOutlined, StarOutlined} from "@ant-design/icons";
import useTasksStore from "../store/tasksStore";
import {memo, useState} from "react";
import ITasksState from "../models/ITasksState";
import IModalState from "../models/IModalState";
import useModalStore from "../store/modalStore";
import {TStatus} from "../models/TStatus";
import {useFetch} from "../hooks/useFetch";
import {removeTaskById, updateTaskById} from "../service/todoAPI";

const Wrapper = styled.div`
  border-radius: .5rem;
  border: 1px solid var(--border-visible);
`;

const Header = styled.div`
  padding: .75rem;
  margin-bottom: .75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--bg-shade);

  & > h4 {
    margin: 0;
  }
`;
const Description = styled.div`
  padding-right: .75rem;
  padding-left: .75rem;
  padding-bottom: .75rem;
  display: flex;
  justify-content: space-between;
  
  & > div:first-child {
    margin: 0;
  }
`;
const Status = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: 1rem;
`
const Controls = styled.div`
  align-self: flex-end;
  display: flex;
  gap: 0.5rem;
  margin-left: 1rem;
`;

interface ITaskItem {
    id: number,
    title: string,
    description: string,
    status: TStatus,
}

// TODO: ErrorMessage

const TaskItem = memo(({id, title, description, status}: ITaskItem) => {

    const {removeTask, updateTaskStatus} = useTasksStore<ITasksState>(state => state);
    const openModal = useModalStore<IModalState["open"]>(state => state.open);
    const [statusState, setStatusState] = useState<TStatus>(status);

    const [removeFetch, loadingRemove, errorRemove] = useFetch(async (id: number) => {
        const res = await removeTaskById(id);

        if (!errorRemove) {
            // если 0, то таска удалилась на сервере, можем удалить на клиенте
            removeTask(id);
        } else {
            // errorHandling
        }
    });
    const [updateStatusFetch, loadingupdateStatus, errorUpdateStatus] = useFetch(
        async (id: number, newStatus: TStatus) => {
            const res = await updateTaskById(id, {
                status: newStatus,
                title: title,
                description: description,
            });

            if (!errorUpdateStatus) {
                updateTaskStatus(id, newStatus);
            } else {
                // если была ошибка, то возвращаем старые значения
                setStatusState(status);
            }
    })

    const removeHandler = () => {
        removeFetch(id);
    };

    const editHandler = () => {
        openModal({
            id: id,
            data: {
                status: status,
                title: title,
                description: description,
            }
        });
    };
    const favouriteHandler = () => {
        const statusArray = statusState.split(" ");
        let newStatus = "";
        if (statusArray.length <= 1) {
            newStatus = statusArray[0] + " favourite";
        } else {
            newStatus = statusArray[0];
        }
        setStatusState(newStatus as TStatus);
        updateStatusFetch(id, newStatus);
    };
    const statusHandler = (newValue: TStatus) => {
        const statusArray = statusState.split(" ");
        let newStatus = "";

        switch (newValue) {
            case "not_completed":
                // если statusArray[1] !== undefined, то вернется элемент под первым индексом
                // в моем случае это всегда только "favourite"
                newStatus = "not_completed" + (statusArray[1] ? " " + statusArray[1] : "");
                break;
            case "completed":
                newStatus = "completed" + (statusArray[1] ? " " + statusArray[1] : "");
                break;
            default:
                newStatus = "not_completed" + (statusArray[1] ? " " + statusArray[1] : "");
        }
        setStatusState(newStatus as TStatus);
        updateStatusFetch(id, newStatus);
    };

    return (
        <Wrapper>
            <Header>
                <Typography.Title level={4}>
                    {title}
                </Typography.Title>
                <Status>
                    <Select
                        // defaultValue={status.split(" ")[0]}
                        value={statusState.split(" ")[0]}
                        options={[
                            {value: "not_completed", label: <span>In progress</span>},
                            {value: "completed", label: <span>Completed</span>},
                        ]}
                        onChange={statusHandler}
                    />
                    <Button
                        // Если длина status больше чем максимальная длина статуса без favourite,
                        // то это точно favourite
                        type={statusState.length > "not_completed".length ? "primary" : "default"}
                        onClick={favouriteHandler}
                        icon={<StarOutlined />}
                    />
                </Status>
            </Header>
            <Description>
                <Typography.Paragraph>
                    {description}
                </Typography.Paragraph>
                <Controls>
                    <Button
                        onClick={editHandler}
                        icon={<EditOutlined />}
                        iconPosition={"end"}
                    />
                    <Button
                        onClick={removeHandler}
                        icon={<DeleteOutlined />}
                        danger={true}
                    />
                </Controls>
            </Description>
        </Wrapper>
    );
});

export default TaskItem;