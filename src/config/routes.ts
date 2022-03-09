import { Component } from "react";
import routeInterface from "../interfaces/routeinterface";
import AboutPage from "../pages/about/about";
import HomePage from "../pages/home/home";
import Login from "../pages/login/login";
import ProductDetails from "../pages/product-details/productDetails";
import Signup from "../pages/register/register";

const routes: routeInterface[] = [
  {
    path: "/",
    name: "Home page",
    exact: true,
    component: HomePage,
  },
  {
    path: "/about",
    name: "about page",
    exact: true,
    component: AboutPage,
  },
  {
    path: "/about/:number",
    name: "about page",
    exact: true,
    component: AboutPage,
  },
  {
    path: "/productdetails",
    name: "product details page",
    exact: true,
    component: ProductDetails,
  },

  {
    path: "/signin",
    name: "signIn page",
    exact: true,
    component: Login,
  },

  {
    path: "/signup",
    name: "signup page",
    exact: true,
    component: Signup,
  },
];

export default routes;
