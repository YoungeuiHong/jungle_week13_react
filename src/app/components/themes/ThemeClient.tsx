"use client";

import { ThemeProvider } from "@mui/material";
import { themes } from "./DefaultColors";

export default function ThemeClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = themes();

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
