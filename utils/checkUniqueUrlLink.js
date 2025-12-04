import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const isUrlLinkUnique = async (urlLink) => {
  const q = query(
    collection(db, "verifications"),
    where("urlLink", "==", urlLink)
  );
  const snapshot = await getDocs(q);
  return snapshot.empty;
};
