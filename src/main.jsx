import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Add from "./pages/add.jsx";
import Edit from "./pages/edit.jsx";
import Profile from "./pages/profile.jsx";
import Dashboard from './layout/Dashboard.jsx';
import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import View from './pages/view.jsx';
import Protected from './components/Protected.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router'

const route = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
    children: [
      {
        path: '/add',
        element: <Protected><Add /></Protected>
      },
      {
        path: '/edit/:id',
        element: <Protected><Edit /></Protected>
      },
      {
        path: '/view',
        element: <View />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/Signup',
        element: <Signup />
      },
      {
        path: '/Login',
        element: <Login />
      }
    ]
  },
])
createRoot(document.getElementById('root')).render(
  <RouterProvider router={route} />,
)
