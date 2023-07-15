import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  CardMedia,
} from '@material-ui/core';

const useStyles = makeStyles({
  tableContainer: {
    maxWidth: 1600,
    margin: '0 auto',
  },
  totalPrice: {
    marginTop: 20,
    textAlign: 'right',
    marginRight: 30,
  },
  checkoutButton: {
    marginTop: 20,
    backgroundColor: 'green',
    marginRight: 30,
    textAlign: 'right',
    color: 'white',
    '&:hover': {
      backgroundColor: '#006400',
    },
  },
  quantityButtons: {
    display: 'flex',
    alignItems: 'center',
  },
  decrementButton: {
    marginRight: 10,
  },
});

const CartPage = () => {
  const classes = useStyles();
  const[userId,setUserId]=useState("")
const [items, setItems] = useState([]);

  const[imageitem,setImageitem]=useState(null)

  // Dummy cart data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Product 1',
      price: 9.99,
      quantity: 2,
      image: 'path_to_product_image_1',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 14.99,
      quantity: 1,
      image: 'path_to_product_image_2',
    },
    // Add more items as needed
  ]);

  const getUser=()=>{
    let storedData = localStorage.getItem('ElectricUser');
    let parsedData = JSON.parse(storedData);
    console.log("parsed_Id",parsedData._id);
    setUserId(parsedData._id)
  }
  const userCartProducts=async()=>{
    
    await axios.get(`http://localhost:8080/api/v1/users/view-cart/${userId}`).then((res)=>{
      console.log("cart Products",res.data)
      setItems(res.data.data)
      console.log("itemssss",items);
    }).catch((err)=>{
      console.log(err)
    })
  }
  function base64ToUint8Array(base64) {
    const binaryString = atob(base64);
    const length = binaryString.length;
    const uint8Array = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }
    return uint8Array;
  }
  const loadImage = (image) => {
    const uint8Array = base64ToUint8Array(image?.data);
    console.log("imaaageeeeeee",uint8Array);
    if (image?.data) {
      const blob = new Blob([Int8Array.from(uint8Array)], {
        type: image?.contentType,
      });
      const imageUrl = window.URL.createObjectURL(blob);
      
      return imageUrl;
    }
    return null;
  };
  // const loadImage=(image)=>{
  //   const imageUrl = `http://localhost:8080/${image}`;
  //   return imageUrl;
  // }
  

useEffect(() => {
  getUser();
}, []);

useEffect(() => {
  if (userId) {
    userCartProducts();
  }
}, [userId]);
  // Calculate total amount
const totalAmount = items?.reduce(
  (acc, item) => acc + (item.price|| 0),
  0
);
 const totalAmountInteger = parseFloat(totalAmount).toFixed(2);


  // Handle quantity increment
  const handleIncrement = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Handle quantity decrement
  const handleDecrement = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Handle product removal
  const handleRemove = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleCheckout = () => {
    // Handle checkout logic here
    console.log('Checkout');
  };

  return (
    <div>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          
            {items?.map((item) => (
                <TableBody>
              <TableRow key={item._id}>
                <TableCell>
               <CardMedia component="img" src={loadImage(item.image)} style={{width:"200px",height:"200px"}} alt="image" />
                  {/* <img src={loadImage(item.image)}   alt={item.name} width={50} /> */}
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>Rs {item.price.toFixed(2)}</TableCell>
                <TableCell>
                  <div className={classes.quantityButtons}>
                    <Button
                      onClick={() => handleDecrement(item.id)}
                      variant="outlined"
                      size="small"
                      className={classes.decrementButton}
                    >
                      -
                    </Button>
                    {item.quantity}
                    <Button
                      onClick={() => handleIncrement(item.id)}
                      variant="outlined"
                      size="small"
                    >
                      +
                    </Button>
                  </div>
                </TableCell>
                <TableCell>Rs {parseInt(item.price).toFixed(2)}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleRemove(item.id)}
                    variant="outlined"
                    size="small"
                    color="secondary"
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
              </TableBody>
            ))}
          
        </Table>
      </TableContainer>

      <Typography variant="h6" className={classes.totalPrice}>
        Total: Rs {totalAmountInteger}
      </Typography>

      <Button
        className={classes.checkoutButton}
        variant="contained"
        onClick={handleCheckout}
      >
        Checkout
      </Button>
    </div>
  );
};

export default CartPage;
