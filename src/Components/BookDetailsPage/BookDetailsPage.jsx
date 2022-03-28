import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
export const BookDetailsPage = () => {
  // Get book details based on ID whenever user lands on the page
  // ID will come from route
  const { id } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/books/${id}`)
      .then((res) => setData(res.data));
  }, []);
  console.log(id);
  return (
    <>
      <div className="bookContainer">
        <h2 className="title">{data.title}</h2>
        <img className="image" src={data.imageUrl} alt="#" />
        <div className="author">{data.author}</div>
        <div className="description">{data.description}</div>
        <div className="price">{data.price}</div>
        <div className="section">{data.section}</div>
        <div className="isbnNumber">{data.isbnNumber}</div>
        <ul className="reviews">
          {/* Reviews will be an array, iterate over them and create a new <li> for every review */}
          {/* {data.reviews.map((el) => (
            <li>{el}</li>
          ))} */}
          <li>{data.reviews}</li>
        </ul>
      </div>
    </>
  );
};
