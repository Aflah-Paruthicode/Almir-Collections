import { useEffect, useState } from "react";
import Auth from "./components/Auth";
import { db } from "./config/firebase-config";
import { getDocs, collection, addDoc } from "firebase/firestore";

function App() {
  const [products, setProducts] = useState([]);
  const [adminName, setAdminName] = useState('');
  const [brandName,setBrandName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');

  let productCollecRef = collection(db,'products');

  const getMovieList = async () => {
    try {
      const data = await getDocs(productCollecRef);
      const filteredProducts = data.docs.map((doc) => ({id:doc.id,...doc.data()}))
      console.log(filteredProducts);
      setProducts(filteredProducts);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    getMovieList();
  },[]);

  const onSubmitMovie = async () => {
    try {
      await addDoc(productCollecRef, {
        admin : adminName,
        brand : brandName,
        description : description,
        price : price
      })
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  }
  
  return (
    <div>
      <Auth />
      <hr />
      <div>
        <input type="text" name="adminName" placeholder="admin..." onChange={(e) => {
          setAdminName(e.target.value);
        }} />
        <input type="text" name="brandName" placeholder="brand..." onChange={(e) => {
          setBrandName(e.target.value);
        }} />
        <input type="text" name="descprtion" placeholder="description..." onChange={(e) => {
          setDescription(e.target.value);
        }} />
        <input type="number" name="price" placeholder="price..." onChange={(e) => {
          setPrice(Number(e.target.value));
        }} />
        <input type="submit" onClick={onSubmitMovie} value='add data' />
      </div>
      <div>
       {
        products.map((doc) => {
          return (
            <div key={doc.id}>
              <h1>{doc.admin}</h1>
              <h3>{doc.brand}</h3>
              <h1>{doc.price}</h1>
              <p>{doc.description}</p>
            </div>
            
          )
        })
       }
      </div>
    </div>
  )
}

export default App
