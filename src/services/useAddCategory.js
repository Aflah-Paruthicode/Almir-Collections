import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { db } from "./firebase-config";

const useAddCategory = async (category,orderBy) => {

  try {
    const categoriesCollection = collection(db,"categories")
    const docrefs = query(categoriesCollection,where('orderBy','==',orderBy))
    const isDoc = await getDocs(docrefs)
    console.log('is empty : ',isDoc.empty)
    if (category.trim() !== "" && isDoc.empty) {
      await addDoc(categoriesCollection, {
        category: category,
        orderBy : orderBy
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export default useAddCategory;
