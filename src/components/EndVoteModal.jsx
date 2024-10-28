import React, { useState } from "react";
export default function EndVoteModal(props) {
  return (
    <>
      <br></br>
      <h1>Czy na pewno chcesz zakończyć głosowanie?</h1>
      <br />
      <div className="flex justify-center gap-2.5 text-white">
        <Button className="main">Tak</Button>
        <Button className="main" onClick={props.onClick}>
          Nie
        </Button>
      </div>
    </>
  );
}
