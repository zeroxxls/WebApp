import React from 'react'
import { createRoot } from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router";
//import Layout from './Layout'
import MainPage from "./pages/MainPage/MainPage"
import { FirstPage } from './pages/FirstPage/FirstPage';

const router = createBrowserRouter([
    {
      path: "/MainPage",
      element: <MainPage/>,
    },
    {
        path: "/",
        element: <FirstPage/>,
      },
  ]);

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
