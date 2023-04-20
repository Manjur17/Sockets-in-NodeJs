const net = require("net");
const PORT = 8080;
const server = net.createServer();

server.on("connection", (socket) => {
    // We have a connection - a socket object is assigned to the connection automatically
    const remoteAdd = socket.remoteAddress + ":" + socket.remotePort;
    console.log(`New client connection made !! at ${remoteAdd}`);

    // Add a 'data' event handler to this instance of socket
    socket.on('data', (data) => {
        console.log(`DATA from client: ${data}`);

        // Write the data back to the socket, the client will receive it as data from the server
        socket.write(`Hi client :)`);
    });

    // Add a 'close' event handler to this instance of socket
    socket.on('close', () => {
        console.log(`Connection closed from client: ${remoteAdd}`);
    });

    socket.on('error', (err) => {
        console.log(`Some error occured : ${err.message}`);
    });
});

// server.on("error", (err) => {
//     console.log("Some error occured", err);
// })

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT} :)`);
});
