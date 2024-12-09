import React from "react";
import Button from "./Button";
import { useNavigate } from "@tanstack/react-router";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen h-screen w-screen overflow-hidden text-black">
      <div className="flex-1 h-full bg-black flex-col justify-center items-center overflow-hidden relative hidden lg:flex">
        <div className="w-full h-full bg-[url('/tlo.jpg')] bg-center bg-cover blur-lg scale-110" />
      </div>
      <div className="flex-shrink-0 w-screen lg:w-1/3 min-w-[400px] h-full flex items-center justify-center bg-gray-50 p-10 flex-col">
        <h1 className="text-4xl font-bold p-10">Nie znaleziono strony</h1>
        <Button onClick={() => navigate({ to: "/" })}>Strona główna</Button>
      </div>
    </div>
  );
};
