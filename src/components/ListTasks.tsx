// Importações necessárias
import { useEffect, useState } from "react"; // Hooks do React
import { TaskCard } from "./TaskCard"; // Componente para renderizar cada tarefa

// Define a estrutura de dados de uma tarefa
type Task = {
  id: string; // Identificador único
  title: string; // Título da tarefa
  description: string; // Descrição da tarefa
  step: "Para fazer" | "Em andamento" | "Pronto"; // Status da tarefa
};

// Define as propriedades que o componente recebe
type ListTasksProps = {
  tarefaCriadaFlag: boolean; // Flag que indica se uma nova tarefa foi criada
  toggleTarefaCriadaFlag: Function; // Função para resetar a flag
};

// Componente que exibe lista de tarefas em formato de grid
export function ListTasks(props: ListTasksProps) {
  // Estado para armazenar todas as tarefas
  const [tasks, setTasks] = useState<Task[]>([]);

  // Função assíncrona para carregar tarefas da API
  async function carregaTarefas() {
    const resposta = await fetch(
      "https://pacaro-tarefas.netlify.app/api/duda/tasks" // Endpoint diferente (API da Duda)
    );
    const tarefas = await resposta.json(); // Converte resposta para JSON
    setTasks(tarefas); // Atualiza estado com as tarefas
  }

  // useEffect que executa apenas uma vez na montagem do componente
  useEffect(() => {
    carregaTarefas(); // Carrega tarefas iniciais
  }, []);

  // useEffect que monitora mudanças na flag de tarefa criada
  useEffect(() => {
    if (props.tarefaCriadaFlag === true) {
      carregaTarefas(); // Recarrega tarefas
      props.toggleTarefaCriadaFlag(); // Reseta a flag
    }
  }, [props.tarefaCriadaFlag]);

  // useEffect para debug - loga tarefas no console
  useEffect(() => {
    console.log(tasks); // Mostra tarefas no console para debug
  }, [tasks]);

  const tarefas = tasks.map((task) => (
        <TaskCard key={task.id} task={task} /> // Nota: falta prop onUpdate
      ))

  return (
    // Container com grid responsivo
    <div className="m-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Mapeia cada tarefa para um TaskCard */}
      {tarefas}
    </div>
  );
}
