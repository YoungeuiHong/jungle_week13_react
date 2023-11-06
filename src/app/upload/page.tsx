"use client";
import TextInput from "@/app/components/input/TextInput";
import TitleIcon from "@mui/icons-material/Title";
import { ChangeEvent, useRef, useState } from "react";
import { Box } from "@mui/system";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, Typography } from "@mui/material";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { firebaseStorage, fireStore } from "@/lib/firebase/config";
import { addDoc, collection, DocumentData } from "@firebase/firestore";

export default function Upload() {
  const [title, setTitle] = useState<string>("");
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

  const onClickUpload = () => {
    if (!uploadedFile) {
      return;
    }

    // Create a reference to uploaded file
    const storageRef = ref(firebaseStorage, uploadedFile?.name);

    uploadBytesResumable(storageRef, uploadedFile!).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        await addDoc(collection(fireStore, "posts"), {
          title: title,
          imgUrl: url,
        } as DocumentData);
      });
    });
  };

  return (
    <div style={{ marginTop: 100, marginLeft: 5 }}>
      <TextInput
        placeholder={"제목을 입력하세요"}
        icon={<TitleIcon />}
        width={"40vw"}
        value={title}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(event.target.value);
        }}
      />

      {preview ? (
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
          }}
          onClick={onClickBox}
        >
          <img src={preview} />
        </Box>
      ) : (
        <>
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
              bgcolor: "grey.300",
              "&:hover": {
                bgcolor: "grey.400",
              },
            }}
            onClick={onClickBox}
          >
            <CloudUploadIcon sx={{ marginRight: 2 }} />
            <Typography>이미지 파일을 업로드하세요</Typography>
          </Box>
        </>
      )}
      <input ref={inputRef} type="file" hidden onChange={onChangeFile} />
      <Button
        sx={{
          marginTop: 2,
          marginLeft: 100,
          width: "auto",
          bgcolor: (theme) => theme.palette.primary,
        }}
        onClick={onClickUpload}
      >
        업로드
      </Button>
    </div>
  );
}
