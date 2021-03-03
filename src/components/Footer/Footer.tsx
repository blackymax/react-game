import React, { ReactElement } from "react";

export const Footer = (): ReactElement => (
  <footer className="app-footer">
    <div className={"created-block"}>
      <h3>Created by &nbsp;</h3>
      <a href={"https://github.com/blackymax"}> blackymax </a>
      <h3>&nbsp;, 2021</h3>
    </div>
    <a href={"https://rs.school/js/"}>
      <img src="./assets/icons/rs_school_js.svg" alt="rs-school" />
    </a>
  </footer>
);
