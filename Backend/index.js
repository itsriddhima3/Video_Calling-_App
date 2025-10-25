import {Server} from 'socket.io';
import http from "http";

// Create an HTTP server
const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Start listening on port 3000
httpServer.listen(3000, () => {
  console.log("Socket.IO server running on port 3000");
});

const emailToSockeIdMap=new Map();
const sockeIdToEmailMap = new Map();

io.on('connection' , socket=>{
    console.log('New client connected: ' + socket.id);
    socket.on('room:join',data=>{
        const {email,room}=data;
        emailToSockeIdMap.set(email,socket.id);
        sockeIdToEmailMap.set(socket.id,email);

        socket.to(room).emit("user:joined",{email,id:socket.id});
        
        socket.join(room);
       socket.emit("room:join", data);

    })


    socket.on('user:call',({to,offer})=>{
        io.to(to).emit('incomming:call',{from: socket.id,offer});       
    });

    socket.on('call:accepted', ({to ,ans})=>{
         io.to(to).emit('call:accepted',{from: socket.id,ans});  
    });

    socket.on('peer:nego:needed',({to,offer})=>{
        io.to(to).emit('peer:nego:needed',{from: socket.id,offer});
    });

    socket.on('peer:nego:done',({to,ans})=>{
      io.to(to).emit('peer:nego:final',{from: socket.id,ans});  
    });
})