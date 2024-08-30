import HasTitle from "./interfaces/has-title";

export default abstract class CRUD<T extends HasTitle, TI, TIU> {
    protected _data: Map<string, T> =  new Map<string, T>();

    abstract addObj(crudData: TI): void;

    abstract updateObj(title: string, newData: TIU): void;

    getObj(title: string): T | undefined {
        if (!this._data.has(title)) throw new Error("Objeto não existe.");

        return this._data.get(title);
    }

    getAllTitles(): string[] {
        return Array.from(this._data.keys());
    }

    deleteObj(title: string): void {
        this._data.delete((this.getObj(title) as T).title);
    }
}
