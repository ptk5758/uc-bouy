import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootRoute from './routes/root';
import Telemetry from './routes/telemetry';
import Prompt from './routes/prompt';
import { SerialNetworkProvider } from './contexts/serialNetwork';

const router = createBrowserRouter([
  {
    path : "/",
    element : <RootRoute/>
  },
  {
    path : "/telemetry",
    element : <Telemetry/>
  },
  {
    path : "/prompt",
    element : <Prompt/>
  },
  

])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <SerialNetworkProvider>
      <RouterProvider router={router}/>
    </SerialNetworkProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
