type HeaderProps = {
  onCreateTask: () => void;
  showCreateButton?: boolean;
};

export function Header({ onCreateTask, showCreateButton = true }: HeaderProps) {
  return (
    <header className="bg-white shadow-md p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="/TarefitasLOGO.png" 
            alt="Tarefitas Logo" 
            className="w-10 h-10 rounded-full"
          />
          <h1 className="text-2xl font-bold" style={{color: '#86B0CA'}}>
            Tarefitas
          </h1>
        </div>
        
        {showCreateButton && (
          <button
            onClick={onCreateTask}
            className="text-white px-6 py-2 rounded-lg font-bold"
            style={{backgroundColor: '#86B0CA'}}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#7AA3BD'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#86B0CA'}
          >
            Criar Tarefa
          </button>
        )}
      </div>
    </header>
  );
}