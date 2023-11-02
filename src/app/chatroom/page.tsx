"use client";

import React from "react";
import ChatBalloon from "@/app/chatroom/ChatBalloon";
import MyBalloon from "@/app/chatroom/MyBalloon";
import { Grid } from "@mui/material";
import ChatList from "@/app/chatroom/ChatList";

export default function ChatRoom() {
  return (
    <div style={{ marginTop: 90, marginLeft: 20 }}>
      <Grid container direction="row" spacing={3}>
        <Grid item xs={5}>
          <ChatList />
        </Grid>
        <Grid item xs={7} sx={{ px: 5 }}>
          <ChatBalloon />
          <ChatBalloon />
          <ChatBalloon />
          <MyBalloon />
        </Grid>
      </Grid>
    </div>
  );
}
