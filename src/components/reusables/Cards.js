import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import axios from 'axios';

const ReusableCard = ({ products }) => {
  const { _id, name, price, image } = products;
  console.log("cardImage",image);
  const [imageUrl, setImageUrl] = useState("");
  const [userId,setUserId]=useState("")
  useEffect(() => {
    if (image?.data?.data) {
      const blob = new Blob([Int8Array.from(image?.data?.data)], {
        type: image?.data?.data?.contentType,
      });
      const imageUrl = window.URL.createObjectURL(blob);
      console.log("prodxxxx",imageUrl);
      setImageUrl(imageUrl);
      let storedData = localStorage.getItem('ElectricUser');
      let parsedData = JSON.parse(storedData);
      console.log("parsed_Id",parsedData._id);
      setUserId(parsedData._id)
    }
  }, [image]);

  const addToCart=async(prodId)=>{
    const cardData = new FormData();
    cardData.append("User",userId)
    cardData.append("Product",prodId)
    console.log("cartdata",cardData)
  await axios.post("http://localhost:8080/api/v1/users/add-to-cart",{"user":userId,"product":prodId}).then((res)=>{
      console.log("cartResponse",res)
    }).catch((err)=>{
      console.log("This is the error",err)
    })
  }
  return (
    <div key={_id}>
    <Card style={{ minHeight:"300px", padding: "5px", margin: "5px", border: "1px solid black" }}>
    <CardHeader title={name} subheader={name} />
    {image && <CardMedia component="img" src={imageUrl} style={{width:"200px",height:"200px"}} alt="iamge" />}
    <CardContent>
      <Typography variant="body1">{name}</Typography>
      <Typography variant="body1">{price}</Typography>
      <Button variant="contained" onClick={()=>{addToCart(_id)}} color="primary">Add to Cart</Button>
    </CardContent>
  </Card>
  </div>
  
  );
};

export default ReusableCard;
