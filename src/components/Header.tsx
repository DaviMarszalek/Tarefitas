// Define as propriedades que o componente Header recebe
type HeaderProps = {
  onCreateTask: () => void; // Função chamada quando botão "Criar Tarefa" é clicado
  showCreateButton?: boolean; // Propriedade opcional para mostrar/ocultar botão
};

// Componente de cabeçalho da aplicação
export function Header({ onCreateTask, showCreateButton = true }: HeaderProps) {
  return (
    // Cabeçalho com fundo branco e sombra
    <header className="bg-white shadow-md p-4">
      {/* Container flex para alinhar elementos */}
      <div className="flex items-center justify-between">
        {/* Seção esquerda: logo e título */}
        <div className="flex items-center gap-3">
          {/* Logo da aplicação */}
          <img 
            src="/TarefitasLOGO.png" 
            alt="Tarefitas Logo" 
            className="w-10 h-10 rounded-full"
          />
          {/* Título da aplicação */}
          <h1 className="text-2xl font-bold" style={{color: '#86B0CA'}}>
            Tarefitas
          </h1>
        </div>
        
        {/* Seção direita: botão (condicional) */}
        {showCreateButton && (
          <button
            onClick={onCreateTask} // Chama função quando clicado
            className="text-white px-6 py-2 rounded-lg font-bold"
            style={{backgroundColor: '#86B0CA'}}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#7AA3BD'} // Efeito hover
            onMouseLeave={(e) => e.target.style.backgroundColor = '#86B0CA'} // Restaura cor
          >
            Criar Tarefa
          </button>
        )}
      </div>
    </header>
  );
}