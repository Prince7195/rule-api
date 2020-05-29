class Ticket {
  #option;
  #visitorType;
  #price;
  #freeTshirt;

  constructor(option) {
    this.#option = option;
    this.#visitorType = "";
    this.#price = 0;
    this.#freeTshirt = false;
  }

  set option(option) {
    this.#option = option;
  }

  get option() {
    return this.#option;
  }

  set visitorType(visitorType) {
    this.#visitorType = visitorType;
  }

  get visitorType() {
    return this.#visitorType;
  }

  set price(price) {
    this.#price = price;
  }

  get price() {
    return this.#price;
  }

  set freeTshirt(freeTshirt) {
    this.#freeTshirt = freeTshirt;
  }

  get freeTshirt() {
    return this.#freeTshirt;
  }

  toObject() {
    return {
      "Ticket Option": this.option,
      "Visitor Type": this.visitorType,
      "Ticket Price": this.price,
      "Free T-Shirt": this.freeTshirt
    }
  }

  toString() {
    return (
      `Ticket Option: ${this.option} | ` +
      `Visitor Type: ${this.visitorType} | ` +
      `Ticket Price: ${this.price} | ` +
      `Free T-Shirt: ${this.freeTshirt}`
    );
  }
}

module.exports = Ticket;
