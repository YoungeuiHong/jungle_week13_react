import React from "react";

// jotai
import { useAtomValue } from "jotai";
import { sidebarAtom, sidebarWidthAtom } from "@/app/components/layout/Layout";

// material-ui
import { useTheme } from "@mui/material/styles";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

import Profile from "./Profile";

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
        <Box>
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
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Profile />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
