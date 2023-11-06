// "use client";
import TextInput from "@/app/components/input/TextInput";
import TitleIcon from "@mui/icons-material/Title";
import { ChangeEvent, useRef, useState } from "react";
import { Box } from "@mui/system";
import { Backdrop, Button, Grid, Stack } from "@mui/material";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { firebaseStorage, fireStore } from "@/lib/firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  updateDoc,
} from "@firebase/firestore";
import { getPostData } from "@/lib/firebase/firestore";
import { GetServerSideProps } from "next";
import CircularProgressWithLabel from "@/app/components/progress/CircularProgressWithLabel";
import { useRouter } from "next/navigation";

export interface Post {
  id: string;
  title: string;
  imgUrl: string;
}

export default function Upload({ postData }) {
  /* state */
  const [title, setTitle] = useState<string>(postData.title);
  const [uploadedFile, setUploadedFile] = useState<File | undefined>(undefined);
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [backdropOpen, setBackdropOpen] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  /* ref */
  const inputRef = useRef<HTMLInputElement | null>(null);

  /* router */
  const router = useRouter();

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

      const uploadTask = uploadBytesResumable(storageRef, uploadedFile!);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          setBackdropOpen(true);
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(collection(fireStore, "posts"), {
              title: title,
              imgUrl: downloadURL,
            } as DocumentData).then(() => {
              router.push("/dashboard");
            });
          });
        },
      );
    } else {
      await updateDoc(docRef, {
        title: title,
      } as DocumentData).then(() => {
        router.push("/dashboard");
      });
    }
  };

  const onClickDelete = async () => {
    const docRef = doc(fireStore, "posts", postData.id);
    await deleteDoc(docRef).then(() => {
      router.push("/dashboard");
    });
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
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={backdropOpen}
        style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
        onClick={() => setBackdropOpen(false)}
      >
        <CircularProgressWithLabel value={progress} size={"10rem"} />
      </Backdrop>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{ post: Post }> = async ({
  params,
}) => {
  const postData = await getPostData(params.id);

  return { props: { postData } };
};
