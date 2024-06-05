import { render } from "@testing-library/react";
import App from "../App";
import TaskList from "../components/TaskList";

test("Renders the main page", () => {
    render(<App />)

    expect(true).toBeTruthy()
});
test("Renders the taskList", () => {
    render(<TaskList />)

    expect(true).toBeTruthy()
});