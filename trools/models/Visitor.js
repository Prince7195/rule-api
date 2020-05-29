const { cinfo, cerr } = require('simple-color-print');

const TICKET_FALSY_ERR = 'Ticket cannot be falsy if trying to get price';

class Visitor {

    #age;
    #partySize;
    #visitorType;
    #discount;
    #freeTshirt;
    #ticket = null;

    constructor(age) {
        this.#age = age;
        this.#partySize = 1;
        this.#visitorType = '';
        this.#discount = 0;
        this.#freeTshirt = false;
        this.#ticket = null;
    }

    set age(age) {
        this.#age = age;
    }

    get age() {
        return this.#age;
    }

    set partySize(partySize) {
        this.#partySize = partySize;
    }

    get partySize() {
        return this.#partySize;
    }

    set discount(discount) {
        this.#discount = discount;
    }

    get discount() {
        return this.#discount;
    }

    set visitorType(visitorType) {
        this.#visitorType = visitorType;
    }

    get visitorType() {
        return this.#visitorType;
    }

    set freeTshirt(freeTshirt) {
        this.#freeTshirt = freeTshirt;
    }

    get freeTshirt() {
        return this.#freeTshirt;
    }

    set ticket(ticket) {
        if (ticket) {
            ticket.freeTshirt = this.freeTshirt;
            ticket.visitorType = this.visitorType;
            const discount = 1 - (this.discount / 100);
            ticket.price *= discount;
        }
        this.#ticket = ticket;
    }

    get ticket() {
        return this.#ticket;
    }

    get ticketPrice() {

        if (this.ticket) {
            return this.ticket.price;
        } else {
            throw Error(TICKET_FALSY_ERR);
        }
    }

    addToDiscount(additionalDiscount) {
        this.#discount += additionalDiscount;
    }

    getTicket() {
        if (this.ticket) {
            return this.ticket.toObject();
        } else {
            return null;
        }
    }

    printTicket() {

        if (this.ticket) {
            cinfo(this.ticket.toString());
        } else {
            cerr('User does not have a ticket set');
        }
    }
}

module.exports = Visitor;
