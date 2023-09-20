"use client";

import React from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
};

export default Provider;
