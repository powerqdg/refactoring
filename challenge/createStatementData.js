class Performance {
  #audience;
  #play;
  constructor(audience, play) {
    this.#audience = audience;
    this.#play = play;
  }

  static create(audience, play) {
    switch (play.type) {
      case 'tragedy':
        return new Tragedy(audience, play);
      case 'comedy':
        return new Comedy(audience, play);
    }
  }

  get play() {
    return this.#play;
  }

  get audience() {
    return this.#audience;
  }

  get credits() {}

  get amount() {}
}

class Tragedy extends Performance {
  get amount() {
    let result = 40000;
    if (this.audience > 30) {
      result += 1000 * (this.audience - 30);
    }
    return result;
  }

  get credits() {
    return Math.max(this.audience - 30, 0);
  }
}

class Comedy extends Performance {
  get amount() {
    let result = 30000;
    if (this.audience > 20) {
      result += 10000 + 500 * (this.audience - 20);
    }
    result += 300 * this.audience;
    return result;
  }

  get credits() {
    return Math.max(this.audience - 30, 0) + Math.floor(this.audience / 5);
  }
}

export function createStatementData(invoice, plays) {
  let result = {};
  result.customer = invoice.customer;
  result.performances = invoice.performances.map((p) =>
    Performance.create(p.audience, plays[p.playID])
  );
  result.totalAmount = totalAmount(result.performances);
  result.totalCredits = totalCredits(result.performances);
  return result;

  function totalAmount(performances) {
    return performances.reduce((sum, p) => sum + p.amount, 0);
  }

  function totalCredits(performances) {
    return performances.reduce((sum, p) => sum + p.credits, 0);
  }
}
