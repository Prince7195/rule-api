const express = require("express");
const router = express.Router();

const Visitor = require('../trools/models/Visitor');

const TicketInfo = require("../trools/rules/TicketsInfo");

router.get("/", (req, res, next) => {
    res.status(200).send("Trools!");
});

router.get("/ticket-info", (req, res, next) => {
    TicketInfo.getTicketInformation(new Visitor(67), 'Season').then((data) => {
        res.status(200).json({ticketsStringList: data});
    }).catch((err) => {
        res.status(500).json(err);
    });
    
});

module.exports = router;