import { TaskList, TaskListInterface } from "./task-list";

export default class TaskListManager {
    private _taskLists: Map<string, TaskList> = new Map<string, TaskList>();

    addTaskList(tskLData: TaskListInterface): void {
        if (this._taskLists.has(tskLData.title)) throw new Error("Lista já existe.");

        this._taskLists.set(tskLData.title, new TaskList(tskLData.title));
    }

    // Resultado pode ser usado com 'as TaskList' de forma segura. Pois ou retorna TaskList ou atira um erro.
    getTaskList(title: string): TaskList | undefined {
        if (!this._taskLists.has(title)) throw new Error("Lista não existe.");
        else return this._taskLists.get(title);
    }

    updateTaskList(title: string, newTskLData: TaskListInterface): void {
        const taskList = this.getTaskList(title) as TaskList;

        Object.keys(newTskLData).forEach(key => {
            taskList[key] = newTskLData[key];
        });
    }

    deleteTaskList(title: string): void {
        this._taskLists.delete((this.getTaskList(title) as TaskList).title);
    }
}
