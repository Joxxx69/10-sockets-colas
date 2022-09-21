//const TicketControl = require("../class/ticket.class");
//const ticketControl = new TicketControl();

const TicketControl = require("../class/ticket-control.class");

const ticketControl = new TicketControl();



const socketController = (socket) => {
    console.log('Cliente Conectado',socket.id);
    socket.on('disconnect', () => {
        console.log('Cliente Desconectado',socket.id);
    });
    
    socket.emit('ultimo-ticket',ticketControl.ultimo);
    
    socket.on('enviar-mensaje', (payload,callback) => {
        const siguiente = ticketControl.siguiente();
        callback(siguiente);
        //TODO: Notificar que hay un nuevo ticket pendiente de asignar

        //socket.broadcast.emit('enviar-mensaje-todos',payload)
    });

}


module.exports = {
    socketController
};

