// Importações dos componentes e hooks necessários
import { useState } from "react"; // Hook para gerenciar estado
import { TarefitasBoard } from "./components/TarefitasBoard"; // Componente do quadro Kanban
import { CreateTask } from "./components/CreateTask"; // Componente de criação de tarefas
import { Header } from "./components/Header"; // Componente do cabeçalho

// Componente principal da aplicação
export default function App() {
  // Estado para controlar quando uma nova tarefa foi criada
  const [tarefaCriadaFlag, setTarefaCriadaFlag] = useState(false);
  // Estado para controlar qual página está sendo exibida
  const [currentPage, setCurrentPage] = useState<"kanban" | "create">("kanban");

  // Renderização condicional: página de criação de tarefa
  if (currentPage === "create") {
    return (
      // Container principal com altura mínima da tela e cor de fundo personalizada
      <div className="min-h-screen" style={{backgroundColor: '#F6EFE1'}}>
        {/* Cabeçalho sem botão de criar tarefa */}
        <Header onCreateTask={() => {}} showCreateButton={false} />
        
        {/* Seção com botão de voltar */}
        <div className="p-4 text-center">
          <button
            onClick={() => setCurrentPage("kanban")} // Volta para página principal
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            ← Voltar
          </button>
        </div>
        
        {/* Componente de criação de tarefa */}
        <CreateTask
          quandoEnviaComSucesso={() => {
            setTarefaCriadaFlag(true); // Marca que uma tarefa foi criada
            setCurrentPage("kanban"); // Volta para página principal
          }}
        />
      </div>
    );
  }

  // Renderização padrão: página principal com quadro Kanban
  return (
    // Container principal com altura mínima da tela e cor de fundo personalizada
    <div className="min-h-screen" style={{backgroundColor: '#F6EFE1'}}>
      {/* Cabeçalho com botão para ir à página de criação */}
      <Header onCreateTask={() => setCurrentPage("create")} />
      
      {/* Componente do quadro Kanban */}
      <TarefitasBoard
        tarefaCriadaFlag={tarefaCriadaFlag} // Passa flag de tarefa criada
        toggleTarefaCriadaFlag={() => setTarefaCriadaFlag(false)} // Função para resetar flag
      />
    </div>
  );
}
