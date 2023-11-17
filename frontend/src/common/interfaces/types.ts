import { SxProps } from "@mui/material";
import { MouseEvent } from "react";

export type ButtonConfig = {
  title: string;
  action: (ev: MouseEvent<HTMLButtonElement>) => void;
  sx?: SxProps;
}