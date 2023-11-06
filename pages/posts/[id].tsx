// "use client";
import TextInput from "@/app/components/input/TextInput";
import TitleIcon from "@mui/icons-material/Title";
import { ChangeEvent, useRef, useState } from "react";
import { Box } from "@mui/system";
import { Button, Grid, Stack } from "@mui/material";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { firebaseStorage, fireStore } from "@/lib/firebase/config";
import { deleteDoc, doc, DocumentData, updateDoc } from "@firebase/firestore";
import { getPostData } from "@/lib/firebase/firestore";
import { GetServerSideProps } from "next";

export interface Post {
  id: string;
  title: string;
  imgUrl: string;
}

export default function Upload({ postData }) {
  const [title, setTitle] = useState<string>(postData.title);
  const [uploadedFile, setUploadedFile] = useState<File | undefined>(undefined);
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onClickBox = () => {
    if (inputRef != null && inputRef.current != null) {
      inputRef.current!.click();
    }
  };

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const files: File[] = Array.from(event.target.files);
    if (files.length > 0) {
      setUploadedFile(files[0]);
      setPreview(URL.createObjectURL(files[0]));
    }
  };

  const onClickModify = async () => {
    // 수정할 Document의 Reference
    const docRef = doc(fireStore, "posts", postData.id);

    if (uploadedFile) {
      // 파일이 수정된 경우
      // Create a reference to uploaded file
      const storageRef = ref(firebaseStorage, uploadedFile?.name);

      uploadBytesResumable(storageRef, uploadedFile!).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          await updateDoc(docRef, {
            title: title,
            imgUrl: url,
          } as DocumentData);
        });
      });
    } else {
      await updateDoc(docRef, {
        title: title,
      } as DocumentData);
    }
  };

  const onClickDelete = async () => {
    const docRef = doc(fireStore, "posts", postData.id);
    await deleteDoc(docRef);
  };

  return (
    <Grid container style={{ marginTop: 100, marginLeft: 5 }}>
      <Grid item xs={12}>
        <TextInput
          placeholder={"제목을 입력하세요"}
          icon={<TitleIcon />}
          width={"40vw"}
          value={title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(event.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            width: "auto",
            height: "50vh",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 2,
            marginLeft: 3,
            marginRight: 2,
            borderRadius: 2,
            backgroundColor: "#FFFFFF",
          }}
          onClick={onClickBox}
        >
          {preview ? (
            <img
              src={preview}
              style={{ maxHeight: "100%", maxWidth: "100%" }}
            />
          ) : (
            <img
              src={postData.imgUrl}
              style={{ maxHeight: "100%", maxWidth: "100%" }}
            />
          )}
        </Box>
        <input ref={inputRef} type="file" hidden onChange={onChangeFile} />
      </Grid>
      <Grid item xs={12}>
        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{ marginLeft: 4, marginRight: 3, marginTop: 2 }}
        >
          <Button
            sx={{
              marginTop: 2,
              marginRight: 3,
              width: "auto",
              px: 5,
              py: 1,
              borderRadius: 2,
              backgroundColor: (theme) => theme.palette.grey["400"],
              "&.MuiButton-text": {
                color: "#FFFFFF",
                fontWeight: 700,
              },
            }}
            style={{
              fontColor: "#FFFFFF",
              backgroundColor: "#7C8FAC",
              boxShadow: "none",
            }}
            onClick={onClickDelete}
          >
            삭 제
          </Button>
          <Button
            sx={{
              marginTop: 2,
              marginRight: 3,
              width: "auto",
              px: 5,
              py: 1,
              borderRadius: 2,
              "&.MuiButton-text": {
                color: "#FFFFFF",
                fontWeight: 700,
              },
            }}
            style={{
              fontColor: "#FFFFFF",
              backgroundColor: "#f6b701",
            }}
            onClick={onClickModify}
          >
            수 정
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}

export const getServerSideProps: GetServerSideProps<{ post: Post }> = async ({
  params,
}) => {
  const postData = await getPostData(params.id);

  return { props: { postData } };
};
