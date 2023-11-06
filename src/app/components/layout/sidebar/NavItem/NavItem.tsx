import React from "react";
// mui imports
import Icon from "@mui/material/Icon";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Theme,
  Tooltip,
  useTheme,
} from "@mui/material";
// jotai
import { useAtomValue } from "jotai";
import { sidebarAtom } from "@/app/components/layout/Layout";
// next js
import Link from "next/link";
// project
import { ChildMenuItem } from "@/app/components/layout/sidebar/MenuItems";

interface NavItemProps {
  item: ChildMenuItem;
  level?: number;
  pathDirect?: any;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  item,
  level = 1,
  pathDirect,
  onClick,
}) => {
  const theme = useTheme<Theme>();
  const isSidebarOpen = useAtomValue(sidebarAtom);

  const ListItemStyled = styled(ListItemButton)(() => ({
    whiteSpace: "nowrap",
    marginBottom: "2px",
    padding: "8px 10px",
    borderRadius: "8px",
    backgroundColor: level > 1 ? "transparent !important" : "inherit",
    color: theme.palette.text.secondary,
    paddingLeft: "10px",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.main,
    },
    "&.Mui-selected": {
      color: "#fff",
      backgroundColor: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: "white",
      },
    },
  }));

  const NavLinkStyled = styled(Link)(() => ({
    color: theme.palette.text.secondary,
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.primary.main,
    },
    "&.active": {
      color: "white",
      "&:hover": {
        color: "white",
      },
    },
  }));

  return (
    <List component="li" disablePadding key={item.id}>
      <NavLinkStyled href={item.href} style={{ textDecoration: "none" }}>
        {isSidebarOpen ? (
          <ListItemStyled
            disabled={item.disabled}
            selected={pathDirect === item.href}
            onClick={onClick}
          >
            <ListItemIcon
              sx={{
                minWidth: "36px",
                p: "3px 0",
                color: "inherit",
              }}
            >
              <Icon>{item.icon}</Icon>
            </ListItemIcon>
            <ListItemText>{item.title}</ListItemText>
          </ListItemStyled>
        ) : (
          <Tooltip title={item.title} placement="right">
            <ListItemStyled
              disabled={item.disabled}
              selected={pathDirect === item.href}
              onClick={onClick}
            >
              <ListItemIcon
                sx={{
                  minWidth: "36px",
                  p: "3px 0",
                  color: "inherit",
                }}
              >
                <Icon>{item.icon}</Icon>
              </ListItemIcon>
            </ListItemStyled>
          </Tooltip>
        )}
      </NavLinkStyled>
    </List>
  );
};

export default NavItem;
