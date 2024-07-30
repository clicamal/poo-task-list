import { TaskList, TaskListInterface } from "../models/task-list";
import TaskListManager from "../models/task-list-manager"; // Certifique-se de ajustar o caminho conforme necessário

describe("TaskListManager", () => {
  let taskListManager: TaskListManager;

  beforeEach(() => {
    taskListManager = new TaskListManager();
  });

  test("deve adicionar uma nova lista de tarefas", () => {
    const taskListData: TaskListInterface = { title: "Nova Lista" };
    taskListManager.addTaskList(taskListData);
    expect(taskListManager.getTaskList("Nova Lista")?.title).toBe("Nova Lista");
  });

  test("deve lançar um erro ao adicionar uma lista de tarefas que já existe", () => {
    const taskListData: TaskListInterface = { title: "Lista Existente" };
    taskListManager.addTaskList(taskListData);
    expect(() => {
      taskListManager.addTaskList(taskListData);
    }).toThrow("Lista já existe.");
  });

  test("deve lançar um erro ao tentar obter uma lista de tarefas que não existe", () => {
    expect(() => {
      taskListManager.getTaskList("Lista Inexistente");
    }).toThrow("Lista não existe.");
  });

  test("deve atualizar uma lista de tarefas existente", () => {
    const taskListData: TaskListInterface = { title: "Lista para Atualizar" };
    taskListManager.addTaskList(taskListData);
    const newTaskListData: TaskListInterface = { title: "Lista Atualizada" };
    taskListManager.updateTaskList("Lista para Atualizar", newTaskListData);
    expect(taskListManager.getTaskList("Lista Atualizada")?.title).toBe("Lista Atualizada");
  });

  test("deve deletar uma lista de tarefas existente", () => {
    const taskListData: TaskListInterface = { title: "Lista para Deletar" };
    taskListManager.addTaskList(taskListData);
    taskListManager.deleteTaskList("Lista para Deletar");
    expect(() => {
      taskListManager.getTaskList("Lista para Deletar");
    }).toThrow("Lista não existe.");
  });
});
