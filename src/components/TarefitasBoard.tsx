import { useEffect, useState } from "react";
import { TaskCard } from "./TaskCard";

type Task = {
  id: string;
  title: string;
  description: string;
  step: "Para fazer" | "Em andamento" | "Pronto";
};

type TarefitasBoardProps = {
  tarefaCriadaFlag: boolean;
  toggleTarefaCriadaFlag: Function;
};

export function TarefitasBoard(props: TarefitasBoardProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  async function carregaTarefas() {
    const resposta = await fetch(
      "https://pacaro-tarefas.netlify.app/api/davi-marszalek/tasks"
    );
    const tarefas = await resposta.json();
    setTasks(tarefas);
  }

  useEffect(() => {
    carregaTarefas();
  }, []);

  useEffect(() => {
    if (props.tarefaCriadaFlag === true) {
      carregaTarefas();
      props.toggleTarefaCriadaFlag();
    }
  }, [props.tarefaCriadaFlag]);

  const todoTasks = tasks.filter(task => task.step === "Para fazer");
  const inProgressTasks = tasks.filter(task => task.step === "Em andamento");
  const doneTasks = tasks.filter(task => task.step === "Pronto");

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Para fazer */}
        <div className="bg-red-50 rounded-lg p-4">
          <h2 className="text-xl font-bold text-red-800 mb-4 text-center">
            Para fazer ({todoTasks.length})
          </h2>
          <div className="space-y-3">
            {todoTasks.map(task => (
              <TaskCard key={task.id} task={task} onUpdate={carregaTarefas} />
            ))}
          </div>
        </div>

        {/* Em andamento */}
        <div className="bg-yellow-50 rounded-lg p-4">
          <h2 className="text-xl font-bold text-yellow-800 mb-4 text-center">
            Em andamento ({inProgressTasks.length})
          </h2>
          <div className="space-y-3">
            {inProgressTasks.map(task => (
              <TaskCard key={task.id} task={task} onUpdate={carregaTarefas} />
            ))}
          </div>
        </div>

        {/* Pronto */}
        <div className="bg-green-50 rounded-lg p-4">
          <h2 className="text-xl font-bold text-green-800 mb-4 text-center">
            Pronto ({doneTasks.length})
          </h2>
          <div className="space-y-3">
            {doneTasks.map(task => (
              <TaskCard key={task.id} task={task} onUpdate={carregaTarefas} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}