// mui imports
import React from "react";
import { ListSubheader, styled } from "@mui/material";

const ListSubheaderStyle = styled(ListSubheader)(({ theme }) => ({
  ...theme.typography.overline,
  fontWeight: "700",
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(0),
  color: theme.palette.text.primary,
  lineHeight: "26px",
  padding: "3px 12px",
}));

const NavGroup = ({ item }) => {
  return <ListSubheaderStyle>{item.subheader}</ListSubheaderStyle>;
};

export default NavGroup;
