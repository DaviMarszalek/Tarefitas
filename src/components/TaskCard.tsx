// Importações necessárias
import { Card } from "./Card"; // Componente de cartão reutilizável
import { useState } from "react"; // Hook para gerenciar estado

// Define a estrutura de dados de uma tarefa
type Task = {
  id: string; // Identificador único
  title: string; // Título da tarefa
  description: string; // Descrição da tarefa
  step: "Para fazer" | "Em andamento" | "Pronto"; // Status da tarefa
};

// Define as propriedades que o componente recebe
type TaskCardProps = {
  task: Task; // Dados da tarefa a ser exibida
  onUpdate: () => void; // Função chamada após atualizações
};

export function TaskCard({ task, onUpdate }: TaskCardProps) {
  // Estados para controlar edição
  const [isEditing, setIsEditing] = useState(false); // Controla se está em modo de edição
  const [title, setTitle] = useState(task.title); // Título editável
  const [description, setDescription] = useState(task.description); // Descrição editável
  // Função que retorna classes CSS baseadas no status da tarefa
  const getStatusColor = (step: string) => {
    switch (step) {
      case "Para fazer":
        return "bg-red-100 text-red-800 border-red-200"; // Vermelho para tarefas pendentes
      case "Em andamento":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"; // Amarelo para tarefas em progresso
      case "Pronto":
        return "bg-green-100 text-green-800 border-green-200"; // Verde para tarefas concluídas
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"; // Cinza como fallback
    }
  };

  // Função para mover tarefa entre diferentes status
  const moveTask = async (newStep: string) => {
    await fetch(`https://pacaro-tarefas.netlify.app/api/davi-marszalek/tasks/${task.id}/update-step`, {
      method: "PATCH", // Método PATCH para atualização parcial
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ step: newStep }) // Envia apenas o novo status
    });
    onUpdate(); // Atualiza a lista de tarefas
  };

  // Função para deletar uma tarefa
  const deleteTask = async () => {
    await fetch(`https://pacaro-tarefas.netlify.app/api/davi-marszalek/tasks/${task.id}`, {
      method: "DELETE" // Método DELETE para remoção
    });
    onUpdate(); // Atualiza a lista de tarefas
  };

  // Função para salvar edições da tarefa
  const saveEdit = async () => {
    await fetch(`https://pacaro-tarefas.netlify.app/api/davi-marszalek/tasks/${task.id}`, {
      method: "PUT", // Método PUT para atualização completa
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, step: task.step }) // Envia dados atualizados
    });
    setIsEditing(false); // Sai do modo de edição
    onUpdate(); // Atualiza a lista de tarefas
  };

  // Renderização condicional: modo de edição
  if (isEditing) {
    return (
      <Card>
        <div className="flex flex-col gap-3">
          {/* Campo de entrada para editar título */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded p-2"
          />
          {/* Campo de texto para editar descrição */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded p-2 resize-none"
          />
          {/* Botões de ação */}
          <div className="flex gap-2">
            <button onClick={saveEdit} className="bg-green-600 text-white px-3 py-1 rounded text-sm">Salvar</button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-600 text-white px-3 py-1 rounded text-sm">Cancelar</button>
          </div>
        </div>
      </Card>
    );
  }

  // Renderização padrão: modo de visualização
  return (
    <Card>
      <div className="flex flex-col gap-3">
        {/* Título da tarefa */}
        <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>
        
        {/* Descrição da tarefa */}
        <p className="text-gray-600">{task.description}</p>
        
        {/* Badge com status da tarefa */}
        <span className={`px-3 py-1 rounded-full text-sm font-medium border self-start ${getStatusColor(task.step)}`}>
          {task.step}
        </span>
        
        {/* Container de ações */}
        <div className="flex justify-between items-center">
          {/* Botões de navegação entre status */}
          <div className="flex gap-1">
            {/* Botão para mover para trás (se não estiver em "Para fazer") */}
            {task.step !== "Para fazer" && (
              <button onClick={() => moveTask(task.step === "Pronto" ? "Em andamento" : "Para fazer")} className="text-blue-600 hover:bg-blue-100 p-1 rounded">←</button>
            )}
            {/* Botão para mover para frente (se não estiver em "Pronto") */}
            {task.step !== "Pronto" && (
              <button onClick={() => moveTask(task.step === "Para fazer" ? "Em andamento" : "Pronto")} className="text-blue-600 hover:bg-blue-100 p-1 rounded">→</button>
            )}
          </div>
          
          {/* Botões de edição e exclusão */}
          <div className="flex gap-1">
            {/* Botão de editar */}
            <button 
              onClick={() => setIsEditing(true)} 
              className="p-1 rounded text-sm"
              style={{color: '#86B0CA'}}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#E8F0F5'} // Efeito hover
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >✏️</button>
            {/* Botão de deletar */}
            <button onClick={deleteTask} className="text-red-600 hover:bg-red-100 p-1 rounded text-sm">🗑️</button>
          </div>
        </div>
      </div>
    </Card>
  );
}