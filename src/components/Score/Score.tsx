import React, { ReactElement } from "react";

export const Score = ({ scoreTitle }: { scoreTitle: number }): ReactElement => <h3>Score: {scoreTitle}</h3>;
