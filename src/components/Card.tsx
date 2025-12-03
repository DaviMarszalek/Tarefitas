// Define o tipo das propriedades que o componente Card recebe
type CardProps = {
  children: any; // Qualquer conteúdo React que será renderizado dentro do card
};

// Componente reutilizável que cria um cartão com estilo padrão
export function Card(props: CardProps) {
  return (
    // Container com fundo branco, padding, bordas arredondadas e sombra
    <div className="bg-white p-3 rounded-xl shadow-2xl">{props.children}</div>
  );
}
