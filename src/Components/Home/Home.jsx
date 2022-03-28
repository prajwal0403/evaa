import { BookCard } from "../BookCard/BookCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { SortAndFilterButtons } from "../SortAndFilterButtons/SortAndFilterButtons";
import styled from "styled-components";
export const Home = () => {
  // get all books when user lands on the page
  // populate them as mentioned below
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/books")
      .then((res) => setAllData(res.data));
  }, []);
  const sorting = (order) => {
    if (order === "tA") {
      const d1 = allData.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
      });
      setAllData([...d1]);
    } else if (order === "tD") {
      const d1 = allData.sort((a, b) => {
        if (a.title > b.title) {
          return -1;
        }
      });
      setAllData([...d1]);
    } else if (order === "pA") {
      const d1 = allData.sort((a, b) => {
        return a.price - b.price;
      });
      setAllData([...d1]);
    } else if (order === "pD") {
      const d1 = allData.sort((a, b) => {
        return b.price - a.price;
      });
      setAllData([...d1]);
    }
  };
  const Main = styled.div`
    /* Apply some responsive styling to children */
    display: grid;
    grid-template-columns: repeat(4, 250px);
    grid-gap: 20px;
  `;

  return (
    <div className="homeContainer">
      <h2 style={{ textAlign: "center" }}>Home</h2>
      <SortAndFilterButtons handleSort={sorting} />

      <Main className="mainContainer">
        {/* 
            Iterate over books that you get from network
            populate a <BookCard /> component
            pass down books id, imageUrl, title, price and anything else that you want to 
            show in books Card.
        */}
        {allData.map((el) => {
          return <BookCard {...el} />;
        })}
      </Main>
    </div>
  );
};
