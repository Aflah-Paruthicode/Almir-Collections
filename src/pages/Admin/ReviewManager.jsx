import React, { useState, useEffect, useRef } from "react";
import { db } from "../../services/firebase-config";
import { collection, deleteDoc, doc } from "firebase/firestore";
import useGetReviews from "../../services/useGetReviews";
import useAddNewReview from "../../services/useAddNewReview";
import { confirmAlert, warningAlert } from "../../services/alerts";

const ReviewManager = () => {
  const [reviewPic, setReviewPic] = useState();
  const [reviewerName, setRviewerName] = useState("");
  const [reviews, setReviews] = useState([]);
  const reviewToEmpty = useRef(null);
  const reviewCollection = collection(db, "reviews");

  useEffect(() => {
    useGetReviews(reviewCollection, setReviews);
  }, []);

  const handleGetReviews = async () => {
    if (reviewPic && reviewerName.trim() !== "") {
      await useAddNewReview(reviewPic, reviewerName, reviewCollection);
      setReviewPic("");
      setRviewerName("");
      reviewToEmpty.current.value = "";
      useGetReviews(reviewCollection, setReviews);
    } else {
      warningAlert();
    }
  };

  const handleReviewDelete = async (id) => {
    if (await confirmAlert()) {
      await deleteDoc(doc(db, "reviews", id));
      useGetReviews(reviewCollection, setReviews);
    }
  };

  return (
    <section className="w-[70%] mx-auto text-[#bababa] py-14 max-sm:w-full max-sm:px-5">
      <h1 className="text-2xl font-bold py-10">Reviews ({reviews.length})</h1>
      <div className="grid grid-cols-3 gap-4 my-4 p-6 rounded-2xl bg-[#141414] max-sm:grid-cols-1">
        <input className="w-full bg-[#343434] p-3 rounded-lg" type="file" ref={reviewToEmpty} onChange={(e) => setReviewPic(e.target.files)} />
        <input
          className="w-full bg-[#343434] p-3 rounded-lg"
          value={reviewerName}
          type="text"
          onChange={(e) => setRviewerName(e.target.value)}
          placeholder="Reviewer Name"
        />
        <button onClick={handleGetReviews} className="bg-[#bfa14a] p-3 rounded-lg text-white">
          Add Review
        </button>
      </div>
      <div className="flex gap-2 overflow-x-scroll bg-[#141414] p-10 rounded-2xl w-full">
        {reviews.map((review) => (
          <div key={review.id} className="flex-shrink-0 w-[15rem] text-center">
            <p>{review.customerName}</p>
            <img className="w-full rounded-lg" src={review.reviewImage} alt="" />
            <button onClick={() => handleReviewDelete(review.id)} className="bg-red-800 px-4 py-2 mt-2 rounded-xl">
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewManager;
