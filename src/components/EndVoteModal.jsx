import React, { useState } from "react";
import Button from "./Button.tsx";
export default function EndVoteModal(props) {
  return (
    <>
      <br></br>
      <h1 className="text-left text-4xl text-black">Czy na pewno chcesz zakończyć głosowanie?</h1>
      <br />
      <hr className="flex-grow border-t-2 border-gray-400 rounded-full" />
      <br />
      <div className="flex justify-end gap-2.5 text-white">
        <Button className="main">Wróć</Button>
        <Button className="main" onClick={props.onClick}>
          Zakończ
        </Button>
      </div>
    </>
  );
}
