import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import React from 'react'
import {createBrowserRouter, Route,createRoutesFromElements, RouterProvider, Routes} from "react-router-dom"
import './index.css'
import LobbyScreen from './screens/lobby.jsx'
import {SocketProvider} from './context/SocketProvider.jsx'
import RoomPage from './screens/room.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<LobbyScreen/>}/>
    <Route path='/room/:roomId' element={<RoomPage/>}/>
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SocketProvider>
   <RouterProvider router={router}/>
    </SocketProvider>
  </React.StrictMode>,
)
