import React from "react";
import { useAtom } from "jotai";
import { Box, Button, IconButton, styled } from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { sidebarAtom } from "@/app/components/layout/Layout";

const CollapseButtonStyled = styled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: "none",
  padding: "12px 12px",
  borderRadius: "8px",
  whiteSpace: "nowrap",
  paddingLeft: "10px",
  backgroundColor: theme.palette.grey["100"],
  "&:hover": {
    backgroundColor: theme.palette.grey["100"],
    color: theme.palette.grey["600"],
  },
  width: "100%",
  justifyContent: "flex-start",
}));

const OpenButtonStyled = styled(IconButton)(({ theme }) => ({
  padding: "12px 12px",
  borderRadius: "8px",
  whiteSpace: "nowrap",
  paddingLeft: "10px",
  backgroundColor: theme.palette.grey["100"],
  "&:hover": {
    backgroundColor: theme.palette.grey["100"],
    color: theme.palette.grey["600"],
  },
  width: "100%",
}));

export const CollapseButton = () => {
  const [isSidebarOpen, setSidebarOpen] = useAtom(sidebarAtom);

  const onClickCollapse = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box sx={{ px: 3, mb: 5 }}>
      {isSidebarOpen ? (
        <CollapseButtonStyled
          onClick={onClickCollapse}
          startIcon={
            <KeyboardDoubleArrowLeftIcon
              sx={{
                minWidth: "36px",
                p: "3px 0",
                color: "inherit",
              }}
            />
          }
        >
          사이드바 닫기
        </CollapseButtonStyled>
      ) : (
        <OpenButtonStyled onClick={onClickCollapse}>
          <KeyboardDoubleArrowRightIcon />
        </OpenButtonStyled>
      )}
    </Box>
  );
};
