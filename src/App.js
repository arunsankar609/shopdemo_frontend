import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUpForm from "./components/users/SignUp";
import LoginForm from "./components/users/Login";
import Home from "./components/users/Home";
import AdminLoginForm from "./components/admin/AdminLogin";
import AdminHome from "./components/admin/AdminHome";
import Products from "./components/users/Products";
import { Provider } from "react-redux";
import store from "./components/store/store";
import CartPage from "./components/users/CartPage";
// const verifyUser=({childern})=>{
//   if(req.session.user){
//     return childern
//   }else{

//   }
// }
const router = createBrowserRouter([
  { path: "/admin", 
  element: <AdminLoginForm /> },
  {
    path: "/adminhome",
    element: <AdminHome />,
  },
  {
    path: "/signup",
    element: <SignUpForm />,
  },
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "/home",
        element: <Products />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
    ],
  },
]);
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
