"use client";

import React from "react";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { DndProvider } from "react-dnd-multi-backend";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return <DndProvider options={HTML5toTouch}>{children}</DndProvider>;
};

export default Provider;
