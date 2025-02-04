const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/javascript", (req, res) => {
    res.sendFile(__dirname + "/public/javascript.html");
  });

app.get("/swift", (req, res) => {
    res.sendFile(__dirname + "/public/swift.html");
  });
 
app.get("/css", (req, res) => {
    res.sendFile(__dirname + "/public/css.html");
  });

// namespaces

const tech = io.of('/tech') 

tech.on("connect", (socket) => {
    socket.on('join',(data)=>{
        socket.join(data.room)
        tech.in(data.room).emit('message', `New user joined ${data.room} room!`);
    })
  socket.on("message", (data) => {
    console.log(data.msg);
    tech.in(data.room).emit("message", data.msg);
  });

  socket.on('disconnect', ()=>{
      console.log('user disconected');
      tech.emit('message', 'user disconected');
  })

});
