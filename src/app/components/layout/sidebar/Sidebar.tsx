import React, { useEffect } from "react";
import { Box, Drawer, Typography } from "@mui/material";
import { useAtom, useAtomValue } from "jotai";
import SidebarItems from "./SidebarItems";
import { CollapseButton } from "./CollapseButton/CollapseButton";
import { sidebarAtom, sidebarWidthAtom } from "@/app/components/layout/Layout";
import BadgeAvatar from "@/app/components/layout/sidebar/Profile/BadgeAvatar";
import { Stack } from "@mui/system";
import SmallAvatar from "@/app/components/avatar/SmallAvatar";

interface Props {
  onSidebarClose: () => void;
}

const Sidebar = ({ onSidebarClose }: Props) => {
  const isSidebarOpen = useAtomValue(sidebarAtom);
  const [sidebarWidth, setSidebarWidth] = useAtom(sidebarWidthAtom);

  useEffect(() => {
    setSidebarWidth(isSidebarOpen ? 270 : 95);
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
      >
        <Box
          sx={{
            height: "100%",
          }}
        >
          {isSidebarOpen ? (
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ marginTop: 3 }}
            >
              <BadgeAvatar />
              <Typography variant="h3" sx={{ marginTop: 2.5 }}>
                홍영의
              </Typography>
              <Typography variant="subtitle2">Jungle Platform Labs</Typography>
            </Stack>
          ) : (
            <SmallAvatar />
          )}

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
