const fs = require('fs');
const path = require('path');


class Ticket{
    constructor(numero,escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}


class TicketControl{
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];
        this.init();
    }
    get toJSON() {
        return {
            ultimo:this.ultimo,
            hoy:this.hoy,
            tickets:this.tickets,
            ultimos4:this.ultimos4,
        }
    }
    init() {
        
        //--> 1. Primera forma de leer data de un JSON
        const {hoy, ultimo,tickets,ultimos4} = require('../database/data.json');
        //--> 2. Segunda forma de leer data de un JSON
        /*const path = './database/data.json';
        if (!fs.existsSync(path)) { return };
        const data = fs.readFileSync(path,{encoding:'utf-8'});
        const { hoy, tickets,ultimo,ultimos4} = JSON.parse(data);*/

        if (hoy == this.hoy) {
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;
        } else {
            // Es otro dia
            this.guardarDb();
        }
        //console.log({ hoy, ultimo, tickets, ultimos4 });
    }

    guardarDb() {
        const dbPath = path.join(__dirname, '../database/data.json');
        fs.writeFileSync(dbPath,JSON.stringify(this.toJSON));
    }
    siguiente() {
        this.ultimo += 1;
        const ticket = new Ticket(this.ultimo,null);
        this.tickets.push(ticket);
        
        this.guardarDb();

        return `Ticket ${ticket.numero}`;
    }
    atenderTicket(escritorio) {
        // No tenemos tickets
        if (this.tickets.length === 0) {
            return null;
        }
        const ticket = this.tickets.shift();
        ticket.escritorio = escritorio;

        this.ultimos4.unshift(ticket);
        if (this.ultimos4.length >4) {
            this.ultimos4.splice(-1, 1);
        }
        this.guardarDb();
        return ticket;
    }
}

module.exports = TicketControl