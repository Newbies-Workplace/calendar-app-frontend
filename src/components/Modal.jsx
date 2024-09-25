import React, { useState } from "react";
import EndVoteModal from "./EndVoteModal";
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
            <div className="close-modal">
              <button className="main" onClick={props.onShow}>
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
