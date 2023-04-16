import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Home</h1>,
    errorElement: <h1>Error</h1>
  },
  {
    path: '/about',
    element: <h1>About</h1>
  },
  {
    path: '/contact',
    element: <h1>Contact</h1>
  }
]);

const App = () => {
  return (
    <div className="App">
      <Layout>
        <RouterProvider router={router}/>
      </Layout>
    </div>
  );
}

export default App;
