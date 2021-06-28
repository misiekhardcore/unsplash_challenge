import React from "react";
import { Navbar } from "./Components/Navbar";
import { Photos } from "./Components/Photos";

export const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Photos />
    </>
  );
};
