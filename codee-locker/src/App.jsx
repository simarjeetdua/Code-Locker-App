import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Paste from './components/Paste'
import ViewPaste from './components/ViewPaste'

function App() {
  const router = createBrowserRouter(
    [
      {
        path:"/",
        element: <div>
          <Navbar/>
          <Home/>
        </div>
      },
      {
        path:"/paste",
        element: <div>
          <Navbar/>
          <Paste/>
        </div>
      },
      {
        path:"/paste/:id",
        element: <div>
          <Navbar/>
          <ViewPaste/>
        </div>
      }
    ]
  );
  const [count, setCount] = useState(0)

  return (
  <div>
   <h1 className="code-locker-heading">💻 Code Locker</h1>
<div className="app-layout"></div>

    <RouterProvider  router={router}/>
  </div>
  )
}

export default App
