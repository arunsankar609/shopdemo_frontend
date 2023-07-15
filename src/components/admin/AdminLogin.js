import React from "react";
import axios from "axios";
import { Link,useNavigate} from "react-router-dom";
import {
  TextField,
  Button,
  makeStyles,
 
} from "@material-ui/core";
import { useFormik } from "formik";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    maxWidth: "300px",
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      maxWidth: "500px",
      margin: "0 auto",
    },
  },
  heading: {
    textAlign: "center",
    marginBottom: theme.spacing(3),
    fontSize: "2rem",
    color: "green",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "green",
    color: "white",
  },
    bottomText:{
      fontSize:"20px"
    },
    linkColor:{
      color:"blue"
    }
}));

const AdminLoginForm = () => {
  const navigate=useNavigate()
  const classes = useStyles();
  const adminlog={
    email:"admin@gmail.com",
    password:"arun609"
  }

  
  const handleSubmit = async (values) => {
    console.log(values);
    console.log(adminlog);
    if(values.email===adminlog.email&&values.password===adminlog.password){
      console.log("success");
      navigate("/adminhome")

    }else{
      console.log("failed");
    }
 
  };

 
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Required";
      }

      return errors;
    },

    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className={classes.form}>
      <h1 className={classes.heading}>Admin Login</h1>
      
      <TextField
        label="Email"
        type="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && !!formik.errors.email}
        helperText={formik.touched.email && formik.errors.email}
        required
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        required
      />
      
      <Button type="submit" variant="contained" className={classes.button}>
        Login
      </Button>
      <h1 className={classes.bottomText}>Dont have an account?<Link to="/signup"><span className={classes.linkColor}>Please signup</span> </Link> </h1>
    </form>
    
  );
};

export default AdminLoginForm;
