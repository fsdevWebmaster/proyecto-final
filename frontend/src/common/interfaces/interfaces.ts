import { SxProps } from "@mui/material";

export interface IPageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  sx?: SxProps;
}
export interface IContainerFormProps {
  modalAction: (type: "error" | "success" | "info" | "warning", message?: string) => void;
}

// export interface IContainerFormProps {
//   modalAction: () => void;
// }