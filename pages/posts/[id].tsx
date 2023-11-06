// "use client";
import TextInput from "@/app/components/input/TextInput";
import TitleIcon from "@mui/icons-material/Title";
import { ChangeEvent, useRef, useState } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
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
        {preview ? <img src={preview} /> : <img src={postData.imgUrl} />}
      </Box>
      <input ref={inputRef} type="file" hidden onChange={onChangeFile} />
      <Button
        sx={{
          marginTop: 2,
          marginLeft: 100,
          width: "auto",
          bgcolor: (theme) => theme.palette.primary,
        }}
        onClick={onClickModify}
      >
        수정
      </Button>
      <Button
        sx={{
          marginTop: 2,
          marginLeft: 100,
          width: "auto",
          bgcolor: (theme) => theme.palette.primary,
        }}
        onClick={onClickDelete}
      >
        삭제
      </Button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{ post: Post }> = async ({
  params,
}) => {
  const postData = await getPostData(params.id);

  return { props: { postData } };
};
