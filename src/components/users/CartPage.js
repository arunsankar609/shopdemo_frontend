import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

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
} from "@material-ui/core";

const useStyles = makeStyles({
  tableContainer: {
    maxWidth: 1600,
    margin: "0 auto",
  },
  totalPrice: {
    marginTop: 20,
    textAlign: "right",
    marginRight: 30,
  },
  checkoutButton: {
    marginTop: 20,
    backgroundColor: "green",
    marginRight: 30,
    textAlign: "right",
    color: "white",
    "&:hover": {
      backgroundColor: "#006400",
    },
  },
  quantityButtons: {
    display: "flex",
    alignItems: "center",
  },
  decrementButton: {
    marginRight: 10,
  },
});

const CartPage = () => {
  const classes = useStyles();
  const [userId, setUserId] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getUser = () => {
      let storedData = localStorage.getItem("ElectricUser");
      let parsedData = JSON.parse(storedData);
      console.log("parsed_Id", parsedData._id);
      setUserId(parsedData._id);
    };

    getUser();
  }, []);

  useEffect(() => {
    const userCartProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/users/view-cart/${userId}`
        );
        const items1 = res.data.usercart;
        const itemsArray = Object.values(items1);
        console.log("cart Products", itemsArray);
        setItems(itemsArray);
      } catch (err) {
        console.log(err);
      }
    };

    if (userId) {
      userCartProducts();
    }
  }, [userId]);

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
    if (image?.data) {
      const uint8Array = base64ToUint8Array(image?.data);
      const blob = new Blob([Int8Array.from(uint8Array)], {
        type: image?.contentType,
      });
      const imageUrl = window.URL.createObjectURL(blob);
      return imageUrl;
    }
    return null;
  };
  const handleIncrement = async (itemId) => {
    try {
      // Make an API call to update the quantity in the backend
      // For example, you might use an endpoint like:
      // await axios.put(`http://localhost:8080/api/v1/users/update-cart/${userId}/${itemId}`, { quantity: newQuantity });
      // After the successful update, update the state to reflect the changes
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === itemId ? { ...item, count: item.count + 1 } : item
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleDecrement = async (itemId) => {
    try {
      // Make an API call to update the quantity in the backend
      // For example, you might use an endpoint like:
      // await axios.put(`http://localhost:8080/api/v1/users/update-cart/${userId}/${itemId}`, { quantity: newQuantity });
      // After the successful update, update the state to reflect the changes
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === itemId ? { ...item, count: Math.max(item.count - 1, 0) } : item
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleCheckout = () => {
    console.log("Checkout");
  };

  return (
    <div >
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Count</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {items?.map((item) => (
    <TableRow key={item._id} >
      <TableCell>
        {item.cproducts.map((product) => (
          <CardMedia
            key={product._id}
            component="img"
            src={loadImage(product.image)}
            style={{ width: "200px", height: "200px" }}
            alt="image"
          />
        ))}
      </TableCell>
      <TableCell>{item.cproducts[0].name.toString()}</TableCell>
      <TableCell>Rs.{item.cproducts[0].price}</TableCell> {/* Add this line */}
      <TableCell>
      <div className={classes.quantityButtons}>
                    <Button
                      onClick={() => handleDecrement(item._id)}
                      variant="outlined"
                      size="small"
                      color="primary"
                      className={classes.decrementButton}
                      disabled={item.count <= 1}
                    >
                      -
                    </Button>
                    <span style={{marginRight:"6px"}}>{item.count}</span>
                    <Button
                      onClick={() => handleIncrement(item._id)}
                      variant="outlined"
                      size="small"
                      color="primary"
                    >
                      +
                    </Button>
                  </div>
        </TableCell>
      <TableCell>
        <Button
          onClick={() => handleRemove(item._id)}
          variant="outlined"
          size="small"
          color="secondary"
        >
          Remove
        </Button>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

        </Table>
      </TableContainer>

      <Typography variant="h6" className={classes.totalPrice}>
        {/* Total: Rs {totalAmountInteger} */}
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
