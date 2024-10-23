import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider,createRoutesFromElements,Route} from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import Auth from './pages/Auth'
import Home from './pages/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './components/Profile';
import Blogs from './pages/Blogs';
import Articles from './components/Articles';
import About from './components/About';
import BlogPage from './components/BlogPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route path='/' element={<Auth/>}>
        <Route path='' element={<Login/>}/>
        <Route path='signup' element={<Signup/>}/>
      </Route>
      <Route path='/home' element={
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
      }/>
      <Route path='/profile' element={
        <ProtectedRoute>
          <Profile/>
        </ProtectedRoute>
      }/>
      <Route path='/:slug' element={<Blogs/>}>
        <Route index path='' element={<Articles/>} />
        <Route path='about' element={<About/>} />
        <Route path=':title' element={<BlogPage/>} />
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
