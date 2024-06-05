import styled from "styled-components";
import TaskItem from "./TaskItem";
import useTasksStore from "../store/tasksStore";
import ITasksState from "../models/ITasksState";

const List = styled.div`
    padding: 1rem;
  & > div + div {
    margin-top: 1rem;
  }

`

const TaskList = () => {

    const tasks = useTasksStore<ITasksState["tasks"]>(state => state.tasks);

    return (
        <List>
            {tasks.map((task) => <TaskItem
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}

                // на сервере может быть любая строка в статусе, поэтому такая проверка тут
                status={task.status === "completed"
                    ? "completed"
                    : task.status === "completed favourite"
                        ? "completed favourite"
                        : task.status === "not_completed"
                            ? "not_completed"
                            : "not_completed favourite"
                }
            />)}
        </List>
    );
};

export default TaskList;