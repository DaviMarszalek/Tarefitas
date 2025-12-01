import { Card } from "./Card";
import { useState } from "react";

type Task = {
  id: string;
  title: string;
  description: string;
  step: "Para fazer" | "Em andamento" | "Pronto";
};

type TaskCardProps = {
  task: Task;
  onUpdate: () => void;
};

export function TaskCard({ task, onUpdate }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const getStatusColor = (step: string) => {
    switch (step) {
      case "Para fazer":
        return "bg-red-100 text-red-800 border-red-200";
      case "Em andamento":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Pronto":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const moveTask = async (newStep: string) => {
    await fetch(`https://pacaro-tarefas.netlify.app/api/davi-marszalek/tasks/${task.id}/update-step`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ step: newStep })
    });
    onUpdate();
  };

  const deleteTask = async () => {
    await fetch(`https://pacaro-tarefas.netlify.app/api/davi-marszalek/tasks/${task.id}`, {
      method: "DELETE"
    });
    onUpdate();
  };

  const saveEdit = async () => {
    await fetch(`https://pacaro-tarefas.netlify.app/api/davi-marszalek/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, step: task.step })
    });
    setIsEditing(false);
    onUpdate();
  };

  if (isEditing) {
    return (
      <Card>
        <div className="flex flex-col gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded p-2"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded p-2 resize-none"
          />
          <div className="flex gap-2">
            <button onClick={saveEdit} className="bg-green-600 text-white px-3 py-1 rounded text-sm">Salvar</button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-600 text-white px-3 py-1 rounded text-sm">Cancelar</button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>
        <p className="text-gray-600">{task.description}</p>
        <span className={`px-3 py-1 rounded-full text-sm font-medium border self-start ${getStatusColor(task.step)}`}>
          {task.step}
        </span>
        
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            {task.step !== "Para fazer" && (
              <button onClick={() => moveTask(task.step === "Pronto" ? "Em andamento" : "Para fazer")} className="text-blue-600 hover:bg-blue-100 p-1 rounded">←</button>
            )}
            {task.step !== "Pronto" && (
              <button onClick={() => moveTask(task.step === "Para fazer" ? "Em andamento" : "Pronto")} className="text-blue-600 hover:bg-blue-100 p-1 rounded">→</button>
            )}
          </div>
          <div className="flex gap-1">
            <button 
              onClick={() => setIsEditing(true)} 
              className="p-1 rounded text-sm"
              style={{color: '#86B0CA'}}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#E8F0F5'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >✏️</button>
            <button onClick={deleteTask} className="text-red-600 hover:bg-red-100 p-1 rounded text-sm">🗑️</button>
          </div>
        </div>
      </div>
    </Card>
  );
}