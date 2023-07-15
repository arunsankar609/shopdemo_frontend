import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { DropzoneArea, useDropzone } from "react-dropzone";
import axios from "axios";

const AddProductForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/*",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image);
      console.log("xxxxxxxxx",formData);
    await axios
      .post("http://localhost:8080/api/v1/users/addProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        alert("Product added successfully!");
        setName("");
        setPrice("");
        setImage(null);
      })
      .catch((err) => {
        console.error(err);
        alert("Error adding product. Please try again.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        fullWidth
        margin="normal"
      />

      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? "active" : ""}`}
      >
        <input {...getInputProps()} />
        {image ? (
          <div>
            <p>Selected Image:</p>
            <img
              src={URL.createObjectURL(image)}
              alt="Selected"
              width="150"
              height="150"
            />
          </div>
        ) : (
          <p>Drag 'n' drop an image here, or click to select an image</p>
        )}
      </div>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ margin: "10px" }}
      >
        Add Product
      </Button>

      <style>
        {`
          .dropzone {
            border: 2px dashed #aaa;
            padding: 20px;
            margin-top: 20px;
            text-align: center;
          }

          .dropzone.active {
            background-color: #f0f0f0;
          }
        `}
      </style>
    </form>
  );
};

export default AddProductForm;
