

const searchParams = new URLSearchParams(window.location.search);
console.log('Search', window.location.search);
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');

const socket = io();

//Referencias HTML

const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');

divAlerta.style.display = 'none';
lblEscritorio.innerText = escritorio;

socket.on('connection', () => {
    btnAtender.disabled = false;
});


socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

socket.on('tickets-pendientes', (response) => {
    console.log(response);
    if (response ===0) {
        lblPendientes.style.display = 'none';
    }
    lblPendientes.style.display = '';
    lblPendientes.innerText = response;
});


btnAtender.addEventListener('click', () => {
    socket.emit('atender-click', { escritorio },(response) => {
        console.log(response);
        if (!response.ok) {
            lblTicket.innerText = 'Nadie.'
            return divAlerta.style.display = '';
        }
        lblTicket.innerText = `Ticket: ${response.ticket.numero}`
        
    });
 
});