import React from "react";
import SmallAvatar from "@/app/components/avatar/SmallAvatar";
import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";

export default function ChatBalloon() {
  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={0.5}
    >
      <SmallAvatar />
      <Box
        sx={{
          padding: 1,
          backgroundColor: "#FFFFFF",
          borderRadius: 3,
        }}
      >
        <Typography>Hello! How are you?</Typography>
      </Box>
    </Stack>
  );
}
