import React from "react";
import "./modal.css";
import Button from "./Button";

interface ModalProps {
	children: React.ReactNode;
	onDismiss: () => void;
}

export const Modal: React.FC<ModalProps> = (props) => (
	<div className="modal">
		<div onClick={props.onDismiss} className="overlay" />
		<div className="modal-content">
			{props.children}
			<div className="close-modal">
				<Button className="image close" onClick={props.onDismiss}>
					x
				</Button>
			</div>
		</div>
	</div>
);
