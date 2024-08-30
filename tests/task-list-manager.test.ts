import { TaskListInterface } from "../models/task-list";
import TaskListManager from "../models/task-list-manager";

describe("TaskListManager", () => {
    let taskListManager: TaskListManager;

    beforeEach(() => {
        taskListManager = new TaskListManager();
    });

    test("deve adicionar uma nova lista de tarefas", () => {
        const taskListData: TaskListInterface = { title: "Nova Lista" };
        taskListManager.addObj(taskListData);
        expect(taskListManager.getObj("Nova Lista")?.title).toBe("Nova Lista");
    });

    test("deve lançar um erro ao adicionar uma lista de tarefas que já existe", () => {
        const taskListData: TaskListInterface = { title: "Lista Existente" };
        taskListManager.addObj(taskListData);
        expect(() => {
            taskListManager.addObj(taskListData);
        }).toThrow("Lista já existe.");
    });

    test("deve lançar um erro ao tentar obter uma lista de tarefas que não existe", () => {
        expect(() => {
            taskListManager.getObj("Lista Inexistente");
        }).toThrow("Objeto não existe.");
    });

    test("deve retornar todos os títulos de tarefas", () => {
        const taskList1: TaskListInterface = { title: "Lista 1" };
        const taskList2: TaskListInterface = { title: "Lista 2" };
        const taskList3: TaskListInterface = { title: "Lista 3" };

        taskListManager.addObj(taskList1);
        taskListManager.addObj(taskList2);
        taskListManager.addObj(taskList3);

        const taskListTitles = taskListManager.getAllTitles();
        expect(taskListTitles).toEqual(["Lista 1", "Lista 2", "Lista 3"]);
    });

    test("deve atualizar uma lista de tarefas existente", () => {
        const taskListData: TaskListInterface = { title: "Lista para Atualizar" };
        taskListManager.addObj(taskListData);
        const newTaskListData: TaskListInterface = { title: "Lista Atualizada" };
        taskListManager.updateObj("Lista para Atualizar", newTaskListData);
        expect(taskListManager.getObj("Lista Atualizada")?.title).toBe("Lista Atualizada");
    });

    test("deve deletar uma lista de tarefas existente", () => {
        const taskListData: TaskListInterface = { title: "Lista para Deletar" };
        taskListManager.addObj(taskListData);
        taskListManager.deleteObj("Lista para Deletar");
        expect(() => {
            taskListManager.getObj("Lista para Deletar");
        }).toThrow("Objeto não existe.");
    });
});
