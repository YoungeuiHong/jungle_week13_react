"use client";

import { ThemeProvider } from "@mui/material";
import { themes } from "./DefaultColors";

export default function ThemeClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme={themes}>{children}</ThemeProvider>;
}
