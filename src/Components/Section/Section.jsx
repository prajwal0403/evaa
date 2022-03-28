import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { BookCard } from "../BookCard/BookCard";
import { SortAndFilterButtons } from "../SortAndFilterButtons/SortAndFilterButtons";
import styled from "styled-components";

export const Section = () => {
  // you will receive section name from URL here.
  // Get books for only this section and show
  //   Everything else is same as Home page
  const { name } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    axios.get("http://localhost:8080/books").then((res) => {
      setData(res.data);
    });
  };
  const sorting = (order) => {
    if (order === "tA") {
      const d1 = data.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
      });
      setData([...d1]);
    } else if (order === "tD") {
      const d1 = data.sort((a, b) => {
        if (a.title > b.title) {
          return -1;
        }
      });
      setData([...d1]);
    } else if (order === "pA") {
      const d1 = data.sort((a, b) => {
        return a.price - b.price;
      });
      setData([...d1]);
    } else if (order === "pD") {
      const d1 = data.sort((a, b) => {
        return b.price - a.price;
      });
      setData([...d1]);
    }
  };

  const Main = styled.div`
    /* Same as Homepage */

    display: grid;
    grid-template-columns: repeat(4, 250px);
    grid-gap: 20px;
  `;

  return (
    <>
      <h2 style={{ textAlign: "center" }}>{name}</h2>
      <SortAndFilterButtons handleSort={sorting} />

      <Main className="sectionContainer">
        {/* SHow same BookCard component here, just like homepage but with books only belong to this Section */}

        {data
          .filter((res) => res.section == name)
          .map((el) => (
            <BookCard {...el} />
          ))}
      </Main>
    </>
  );
};
