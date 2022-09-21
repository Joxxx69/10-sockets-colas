// estoy en la parte del cliente

// Referencias del HTML
//- IDs - Etiquetas
//lblNuevoTicket
//btn-generar

const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('#btn-generar');

const socket = io();


socket.on('connect',()=> {
    console.log('2. connected client on client.socket');
    btnCrear.disabled = false;
})


socket.on('disconnect', () => {
    console.log('3. client disconnected ');
    btnCrear.disabled = true;
});

socket.on('ultimo-ticket', (mensaje) => {
    lblNuevoTicket.innerText = `Ticket ${mensaje}`;

    console.log('Aqui!',mensaje);  
})

btnCrear.addEventListener('click', () => {
    socket.emit('enviar-mensaje',null , (ticket) => {
        console.log('desde el server:', ticket);
        lblNuevoTicket.innerText = ticket;
        
    })
    
});


