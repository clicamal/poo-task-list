import CRUD from "./crud";
import { TaskList, TaskListInterface } from "./task-list";

export default class TaskListManager extends CRUD<TaskList, TaskListInterface, TaskListInterface> {
    addObj(tskLData: TaskListInterface): void {
        if (this._data.has(tskLData.title)) throw new Error("Lista já existe.");

        this._data.set(tskLData.title, new TaskList(tskLData.title));
    }

    updateObj(title: string, newTskLData: TaskListInterface): void {
        const taskList = this.getObj(title) as TaskList;

        Object.keys(newTskLData).forEach(key => {
            taskList[key] = newTskLData[key];
        });

        if (newTskLData.title) {
            this.deleteObj(title);
            this.addObj({ title: newTskLData.title });
        }
    }
}
