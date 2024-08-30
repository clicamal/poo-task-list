import HasTitle from "./interfaces/has-title";

export interface TaskInterface extends HasTitle {
    title: string;
    description: string;
};

export type TaskInterfacePart = Partial<TaskInterface>;

export class Task implements TaskInterface {
    private _title: string;
    private _description: string;
    private _done: boolean = false;

    constructor(title: string, description: string) {
        this._title = title;
        this._description = description;
    }

    get title(): string {
        return this._title;
    }

    set title(newTitle: string) {
        const newTitleLn = newTitle.length;

        if (newTitleLn < 4 ||newTitleLn > 30) throw new Error("Título deve ter entre 4 e 30 caracteres");

        this._title = newTitle;
    }

    get description(): string {
        return this._description;
    }

    set description(newDesc: string) {
        const newDescLn = newDesc.length;

        if (newDescLn > 250) throw new Error("Descrição deve ter no máximo 250 caracteres.");

        this._description = newDesc;
    }

    get done(): boolean {
        return this._done;
    }

    setDone(): void {
        this._done = true;
    }

    setNotDone(): void {
        this._done = false;
    }
}
