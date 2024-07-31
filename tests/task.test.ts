import { Task } from "../models/task";
describe("Task", () => {
    let task: Task;

    beforeEach(() => {
        task = new Task("Título Válido", "Descrição válida");
    });

    test("deve criar uma tarefa com título e descrição", () => {
        expect(task.title).toBe("Título Válido");
        expect(task.description).toBe("Descrição válida");
        expect(task.done).toBe(false);
    });

    test("deve lançar um erro se o comprimento do título for menor que 4 caracteres", () => {
        expect(() => {
            task.title = "abc";
        }).toThrow("Título deve ter entre 4 e 30 caracteres");
    });

    test("deve lançar um erro se o comprimento do título for maior que 30 caracteres", () => {
        expect(() => {
            task.title = "a".repeat(31);
        }).toThrow("Título deve ter entre 4 e 30 caracteres");
    });

    test("deve definir um novo título válido", () => {
        task.title = "Novo Título Válido";
        expect(task.title).toBe("Novo Título Válido");
    });

    test("deve lançar um erro se o comprimento da descrição for maior que 250 caracteres", () => {
        expect(() => {
            task.description = "a".repeat(251);
        }).toThrow("Descrição deve ter no máximo 250 caracteres.");
    });

    test("deve definir uma nova descrição válida", () => {
        task.description = "Nova descrição válida";
        expect(task.description).toBe("Nova descrição válida");
    });

    test("deve marcar a tarefa como concluída", () => {
        task.setDone();
        expect(task.done).toBe(true);
    });

    test("deve marcar a tarefa como não concluída", () => {
        task.setNotDone();
        expect(task.done).toBe(false);
    });
});
