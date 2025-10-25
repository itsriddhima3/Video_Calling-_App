import react, { useCallback, useState , useEffect} from 'react'
import {useSocket} from '../context/SocketProvider.jsx'
import { useNavigate } from 'react-router-dom'

 const LobbyScreen=()=>{
   const[email, setemail]=useState('')
   const [room , setroom]=useState('')

   const socket = useSocket();
   const navigate= useNavigate();

   const handleSubmit=useCallback((e)=>{
    e.preventDefault();
    socket.emit("room:join",{email,room});
   },
   [email,room , socket]);

   const handleJoinRoom=useCallback((data)=>{
    const {email, room}=data;
    navigate(`/room/${room}`);
   },[navigate]);

   useEffect(()=>{
    socket.on("room:join",handleJoinRoom)
    return()=>{
      socket.off('room:join', handleJoinRoom) // to degister a listener
    }
   },[socket, handleJoinRoom]);

   return(
    <>
    <h1> LOBBY </h1>
    <form onSubmit={handleSubmit}>
    <label htmlFor='email'>Email</label>
    <input 
    type='email'
     id='email'
     value={email}
     onChange={(e)=>setemail(e.target.value)}/>
    <br/>
    <label htmlFor='room'>Room Number</label>
    <input
     type='text'
     id='room'
     value={room}
     onChange={(e)=>setroom(e.target.value)}/>
    <br/>
    <button>JOIN</button>
    </form>
    </>
   )

}
export default LobbyScreen;