import React, { useEffect, useState } from "react";
import ReusableCard from "../reusables/Cards";
import axios from "axios";

const Products = () => {
  const [dummyData, setdummyData] = useState([]);
  const getData = () => {
    axios.get("http://localhost:8080/api/v1/users/all-products").then((res) => {
      console.log("xxxxxxxxxxxxxx",res.data.products);
      setdummyData(res.data.products);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div
      style={{
        padding: "5px",
        margin: "5px",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {dummyData?.map((item) => (
        <ReusableCard
        products={item}
        />
      ))}
    </div>
  );
};

export default Products;
