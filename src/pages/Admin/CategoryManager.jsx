import React, { useState, useEffect } from "react";
import { db } from "../../services/firebase-config";
import { collection } from "firebase/firestore";
import useAddCategory from "../../services/useAddCategory";
import useGetCategories from "../../services/useGetCategories";
import useDeleteDoc from "../../services/useDeleteDoc";

const CategoryManager = ({ products }) => {
  const [newCategory, setNewCategory] = useState("");
  const [newOrderBy, setNewOrderBy] = useState(1);
  const [categories, setCategories] = useState([]);
  const categoriesCollection = collection(db, "categories");

  useEffect(() => {
    useGetCategories(categoriesCollection, setCategories);
  }, []);

  const handleCategory = () => {
    useAddCategory(newCategory, newOrderBy);
    setNewCategory("");
    setNewOrderBy(1);
  };

  return (
    <section className="w-[70%] text-[#bababa] mx-auto max-sm:w-full max-sm:px-5">
      <h1 className="text-2xl font-bold py-10 max-sm:text-xl">Add New Category</h1>
      <div className="grid grid-cols-3 gap-4 my-4 p-6 rounded-2xl bg-[#141414] max-sm:grid-cols-1">
        <input
          className="w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg"
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Category..."
        />
        <select className="w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg" value={newOrderBy} onChange={(e) => setNewOrderBy(e.target.value)}>
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <button onClick={handleCategory} className="bg-gradient-to-br from-[#bfa14a] via-[#7f7124] to-[#bfa14a] px-6 py-3 rounded-lg text-white font-medium">
          Add Category
        </button>
      </div>

      <div className="bg-[#141414] text-[#bababa] p-5 rounded-lg w-fit m-auto max-sm:w-full">
        <table className="table-fixed mx-auto">
          <thead>
            <tr className="bg-[#151515]">
              <th className="p-2">Category ({categories.length})</th>
              <th className="p-2">Order No</th>
              <th className="p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((element, inx) => {
              const productsInThisCate = products.filter((el) => el.category === element.category.toLowerCase()).length;
              return (
                <tr key={inx}>
                  <td className="p-2">
                    {element.category} ({productsInThisCate})
                  </td>
                  <td className="p-2">{element.orderBy}</td>
                  <td className="p-2">
                    <button className="bg-red-900 px-2 py-1 rounded" onClick={() => useDeleteDoc(element.id, categoriesCollection, false)}>
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CategoryManager;
