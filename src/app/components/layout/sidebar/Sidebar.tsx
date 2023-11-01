import React, { useEffect } from "react";
import { Box, Drawer } from "@mui/material";
import { useAtom, useAtomValue } from "jotai";
import Logo from "../logo/Logo";
import SidebarItems from "./SidebarItems";
import { CollapseButton } from "./CollapseButton/CollapseButton";
import { sidebarAtom, sidebarWidthAtom } from "@/app/components/layout/Layout";

interface Props {
  onSidebarClose: () => void;
}

const Sidebar = ({ onSidebarClose }: Props) => {
  const isSidebarOpen = useAtomValue(sidebarAtom);
  const [sidebarWidth, setSidebarWidth] = useAtom(sidebarWidthAtom);

  useEffect(() => {
    setSidebarWidth(isSidebarOpen ? 250 : 95);
  }, [isSidebarOpen]);

  return (
    <Box
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
      }}
    >
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        onClose={onSidebarClose}
        variant="permanent"
        PaperProps={{
          sx: {
            width: sidebarWidth,
            boxSizing: "border-box",
            overflowX: "hidden",
          },
        }}
        slotProps={{
          backdrop: {
            invisible: true,
          },
        }}
      >
        <Box
          sx={{
            height: "100%",
          }}
        >
          <Box px={3}>
            <Logo showName={isSidebarOpen} />
          </Box>
          <Box>
            <SidebarItems />
          </Box>
        </Box>
        <CollapseButton />
      </Drawer>
    </Box>
  );
};

export default Sidebar;
