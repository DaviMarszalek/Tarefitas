import { useState } from "react";
import { TarefitasBoard } from "./components/TarefitasBoard";
import { CreateTask } from "./components/CreateTask";
import { Header } from "./components/Header";

export default function App() {
  const [tarefaCriadaFlag, setTarefaCriadaFlag] = useState(false);
  const [currentPage, setCurrentPage] = useState<"kanban" | "create">("kanban");

  if (currentPage === "create") {
    return (
      <div className="min-h-screen" style={{backgroundColor: '#F6EFE1'}}>
        <Header onCreateTask={() => {}} showCreateButton={false} />
        <div className="p-4 text-center">
          <button
            onClick={() => setCurrentPage("kanban")}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            ← Voltar
          </button>
        </div>
        <CreateTask
          quandoEnviaComSucesso={() => {
            setTarefaCriadaFlag(true);
            setCurrentPage("kanban");
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: '#F6EFE1'}}>
      <Header onCreateTask={() => setCurrentPage("create")} />
      <TarefitasBoard
        tarefaCriadaFlag={tarefaCriadaFlag}
        toggleTarefaCriadaFlag={() => setTarefaCriadaFlag(false)}
      />
    </div>
  );
}
