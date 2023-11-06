import React from "react";
import Menuitems, { ChildMenuItem, MenuItem } from "./MenuItems";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem/NavItem";
import NavGroup from "./NavGroup/NavGroup";
import { useAtomValue } from "jotai/index";
import { sidebarAtom } from "@/app/components/layout/Layout";
import { usePathname } from "next/navigation";

const SidebarItems = () => {
  const pathname = usePathname();
  const isSidebarOpen = useAtomValue(sidebarAtom);

  return (
    <Box sx={{ px: 3.5, paddingTop: 6 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems.map((item: MenuItem) => {
          if ("subheader" in item && item.subheader) {
            if (!isSidebarOpen) return null;
            return <NavGroup item={item} key={item.subheader} />;
          } else {
            const childMenuItem = item as ChildMenuItem;
            return (
              <NavItem
                item={childMenuItem}
                key={childMenuItem.id}
                pathDirect={pathname}
              />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
