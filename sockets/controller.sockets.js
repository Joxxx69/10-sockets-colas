//const TicketControl = require("../class/ticket.class");
//const ticketControl = new TicketControl();

const TicketControl = require("../class/ticket-control.class");

const ticketControl = new TicketControl();



const socketController = (socket) => {
    console.log('Cliente Conectado',socket.id);
    socket.on('disconnect', () => {
        console.log('Cliente Desconectado',socket.id);
    });
    
    //se disparan cuando un cliente se conencta
    socket.emit('ultimo-ticket', ticketControl.ultimo);
    socket.emit('estado-actual', ticketControl.ultimos4);
    socket.emit('tickets-pendientes',ticketControl.tickets.length);

    
    socket.on('enviar-mensaje', (payload,callback) => {
        const siguiente = ticketControl.siguiente();
        callback(siguiente);
        // notifica los tickets pendientes
        socket.broadcast.emit('tickets-pendientes',ticketControl.tickets.length);
    });

    socket.on('atender-click', ({escritorio}, callback) => {
        console.log(escritorio);
        if (!escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }
        const ticket = ticketControl.atenderTicket(escritorio);
        //notifica los cambios
        socket.broadcast.emit('estado-actual', ticketControl.ultimos4);
        socket.emit('tickets-pendientes',ticketControl.tickets.length);
        socket.broadcast.emit('tickets-pendientes',ticketControl.tickets.length);
        
        if (!ticket) {
            callback({
                ok: false,
                msg:'Ya no hay tickets pendientes'
            });
        } else { 
            callback({
                ok: true, 
                ticket
            });
        }
    });



}


module.exports = {
    socketController
};

