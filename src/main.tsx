// Importações de estilos CSS
import "./tailwind.css"; // Estilos do Tailwind CSS
import "react-simple-toasts/dist/style.css"; // Estilos base dos toasts
import "react-simple-toasts/dist/theme/dark.css"; // Tema escuro para os toasts

// Importações do React e componentes
import { createRoot } from "react-dom/client"; // Função para criar root do React 18
import App from "./App.tsx"; // Componente principal da aplicação
import toast, { toastConfig } from "react-simple-toasts"; // Biblioteca de notificações

// Configuração global dos toasts
toastConfig({ theme: "dark" }); // Define tema escuro para todas as notificações

// Criação e renderização da aplicação
// Encontra o elemento com id "root" no HTML e renderiza o componente App
createRoot(document.getElementById("root")!).render(<App />);
