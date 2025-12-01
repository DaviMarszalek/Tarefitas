import { useState } from "react";
import { Card } from "./Card";
import { toast } from "react-simple-toasts";

type Step = "Para fazer" | "Em andamento" | "Pronto";

type CreateTaskProps = {
  quandoEnviaComSucesso: Function;
};

export function CreateTask(props: CreateTaskProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [step, setStep] = useState<Step>("Para fazer");

  async function quandoEnvia(event: any) {
    event.preventDefault();

    if (title.length < 4) {
      toast("O título precisa ter pelo menos 4 caracteres!");
      return;
    }

    if (title.length > 25) {
      toast("O título precisa ter no máximo 25 caracteres!");
      return;
    }

    if (description.length < 8) {
      toast("A descrição precisa ter pelo menos 8 caracteres!");
      return;
    }

    if (description.length > 64) {
      toast("A descrição precisa ter no máximo 64 caracteres!");
      return;
    }

    const dataObj = {
      title: title,
      description: description,
      step: step,
    };
    const resposta = await fetch(
      "https://pacaro-tarefas.netlify.app/api/davi-marszalek/tasks",
      {
        method: "POST",
        body: JSON.stringify(dataObj),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (resposta.status === 201) {
      setTitle("");
      setDescription("");
      setStep("Para fazer");
      toast("Tarefa criada com sucesso!");
      props.quandoEnviaComSucesso();
    } else {
      toast(
        "Houve um erro desconhecido do submundo do mal supremo ao enviar a sua tarefa"
      );
    }

    toast("foi enviado!");
  }

  return (
    <div className="m-8">
      <Card>
        <h2 className="text-center text-2xl font-extrabold mb-2" style={{color: '#86B0CA'}}>
          Criar tarefa
        </h2>
        <form className="flex flex-col gap-2" onSubmit={quandoEnvia}>
          <input
            type="text"
            placeholder="Digite o título da tarefa"
            className="border-2 border-slate-700 rounded-lg p-2 outline-none"
            style={{'--focus-color': '#86B0CA'}}
            onFocus={(e) => e.target.style.borderColor = '#86B0CA'}
            onBlur={(e) => e.target.style.borderColor = '#334155'}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Digite a descrição da tarefa"
            className="border-2 border-slate-700 rounded-lg p-2 outline-none resize-none"
            onFocus={(e) => e.target.style.borderColor = '#86B0CA'}
            onBlur={(e) => e.target.style.borderColor = '#334155'}
          ></textarea>
          <div className="flex gap-4 justify-center">
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
          <button
            type="submit"
            className="p-3 rounded-2xl text-white font-extrabold uppercase text-lg shadow-xl hover:cursor-pointer"
            style={{backgroundColor: '#86B0CA'}}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#7AA3BD'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#86B0CA'}
          >
            Enviar
          </button>
        </form>
      </Card>
    </div>
  );
}
