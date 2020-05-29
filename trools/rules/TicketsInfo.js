const { cerr } = require('simple-color-print');

const PriceCalculator = require('./PriceCalculator');

const priceCalculator = new PriceCalculator();

async function getTicketInformation(vistors, ticketOption) {
    let ticketInfo = [];
    try {
        ticketInfo = await priceCalculator.getTicketInfo(vistors, ticketOption);
        // tslint:disable-next-line
        console.log(ticketInfo + '\n');
    } catch (err) {
        cerr(err);
    } finally {
        return ticketInfo;
    }
}

module.exports = {
    getTicketInformation
};
