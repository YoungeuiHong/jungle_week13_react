import React from "react";
import Link from "next/link";
import { styled, Typography } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  paddingTop: 20,
  paddingBottom: 20,
  paddingLeft: 5,
  height: "70px",
  width: "200px",
  overflow: "hidden",
  display: "block",
}));

interface Props {
  showName: boolean;
}

const Logo = ({ showName }: Props) => {
  return (
    <LinkStyled href="/">
      {showName ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image src="/chick-logo.svg" width={40} height={40} alt="logo" />
          <Typography variant="h3" component="h2" sx={{ marginLeft: 1 }}>
            Jungle Talk
          </Typography>
        </div>
      ) : (
        <Image src="/chick-logo.svg" width={40} height={40} alt="logo" />
      )}
    </LinkStyled>
  );
};

export default Logo;
