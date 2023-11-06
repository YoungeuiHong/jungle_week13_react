"use client";
import TextInput from "@/app/components/input/TextInput";
import TitleIcon from "@mui/icons-material/Title";
import { ChangeEvent, useRef, useState } from "react";
import { Box } from "@mui/system";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Alert,
  Button,
  Grid,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { firebaseStorage, fireStore } from "@/lib/firebase/config";
import { addDoc, collection, DocumentData } from "@firebase/firestore";

export default function Upload() {
  const [title, setTitle] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | undefined>(undefined);
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");

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
    if (!title) {
      setErrMsg("제목을 입력해주세요");
      setToastOpen(true);
      return;
    }
    if (!uploadedFile) {
      setErrMsg("파일을 업로드해주세요.");
      setToastOpen(true);
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

    setToastOpen(false);
  };

  return (
    <>
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
                backgroundColor: "#FFFFFF",
              }}
              onClick={onClickBox}
            >
              <img
                src={preview}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
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
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="flex-end">
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
                backgroundImage: `linear-gradient(to right, #f6d365 0%, #fda085 51%, #f6d365 100%)`,
              }}
              onClick={onClickUpload}
            >
              업 로 드
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        sx={{ marginBottom: 15, marginLeft: 35 }}
      >
        <Alert
          variant="filled"
          severity="error"
          sx={{
            backgroundColor: "#ffbd02",
            px: 2,
          }}
        >
          {errMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
