import React, { useState } from "react";
import EndVoteModal from "./EndVoteModal";
import "./modal.css";
import Button from "./Button.tsx";
export default function Modal(props) {
  return (
    <>
      {props.isActive && (
        <div className="modal">
          <div onClick={props.onShow} className="overlay"></div>
          <div className="modal-content">
            {props.children}
            <div className="close-modal">
              <Button className="image close" onClick={props.onShow}></Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
