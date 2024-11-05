import Button from '../components/Button.tsx';

export default function HelpModal(props) {
  return (
    <>
      <br />
      <br />
      <div>
  <h1 className="text-black">Pomoc....</h1>
  className="text-black text-left"
</div>

      <Button onClick={props.onClose}>Zamknij</Button>
    </>
  );
}