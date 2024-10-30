import Button from '../components/Button.tsx';

export default function HelpModal(props) {
  return (
    <>
      <br />
      <br />
      <div>
      <h1 style={{color: 'black'}}>Pomoc</h1>
      <h2 style={{color: 'black'}}>Tekst pomocy. Jak potrzebujesz pomocy to tu się wyświetla</h2>
      <h3 style={{color: 'black'}}>Tutaj więcej tekstu</h3>
      <h4 style={{color: 'black'}}>Jeszcze więcej wyjaśnień</h4>
      <div className="text-left" style={{color: "black"}}></div>
      </div>
      <Button onClick={props.onClose}>Zamknij</Button>
    </>
  );
}