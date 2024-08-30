import CRUD from "./crud";
import HasTitle from "./interfaces/has-title";
import { Task, TaskInterface, TaskInterfacePart } from "./task";

export interface TaskListInterface extends HasTitle {
    title: string;
};

export class TaskList extends CRUD<Task, TaskInterface, TaskInterfacePart> implements TaskListInterface {
    private _title: string;

    constructor(title: string) {
        super();
        this._title = title;
    }

    get title(): string {
        return this._title;
    }

    set title(newTitle) {
        const newTtlLn = newTitle.length;

        if (newTtlLn < 4 || newTtlLn > 18) throw new Error("Título da lista deve ter entre 4 e 18 caracteres.");

        this._title = newTitle;
    }

    addObj(tskData: TaskInterface): void {
        if (this._data.has(tskData.title)) throw new Error("Tarefa já existe na lista.");

        this._data.set(tskData.title, new Task(tskData.title, tskData.description));
    }

    updateObj(title: string, newTskData: TaskInterfacePart): void {
        const task = this.getObj(title) as Task;

        Object.keys(newTskData).forEach(key => {
            task[key] = newTskData[key];
        });

        if (newTskData.title) {
            this.deleteObj(title);
            this.addObj({ title: newTskData.title, description: newTskData.description || "" });
        }
    }
}
