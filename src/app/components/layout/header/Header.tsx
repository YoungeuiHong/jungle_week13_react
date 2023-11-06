import React from "react";

// jotai
import { useAtomValue } from "jotai";
import { sidebarAtom, sidebarWidthAtom } from "@/app/components/layout/Layout";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  AppBar,
  Box,
  IconButton,
  InputBase,
  Stack,
  Toolbar,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";

import { alpha, styled } from "@mui/system";
import { signOut } from "next-auth/react";
import Link from "next/link";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.grey["300"], 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.grey["300"], 0.25),
  },
  marginTop: theme.spacing(2),
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(3),
  width: "auto",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.5, 1.5, 1.5, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "60vw",
    },
  },
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  borderRadius: 20,
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 12,
  paddingRight: 12,
  fontSize: 14,
  textDecoration: "none",
  backgroundColor: "#DFE5EF",
  color: theme.palette.text.primary,
  "&:hover": {
    backgroundColor: "#f6b701",
    color: "#ffffff",
  },
}));

const Header = () => {
  const theme = useTheme();
  const isSidebarOpen = useAtomValue(sidebarAtom);
  const sidebarWidth = useAtomValue(sidebarWidthAtom);

  return (
    <AppBar
      enableColorOnDark
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        bgcolor: theme.palette.background.default,
        transition: isSidebarOpen ? theme.transitions.create("width") : "none",
        [theme.breakpoints.up("lg")]: {
          minHeight: "70px",
        },
      }}
    >
      <Toolbar>
        <Box
          sx={{
            width: sidebarWidth + 5,
            display: "flex",
            [theme.breakpoints.down("md")]: {
              width: "auto",
            },
          }}
        ></Box>
        <Box sx={{ flexGrow: 1 }} />
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <LinkStyled href="/upload">업로드</LinkStyled>
          <IconButton
            size="large"
            color="inherit"
            sx={{
              width: 35,
              height: 35,
              mt: 1,
              ...{
                color: "grey.400",
              },
            }}
          >
            <NotificationsIcon />
          </IconButton>
          <IconButton
            size="large"
            color="inherit"
            sx={{
              width: 35,
              height: 35,
              mt: 1,
              ...{
                color: "grey.400",
              },
            }}
            onClick={() => signOut()}
          >
            <LogoutIcon />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
