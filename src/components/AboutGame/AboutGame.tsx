import React, { ReactElement } from "react";

export const AboutGame = (): ReactElement => (
  <div className="app-about-game">
    <div className="app-about-game-modal">
      <h3>Controls</h3>
      <h5>5 HOTKEYS</h5>
      <div className="app-hotkeys-info">
        <div className="left">
          <div>←</div>
          <p>move left</p>
        </div>
        <div className="top">
          <div>↑</div>
          <p>move top</p>
        </div>
        <div className="right">
          <div>→</div>
          <p>move right</p>
        </div>
        <div className="down">
          <div>↓</div>
          <p>move down</p>
        </div>
        <div className="esc">
          <div>Esc</div>
          <p>pause</p>
        </div>
      </div>
    </div>
  </div>
);
