type CardProps = {
  children: any;
};

export function Card(props: CardProps) {
  return (
    <div className="bg-white p-3 rounded-xl shadow-2xl">{props.children}</div>
  );
}
