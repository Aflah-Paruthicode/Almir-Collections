import React from "react";
import { getDocs } from "firebase/firestore";

const useGetCategories = async (collection, setCate) => {
  try {
    const data = await getDocs(collection);
    const docs = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setCate(docs);
  } catch (err) {
    console.error(err);
  }
};

export default useGetCategories;
