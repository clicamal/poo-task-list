import { TaskInterface, TaskInterfacePart } from "../models/task";
import { TaskList } from "../models/task-list";
describe("TaskList", () => {
    let taskList: TaskList;

    beforeEach(() => {
        taskList = new TaskList("Lista Válida");
    });

    test("deve criar uma lista de tarefas com título", () => {
        expect(taskList.title).toBe("Lista Válida");
    });

    test("deve lançar um erro se o comprimento do título for menor que 4 caracteres", () => {
        expect(() => {
            taskList.title = "abc";
        }).toThrow("Título da lista deve ter entre 4 e 18 caracteres.");
    });

    test("deve lançar um erro se o comprimento do título for maior que 18 caracteres", () => {
        expect(() => {
            taskList.title = "a".repeat(19);
        }).toThrow("Título da lista deve ter entre 4 e 18 caracteres.");
    });

    test("deve definir um novo título válido", () => {
        taskList.title = "Novo Título";
        expect(taskList.title).toBe("Novo Título");
    });

    test("deve adicionar uma nova tarefa à lista", () => {
        const taskData: TaskInterface = { title: "Nova Tarefa", description: "Descrição da tarefa" };
        taskList.addTask(taskData);
        expect(taskList.getTask("Nova Tarefa")?.title).toBe("Nova Tarefa");
        expect(taskList.getTask("Nova Tarefa")?.description).toBe("Descrição da tarefa");
    });

    test("deve lançar um erro ao adicionar uma tarefa que já existe na lista", () => {
        const taskData: TaskInterface = { title: "Tarefa Existente", description: "Descrição da tarefa" };
        taskList.addTask(taskData);
        expect(() => {
            taskList.addTask(taskData);
        }).toThrow("Tarefa já existe na lista.");
    });

    test("deve lançar um erro ao tentar obter uma tarefa que não existe na lista", () => {
        expect(() => {
            taskList.getTask("Tarefa Inexistente");
        }).toThrow("Tarefa não existe na lista.");
    });

    test("deve retornar todos os títulos de tarefas", () => {
        const task1: TaskInterface = { title: "Tarefa 1", description: "Descrição 1" };
        const task2: TaskInterface = { title: "Tarefa 2", description: "Descrição 2" };
        const task3: TaskInterface = { title: "Tarefa 3", description: "Descrição 3" };

        taskList.addTask(task1);
        taskList.addTask(task2);
        taskList.addTask(task3);

        const taskTitles = taskList.getAllTaskTitles();
        expect(taskTitles).toEqual(["Tarefa 1", "Tarefa 2", "Tarefa 3"]);
    });

    test("deve atualizar uma tarefa existente na lista", () => {
        const taskData: TaskInterface = { title: "Tarefa para Atualizar", description: "Descrição original" };
        taskList.addTask(taskData);
        const newTaskData: TaskInterfacePart = { description: "Nova descrição" };
        taskList.updateTask("Tarefa para Atualizar", newTaskData);
        expect(taskList.getTask("Tarefa para Atualizar")?.description).toBe("Nova descrição");
    });

    test("deve deletar uma tarefa existente na lista", () => {
        const taskData: TaskInterface = { title: "Tarefa para Deletar", description: "Descrição da tarefa" };
        taskList.addTask(taskData);
        taskList.deleteTask("Tarefa para Deletar");
        expect(() => {
            taskList.getTask("Tarefa para Deletar");
        }).toThrow("Tarefa não existe na lista.");
    });
});
