import React, { ReactElement } from "react";

export const Header = ({ title }: { title: string }): ReactElement => (
  <header className="app-header">
    <h1>{title}</h1>
  </header>
);
