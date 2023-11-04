import React, { useState } from "react";
import { Avatar, Box, IconButton } from "@mui/material";

const SmallAvatar = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src="/assets/user-1.jpg"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
    </Box>
  );
};

export default SmallAvatar;
