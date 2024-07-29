import { Task, TaskInterface } from "./task";

export interface TaskListInterface {
    title: string;
}

export class TaskList implements TaskListInterface {
    private _title: string;
    private _tasks: Map<string, Task> = new Map<string, Task>();

    constructor(title: string) {
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

    addTask(tskData: TaskInterface) {
        if (this._tasks.has(tskData.title)) throw new Error("Tarefa já existe na lista.");

        this._tasks.set(tskData.title, new Task(tskData.title, tskData.description));
    }

    // Resultado pode ser usado com 'as Task' de forma segura. Pois ou retorna Task ou atira um erro.
    getTask(title: string): Task | undefined {
        if (!this._tasks.has(title)) throw new Error("Tarefa não existe na lista.");
        else return this._tasks.get(title);
    }

    updateTask(title: string, newTskData: TaskInterface): void {
        const task = this.getTask(title) as Task;

        Object.keys(newTskData).forEach(key => {
            task[key] = newTskData[key];
        });
    }

    deleteTask(title: string): void {
        this._tasks.delete((this.getTask(title) as Task).title);
    }
}
