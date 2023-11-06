"use client";

import React from "react";

// material-ui
import { InputBase } from "@mui/material";
import { styled } from "@mui/system";

const InputWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#FFFFFF",
  // "&:hover": {
  //   backgroundColor: alpha(theme.palette.grey["300"], 0.25),
  // },
  marginTop: theme.spacing(2),
  marginRight: theme.spacing(2),
  // marginLeft: theme.spacing(3),
  width: "auto",

  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const IconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme, width }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.5, 1.5, 1.5, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: width,
    },
  },
}));

export interface TextInputParam {
  placeholder: string;
  icon: React.ReactNode;
  width: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({
  placeholder,
  icon,
  width,
  value,
  onChange,
}: TextInputParam) {
  return (
    <InputWrapper>
      <IconWrapper>{icon}</IconWrapper>
      <StyledInputBase
        placeholder={placeholder}
        width={width}
        value={value}
        onChange={onChange}
      />
    </InputWrapper>
  );
}
