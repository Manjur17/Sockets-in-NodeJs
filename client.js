const readlineSync = require('readline-sync');
const net = require('net');

const HOST = '127.0.0.1';
const PORT = 8080;

let client = null;

function OpenConnection() {
    if (client) {
        console.log("--Connection is already open--");
        setTimeout(() => {
            menu();
        }, 0)
        return;
    }

    client = new net.Socket();

    client.on('error', (err) => {
        //close the connection completely
        client.destroy();
        client = null;
        console.log(`ERROR : Connection could not be opened ${err.message}`);
        setTimeout(() => {
            menu();
        }, 0);
    });

    // Add a 'data' event handler for the client socket
    // data is what the server sent to this socket
    client.on('data', (data) => {
        console.log(`DATA from server : ${data}`);
        setTimeout(() => {
            menu();
        }, 0);
    });

    client.connect(PORT, HOST, () => {
        console.log('CONNECTED TO: ' + HOST + ':' + PORT);
        setTimeout(() => {
            menu();
        }, 0);
    });
}

function SendData(data) {
    if (!client) {
        console.log("Please make a connection first");
        setTimeout(() => {
            menu();
        }, 0);
        return;
    }

    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
    client.write(data);
}

function CloseConnection() {
    if (!client) {
        console.log("Connection is already closed");
        setTimeout(() => {
            menu();
        }, 0);
        return;
    }

    client.destroy();
    client = null;
    console.log('Connection closed successfully');
    setTimeout(() => {
        menu();
    }, 0);
}

const menu = () => {
    const lineRead = readlineSync.question('Enter option(1-Open, 2-Send,3-Close,4-Quit) : ');

    switch (lineRead) {
        case "1":
            OpenConnection(); //start the connection
            break;
        case "2":
            const data = readlineSync.question("Enter the data to send: ")
            SendData(data); //send data to server
            break;
        case "3":
            CloseConnection(); //close the connection
            break;
        case "4":
            return; //Quit
        default:
            setTimeout(() => {
                menu();
            }, 0);
            break;
    }
}

menu();