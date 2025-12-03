// Importa hooks do React para gerenciar estado e efeitos colaterais
import { useEffect, useState } from "react";
// Importa o componente TaskCard que renderiza cada tarefa individual
import { TaskCard } from "./TaskCard";

// Define a estrutura de dados de uma tarefa com TypeScript
type Task = {
  id: string; // Identificador único da tarefa
  title: string; // Título da tarefa
  description: string; // Descrição detalhada da tarefa
  step: "Para fazer" | "Em andamento" | "Pronto"; // Status da tarefa (union type)
};

// Define as propriedades que o componente recebe do componente pai
type TarefitasBoardProps = {
  tarefaCriadaFlag: boolean; // Flag que indica se uma nova tarefa foi criada
  toggleTarefaCriadaFlag: Function; // Função para resetar a flag
};

export function TarefitasBoard(props: TarefitasBoardProps) {
  // Estado para armazenar todas as tarefas carregadas da API
  const [tasks, setTasks] = useState<Task[]>([]);

  // Função assíncrona para buscar tarefas da API
  async function carregaTarefas() {
    // Faz requisição GET para a API
    const resposta = await fetch(
      "https://pacaro-tarefas.netlify.app/api/davi-marszalek/tasks"
    );
    // Converte a resposta para JSON
    const tarefas = await resposta.json();
    // Atualiza o estado com as tarefas recebidas
    setTasks(tarefas);
  }

  // useEffect que executa apenas uma vez quando o componente é montado
  useEffect(() => {
    carregaTarefas(); // Carrega as tarefas iniciais
  }, []); // Array vazio significa que executa apenas na montagem

  // useEffect que monitora mudanças na flag de tarefa criada
  useEffect(() => {
    if (props.tarefaCriadaFlag === true) {
      carregaTarefas(); // Recarrega as tarefas
      props.toggleTarefaCriadaFlag(); // Reseta a flag
    }
  }, [props.tarefaCriadaFlag]); // Executa sempre que a flag mudar

  // Filtra as tarefas por status usando o método filter()
  const todoTasks = tasks.filter(task => task.step === "Para fazer");
  const inProgressTasks = tasks.filter(task => task.step === "Em andamento");
  const doneTasks = tasks.filter(task => task.step === "Pronto");

  return (
    // Container principal com padding
    <div className="p-8">
      {/* Grid responsivo: 1 coluna no mobile, 3 colunas no desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Coluna "Para fazer" - cor vermelha */}
        <div className="bg-red-50 rounded-lg p-4">
          {/* Título da coluna com contador de tarefas */}
          <h2 className="text-xl font-bold text-red-800 mb-4 text-center">
            Para fazer ({todoTasks.length})
          </h2>
          {/* Container das tarefas com espaçamento vertical */}
          <div className="space-y-3">
            {/* Mapeia cada tarefa "Para fazer" em um TaskCard */}
            {todoTasks.map(task => (
              <TaskCard key={task.id} task={task} onUpdate={carregaTarefas} />
            ))}
          </div>
        </div>

        {/* Coluna "Em andamento" - cor amarela */}
        <div className="bg-yellow-50 rounded-lg p-4">
          {/* Título da coluna com contador de tarefas */}
          <h2 className="text-xl font-bold text-yellow-800 mb-4 text-center">
            Em andamento ({inProgressTasks.length})
          </h2>
          {/* Container das tarefas com espaçamento vertical */}
          <div className="space-y-3">
            {/* Mapeia cada tarefa "Em andamento" em um TaskCard */}
            {inProgressTasks.map(task => (
              <TaskCard key={task.id} task={task} onUpdate={carregaTarefas} />
            ))}
          </div>
        </div>

        {/* Coluna "Pronto" - cor verde */}
        <div className="bg-green-50 rounded-lg p-4">
          {/* Título da coluna com contador de tarefas */}
          <h2 className="text-xl font-bold text-green-800 mb-4 text-center">
            Pronto ({doneTasks.length})
          </h2>
          {/* Container das tarefas com espaçamento vertical */}
          <div className="space-y-3">
            {/* Mapeia cada tarefa "Pronto" em um TaskCard */}
            {doneTasks.map(task => (
              <TaskCard key={task.id} task={task} onUpdate={carregaTarefas} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}