import React, { useState } from "react";
import "./button.css";
export default function EndVoteModal(props) {
  return (
    <>
      <br></br>
      <h1>Czy na pewno chcesz zakończyć głosowanie?</h1>
      <br />
      <div className="flex justify-center gap-2.5 text-white">
        <button className="main">Tak</button>
        <button className="main" onClick={props.onClick}>
          Nie
        </button>
      </div>
    </>
  );
}
