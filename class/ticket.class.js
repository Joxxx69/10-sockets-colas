const fs = require('fs');

class Ticket{
    constructor(numero,escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl{
    constructor() {
        this.ultimo   = 0;
        this.hoy      = new Date().getDate();
        this.tickets  = [];
        this.ultimos4 = [];
        this.init();

    }
    get gettoJson() {
        return {
            ultimo:this.ultimo,
            hoy:this.hoy,
            tickets:this.tickets,
            ultimos4:this.ultimos4
        }
    }
    init() {
        // 1er --> forma para importar data
        /*
        const path = './database/data.json';
        if (!fs.existsSync(path)) {return}
        const info = fs.readFileSync(path, { encoding: 'utf-8' });
        const {hoy,ultimo,tickets,ultimos4} = JSON.parse(info);
        */
        // 2do --> forma para importar data
        const { hoy, ultimo, tickets, ultimos4 } = require('../database/data.json'); 
        console.log({hoy,ultimo,tickets,ultimos4});
        
        if (hoy === this.hoy) {
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4
        } else {
            this.guardarDB();
        }
    }
    guardarDB() {
        const path = './database/data.json';
        fs.writeFileSync(path,JSON.stringify(this.gettoJson))
    }
    siguiente() {
        this.ultimo++;
        const ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.guardarDB();
        return `Ticket : ${ticket.numero}`;
    }
    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return null;
        }  
        const ticket =this.tickets.shift();
        ticket.escritorio = escritorio;
        console.log(ticket);
        this.ultimos4.unshift(ticket);
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1);
        }
        this.guardarDB();
        console.log(ticket);
        return ticket;

    }

}


module.exports = TicketControl;