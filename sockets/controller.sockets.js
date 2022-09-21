const TicketControl = require("../class/ticket.class");

const ticketControl = new TicketControl();


const socketController = (socket) => {
    console.log('Cliente Conectado',{socket},socket.id);
    socket.on('disconnect', () => {
        console.log('Cliente Desconectado',socket.id);
    });
    
    socket.on('enviar-mensaje', (payload,callback) => {
        const id = 1234;
        console.log(payload);
        callback(id);
        socket.broadcast.emit('enviar-mensaje-todos',payload)
    });

}


module.exports = {
    socketController
};

