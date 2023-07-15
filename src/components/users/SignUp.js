import React from "react";
import axios from "axios"
import {
  TextField,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  makeStyles,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

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
  outerBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
    border: '1px solid black',
    borderRadius: theme.spacing(2)
  },
  boxImage: {
    width: "100%",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(2),
      width: "300px",
    },
    [theme.breakpoints.up("md")]: {
        marginLeft: theme.spacing(2),
        width: "800px",
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

const SignUpForm = () => {
  const classes = useStyles();
const handleSubmit=async (values) => {
  console.log(values);
  // Perform form submission logic here
 await axios.post("http://localhost:8080/api/v1/users/signup",values).then((response)=>{
   console.log(response)
  }).catch((error)=>{
    console.log(error)
  })
  
}
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
      gender:"",
      state: "",
      city: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.username) {
        errors.username = "Cannot proceed without username";
      }

      if (!values.password) {
        errors.password = "Required";
      }

      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.state) {
        errors.state = "Required";
      }

      if (!values.city) {
        errors.city = "Required";
      }

      return errors;
    },

    onSubmit: handleSubmit
  });

  const renderCities = () => {
    if (formik.values.state === "California") {
      return [
        <MenuItem key="la" value="Los Angeles">
          Los Angeles
        </MenuItem>,
        <MenuItem key="sf" value="San Francisco">
          San Francisco
        </MenuItem>,
        // Add more cities in California
      ];
    } else if (formik.values.state === "New York") {
      return [
        <MenuItem key="nyc" value="New York City">
          New York City
        </MenuItem>,
        <MenuItem key="buffalo" value="Buffalo">
          Buffalo
        </MenuItem>,
        // Add more cities in New York
      ];
    } else if (formik.values.state === "Texas") {
      return [
        <MenuItem key="houston" value="Houston">
          Houston
        </MenuItem>,
        <MenuItem key="austin" value="Austin">
          Austin
        </MenuItem>,
        // Add more cities in Texas
      ];
    }
    return null;
  };

  return (
    <div className={classes.outerBox}>
      <Box
        className={classes.boxImage}
        component="img"
        alt="The house from the offer."
        src="https://www.frost.com/wp-content/uploads/2023/01/GettyImages-1330705612.jpg"
      />
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <h1 className={classes.heading}>User SignUp Form</h1>
        <TextField
          label="username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
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
       <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="gender" // Set the name for the radio group field
          row // Display radio buttons in a row
          {...formik.getFieldProps("gender")} // Use getFieldProps to generate the required props
        >
          <FormControlLabel value="female"   control={<Radio style={{ color: "green" }} />} label="Female" />
          <FormControlLabel value="male"   control={<Radio style={{ color: "green" }} />} label="Male" />
          <FormControlLabel value="other"   control={<Radio style={{ color: "green" }} />} label="Other" />
        </RadioGroup>
        <FormControl>
          <InputLabel id="state-label">State</InputLabel>
          <Select
            labelId="state-label"
            id="state-select"
            name="state"
            value={formik.values.state}
            onChange={formik.handleChange}
            required
          >
            <MenuItem value="California">California</MenuItem>
            <MenuItem value="New York">New York</MenuItem>
            <MenuItem value="Texas">Texas</MenuItem>
            {/* Add more states as needed */}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="city-label">City</InputLabel>
          <Select
            labelId="city-label"
            id="city-select"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            required
          >
            {renderCities()}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" className={classes.button}>
          Sign Up
        </Button>
        <h1 className={classes.bottomText}>Already a user?<Link to="/"> <span className={classes.linkColor}> Login</span></Link></h1>
      </form>
      
    </div>
  );
};

export default SignUpForm;
