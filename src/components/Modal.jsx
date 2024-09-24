import React, { useState } from "react";
import "./button.css";
import "./modal.css";
export default function Modal(props) {
  return (
    <>
      {props.isActive && (
        <div className="modal">
          <div onClick={props.onShow} className="overlay"></div>
          <div className="modal-content">
            {props.children}

            <button className="close-modal" onClick={props.onShow}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
