import './App.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Detail from './pages/Detail';
import Error from './pages/Error';
import Root from './pages/Root';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/search", element: <Search /> },
      { path: "/detail/:movieId", element: <Detail /> },
      { path: "*", element: <Error /> },
    ]
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
