"use client";

import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "@/lib/firebase/config";
import { GetServerSideProps } from "next";
import Link from "next/link";

export interface Post {
  id: string;
  title: string;
  imgUrl: string;
}

export default function Dashboard({ posts }) {
  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ marginTop: 8, padding: 4 }}
      >
        {posts.map((post: Post) => (
          <Grid key={post.id} item xs={3}>
            <Link href={`/posts/${post.id}`} style={{ textDecoration: "none" }}>
              <Card sx={{ maxWidth: 345, minHeight: "100%" }}>
                <CardActionArea>
                  <CardMedia component="img" height="250" image={post.imgUrl} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      #passion #highhope
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{ posts: Post[] }> = async (
  context,
) => {
  const querySnapshot = await getDocs(collection(db, "posts"));
  const posts: Post[] = [];
  querySnapshot.forEach((doc) => {
    const id = doc.id;
    posts.push({ id, ...doc.data() } as Post);
  });

  return { props: { posts } };
};
