import { collection, doc, getDoc, getDocs } from "@firebase/firestore";
import { db, fireStore } from "@/lib/firebase/config";

export const getAllPostIds = async () => {
  const snapshot = await getDocs(collection(db, "posts"));
  const paths = snapshot.docs.map((doc) => {
    return {
      params: { id: doc.id },
    };
  });
  return paths;
};

export const getPostData = async (postId: string) => {
  const docRef = doc(collection(fireStore, "posts"), postId);
  const retrieved = await getDoc(docRef);
  const id = retrieved.id;
  return { id, ...retrieved.data() };
};
