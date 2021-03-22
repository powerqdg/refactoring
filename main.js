/*
 *  예제01: 공연료 청구서 출력 프로그램
 *  공연, 공연료 청구서 정보가 있다.
 *  비극의 공연료는 40000원이고, 관객이 30명 초과되는 경우 초과인원당 1000원을 더 받는다.
 *  희극의 공연료는 30000원이고, 관객이 20명 초과되는 경우 기본 10000원 그리고 초과인원당 500원을 더 받는다.
 *  희극은 관객 인원수당 300원의 요금이 추가된다.
 *  30명 초과 인원에 대해 포인트를 적립한다.
 *  희극 관객 5명마다 추가 포인트를 제공한다.
 */

let plays = {
    "hamlet": {"name": "Hamlet", "type": "tragedy"},
    "as-like": {"name": "As You Like it", "type": "comedy"},
    "othello": {"name": "Othello", "type": "tragedy"}
}

let invoices = [
    {
        "customer": "BigCo",
        "performances": [
            {
                "playID": "hamlet",
                "audience": 55
            },
            {
                "playID": "as-like", 
                "audience": 35
            },
            {
                "playID": "othello",
                "audience": 40
            }    
        ]
    }
]

function statement(invoice, plays) {
    return renderPlainText(createStatementData(invoice, plays));
}

function htmlStatement(invoice, plays) {
    return renderHtml(createStatementData(invoice, plays));
}

function renderPlainText(data) {
    let result = `청구 내역 (고객명: ${data.customer})\n`;
    for (let perf of data.performances) {        
        // 청구 내역을 출력한다.
        result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`
    }
    result += `총액: ${usd(data.totalAmount)}\n`;
    result += `적립 포인트: ${data.totalVolumeCredits}점`;
    return result;
}

function renderHtml(data) {
    let result = `<h1>청구 내역 (고객명: ${data.customer})</h1>\n`;
    result += "<table>\n";
    result += "<tr><th>연극</th><th>금액</th><th>좌석 수</th></tr>"
    for (let perf of data.performances) {        
        result += `<tr><td>${perf.play.name}</td><td>${usd(perf.amount)}</td><td>(${perf.audience}석)</td></tr>\n`
    }
    result += "</table>\n";
    result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`;
    result += `<p>적립 포인트: <em>${data.totalVolumeCredits}</em>점</p>`;
    return result;
}

function createStatementData(invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    return statementData;

    function enrichPerformance(aPerformance) {
        const result = Object.assign({}, aPerformance);
        result.play = playFor(result);
        result.amount = amountFor(result);
        result.volumeCredits = volumeCreditsFor(result);
        return result;
    }

    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }

    function amountFor(aPerformance) {
        let result = 0;
        switch (aPerformance.play.type) {
        case "tragedy": //비극
            result = 40000;
            if (aPerformance.audience > 30) {
                result += 1000 * (aPerformance.audience - 30);
            }
            break;
        case "comedy": //희극
            result = 30000;
            if (aPerformance.audience > 20) {
                result += 10000 + 500 * (aPerformance.audience - 20);
            }
            result += 300 * aPerformance.audience;
            break;
        default:
            throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`);
        }
        return result;
    }

    function volumeCreditsFor(perf) {
        let result = 0;
        result += Math.max(perf.audience - 30, 0);
        if("comedy" == perf.play.type) result += Math.floor(perf.audience / 5);
        return result;
    }

    function totalVolumeCredits(data) {
        return data.performances.reduce((total, p)=> total + p.volumeCredits, 0);
    }

    function totalAmount(data) {
        return data.performances.reduce((total, p)=> total + p.amount, 0);;
    }
}

function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2}).format(aNumber/100);
}
console.log(statement(invoices[0], plays));
console.log(statement(invoices[0], plays));

