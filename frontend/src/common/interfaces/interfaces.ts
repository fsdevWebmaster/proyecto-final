import { SxProps } from "@mui/material";

export interface IPageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  sx?: SxProps;
}