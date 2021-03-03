import React, { ReactElement, useRef } from "react";

export const GameOverWindow = (props: any): ReactElement => {
  const name: any = useRef(undefined);

  const saveScore = (e: any) => {
    props.change(e, name.current);
  };

  return (
    <div className="game-over">
      <h3>Game over!</h3>
      <h5>Your score: {props.info}</h5>
      <label htmlFor="name">Enter your name:</label>
      <input type="text" ref={name} name="fname"></input>
      <input type="submit" value="Submit" onClick={saveScore}></input>
      <label htmlFor="name">to display in the best scores</label>
    </div>
  );
};
