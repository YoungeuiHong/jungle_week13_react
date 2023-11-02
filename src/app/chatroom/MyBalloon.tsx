import React from "react";
import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";

export default function MyBalloon() {
  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      spacing={0.5}
    >
      <Box
        sx={{
          padding: 1,
          backgroundColor: "#fcd877",
          borderRadius: 3,
        }}
      >
        <Typography>haha</Typography>
      </Box>
    </Stack>
  );
}
