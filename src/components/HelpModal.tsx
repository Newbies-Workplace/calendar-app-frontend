import React from "react";
import Button from "../components/Button";

interface HelpModalProps {
	onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => (
	<>
		<div>
			<h1 className="text-black">Pomoc....</h1>
		</div>

		<Button onClick={onClose}>Zamknij</Button>
	</>
);
