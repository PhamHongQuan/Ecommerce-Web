import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./store/Store";
// @ts-ignore
import {RouterProvider} from "react-router-dom";
import {router} from "./Router/web";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Provider store={store }>
          <RouterProvider router={router}></RouterProvider>
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
