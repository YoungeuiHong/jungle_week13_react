"use client";

import React from "react";
import { Box, styled, useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "./sidebar/Sidebar";
import { atom, useAtom } from "jotai/index";
import { StyledComponentProps } from "@mui/system";
import Header from "./header/Header";

export const sidebarAtom = atom<boolean>(true);
export const sidebarWidthAtom = atom<number>(270);

const drawerWidth = 270;

const MainWrapper = styled("div")(() => ({
  display: "flex",
  width: "100%",
}));

type PageWrapperProps = {
  isSidebarOpen?: boolean;
} & StyledComponentProps;

const PageWrapper = styled("main", {
  shouldForwardProp: (prop) => prop !== "isSidebarOpen",
})<PageWrapperProps>(({ theme, isSidebarOpen }) => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  transition: theme.transitions.create(
    "margin",
    isSidebarOpen
      ? {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }
      : {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        },
  ),
  [theme.breakpoints.up("md")]: {
    marginLeft: 0,
    width: `calc(100% - ${drawerWidth}px)`,
  },
  [theme.breakpoints.down("md")]: {
    marginLeft: "20px",
    width: `calc(100% - ${drawerWidth}px)`,
    padding: "16px",
  },
  [theme.breakpoints.down("sm")]: {
    marginLeft: "10px",
    width: `calc(100% - ${drawerWidth}px)`,
    padding: "16px",
    marginRight: "10px",
  },
}));

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const [isSidebarOpen, setSidebarOpen] = useAtom(sidebarAtom);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const onSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <MainWrapper className="mainwrapper">
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}
      <Header />
      <Sidebar onSidebarClose={onSidebarClose} />
      {/* ------------------------------------------- */}
      {/* PageWrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper
        theme={theme}
        isSidebarOpen={isSidebarOpen}
        sx={{ margin: "auto" }}
      >
        {/* ------------------------------------------- */}
        {/* Page Route */}
        {/* ------------------------------------------- */}
        <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
          {/*TODO*/}
          {children}
        </Box>
        {/* ------------------------------------------- */}
        {/* End Page */}
        {/* ------------------------------------------- */}
        {/*</Container>*/}
      </PageWrapper>
    </MainWrapper>
  );
};
