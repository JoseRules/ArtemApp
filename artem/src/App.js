import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './views/Home/Home';
import SignUp from './views/SignUp/SignUp';
import Login from './views/Login/Login';
import { useUpdateUser } from './store/UserContext';
import Profile from './views/Profile/Profile';
import { useEffect } from 'react';
import { getSessionStorage } from './utils/getSessionStorage';
import Calendar from './views/Calendar/Calendar';
import Catalog from './views/Catalog/Catalog';
import Appointments from './views/Appointments/Appointments';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    errorElement: <h1>Error</h1>
  },
  {
    path: '/about',
    element: <h1>About</h1>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/signUp',
    element: <SignUp/>
  },
  {
    path: '/contact',
    element: <h1>Contact</h1>
  },
  {
    path: '/profile',
    element: <Profile/>
  },
  {
    path: '/calendar',
    element: <Calendar/>
  },
  {
    path: '/catalog',
    element: <Catalog/>
  },
  {
    path: '/appointments',
    element: <Appointments/>
  }
]);

const App = () => {
  const updateUser = useUpdateUser();

  useEffect(() => {
    const storage = getSessionStorage();
    if(storage){
      updateUser(JSON.parse(storage));
    }
  },[]);

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
