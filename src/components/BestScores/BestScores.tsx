import React, { ReactElement } from "react";

export const BestScores = (props: any): ReactElement => {
  const getScoreArray = () => {
    const array: any = Object.values(props.data).sort((a: any, b: string) => +b[1] - +a[1]);
    array.length = 10;
    return array.map((el: any, index: number) => (
      <tr key={index}>
        <th>{index + 1}.</th>
        <th>{el[0]}</th>
        <th>{el[1]} pts</th>
      </tr>
    ));
  };
  return (
    <div className={"best-scores"}>
      <h3>Best scores</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>{getScoreArray()}</tbody>
      </table>
    </div>
  );
};
