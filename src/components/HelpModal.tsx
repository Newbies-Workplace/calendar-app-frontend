import React from "react";
import Button from "../components/Button";

export const HelpModal = (props) => (
	<>
		<br />
		<br />
		<div>
			<h1 className="text-black">Pomoc....</h1>
		</div>

		<Button onClick={props.onClose}>Zamknij</Button>
	</>
);
