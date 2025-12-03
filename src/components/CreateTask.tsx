// Importações necessárias
import { useState } from "react"; // Hook para gerenciar estado
import { Card } from "./Card"; // Componente de cartão reutilizável
import { toast } from "react-simple-toasts"; // Biblioteca para notificações

// Define os possíveis status de uma tarefa
type Step = "Para fazer" | "Em andamento" | "Pronto";

// Define as propriedades que o componente recebe
type CreateTaskProps = {
  quandoEnviaComSucesso: Function; // Função chamada quando tarefa é criada com sucesso
};

export function CreateTask(props: CreateTaskProps) {
  // Estados para controlar os valores dos campos do formulário
  const [title, setTitle] = useState(""); // Título da tarefa
  const [description, setDescription] = useState(""); // Descrição da tarefa
  const [step, setStep] = useState<Step>("Para fazer"); // Status inicial da tarefa

  // Função assíncrona para processar o envio do formulário
  async function quandoEnvia(event: any) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    // Validações do título
    if (title.length < 4) {
      toast("O título precisa ter pelo menos 4 caracteres!");
      return;
    }

    if (title.length > 25) {
      toast("O título precisa ter no máximo 25 caracteres!");
      return;
    }

    // Validações da descrição
    if (description.length < 8) {
      toast("A descrição precisa ter pelo menos 8 caracteres!");
      return;
    }

    if (description.length > 64) {
      toast("A descrição precisa ter no máximo 64 caracteres!");
      return;
    }

    // Cria objeto com os dados da tarefa
    const dataObj = {
      title: title,
      description: description,
      step: step,
    };
    
    // Envia requisição POST para criar a tarefa na API
    const resposta = await fetch(
      "https://pacaro-tarefas.netlify.app/api/davi-marszalek/tasks",
      {
        method: "POST",
        body: JSON.stringify(dataObj), // Converte objeto para JSON
        headers: {
          "Content-Type": "application/json", // Define tipo do conteúdo
        },
      }
    );

    // Verifica se a tarefa foi criada com sucesso (status 201)
    if (resposta.status === 201) {
      // Limpa os campos do formulário
      setTitle("");
      setDescription("");
      setStep("Para fazer");
      toast("Tarefa criada com sucesso!");
      props.quandoEnviaComSucesso(); // Chama função de callback
    } else {
      // Exibe mensagem de erro
      toast(
        "Houve um erro desconhecido do submundo do mal supremo ao enviar a sua tarefa"
      );
    }

    toast("foi enviado!"); // Notificação adicional
  }

  return (
    // Container principal com margem
    <div className="m-8">
      <Card>
        {/* Título do formulário */}
        <h2 className="text-center text-2xl font-extrabold mb-2" style={{color: '#86B0CA'}}>
          Criar tarefa
        </h2>
        
        {/* Formulário com layout em coluna */}
        <form className="flex flex-col gap-2" onSubmit={quandoEnvia}>
          {/* Campo de entrada para o título */}
          <input
            type="text"
            placeholder="Digite o título da tarefa"
            className="border-2 border-slate-700 rounded-lg p-2 outline-none"
            style={{'--focus-color': '#86B0CA'}}
            onFocus={(e) => e.target.style.borderColor = '#86B0CA'} // Muda cor da borda no foco
            onBlur={(e) => e.target.style.borderColor = '#334155'} // Restaura cor da borda
            value={title}
            onChange={(event) => setTitle(event.target.value)} // Atualiza estado
          />
          
          {/* Campo de texto para a descrição */}
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Digite a descrição da tarefa"
            className="border-2 border-slate-700 rounded-lg p-2 outline-none resize-none"
            onFocus={(e) => e.target.style.borderColor = '#86B0CA'}
            onBlur={(e) => e.target.style.borderColor = '#334155'}
          ></textarea>
          
          {/* Grupo de radio buttons para selecionar o status */}
          <div className="flex gap-4 justify-center">
            {/* Opção "Para fazer" */}
            <div className="flex flex-col">
              <label htmlFor="step-em-andamento" className="text-center">
                Para fazer
              </label>
              <input
                type="radio"
                id="step-em-andamento"
                name="step-tarefa"
                checked={step === "Para fazer"}
                onChange={() => setStep("Para fazer")}
              />
            </div>
            
            {/* Opção "Em andamento" */}
            <div className="flex flex-col">
              <label htmlFor="step-andamento" className="text-center">
                Em andamento
              </label>
              <input
                type="radio"
                id="step-andamento"
                name="step-tarefa"
                checked={step === "Em andamento"}
                onChange={() => setStep("Em andamento")}
              />
            </div>
            
            {/* Opção "Pronto" */}
            <div className="flex flex-col">
              <label htmlFor="step-pronto" className="text-center">
                Pronto
              </label>
              <input
                type="radio"
                id="step-pronto"
                name="step-tarefa"
                checked={step === "Pronto"}
                onChange={() => setStep("Pronto")}
              />
            </div>
          </div>
          
          {/* Botão de envio com efeitos hover */}
          <button
            type="submit"
            className="p-3 rounded-2xl text-white font-extrabold uppercase text-lg shadow-xl hover:cursor-pointer"
            style={{backgroundColor: '#86B0CA'}}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#7AA3BD'} // Escurece no hover
            onMouseLeave={(e) => e.target.style.backgroundColor = '#86B0CA'} // Restaura cor original
          >
            Enviar
          </button>
        </form>
      </Card>
    </div>
  );
}
