/**
 * Process customers given a using rules specified in
 * a .csv file and the trool rule engine.
 *
 * created by Sean Maxwell Mar 2, 2019
 */
const path = require('path');
const Trool = require('trool').default;
const { cerr } = require('simple-color-print');

const Ticket = require('../models/Ticket');

const CSV_FILE = '../rule-files/VisitorRules.csv';

class PriceCalculator {

    #trool;

    constructor() {
        this.#trool = new Trool(true);
    }


    async calcTotalPrice(visitors, ticketOpt) {
        let totalPrice = 0;
        visitors = (visitors instanceof Array) ? visitors : [visitors];
        try {
            const csvFilePath = path.join(__dirname, CSV_FILE);
            const facts = this.setupFactsHolder(visitors, ticketOpt);
            const updatedFacts = await this.#trool.applyRules(csvFilePath, facts);
            totalPrice = this.addUpEachTicketPrice(updatedFacts);
        } catch (err) {
            cerr(err);
            totalPrice = -1;
        }

        return '$' + totalPrice.toFixed(2);
    }

    async getTicketInfo(visitors, ticketOpt) {
        let tickesStringList = []
        visitors = (visitors instanceof Array) ? visitors : [visitors];
        try {
            const csvFilePath = path.join(__dirname, CSV_FILE);
            const facts = this.setupFactsHolder(visitors, ticketOpt);
            const updatedFacts = await this.#trool.applyRules(csvFilePath, facts);
            tickesStringList = this.getTickesStringList(updatedFacts);
        } catch (err) {
            cerr(err);
        } finally {
            return tickesStringList;
        }

    }

    getTickesStringList(factsObj) {
        const { Visitors, Tickets } = factsObj;
        let totalPrice = 0;
        const tickesStringList = Visitors.map((visitor, i) => {
            visitor.ticket = Tickets[i];
            return visitor.getTicket();
        });
        return tickesStringList;
    }


    setupFactsHolder(visitors, ticketOpt) {
        const tickets = [];
        visitors.forEach((visitor) => {
            visitor.partySize = visitors.length;
            tickets.push(new Ticket(ticketOpt));
        });
        return {
            Tickets: tickets,
            Visitors: visitors,
        };
    }


    addUpEachTicketPrice(factsObj) {
        const { Visitors, Tickets } = factsObj;
        let totalPrice = 0;
        Visitors.forEach((visitor, i) => {
            visitor.ticket = Tickets[i];
            totalPrice += visitor.ticketPrice;
            // visitor.printTicket();
        });
        return totalPrice;
    }
}

module.exports = PriceCalculator;
