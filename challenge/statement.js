import { createStatementData } from './createStatementData.js';

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}

function htmlStatement(invoice, plays) {
  return renderHTML(createStatementData(invoice, plays));
}

function renderPlainText(data) {
  let result = `청구 내역 (고객명: ${data.customer})\n`;
  for (let performance of data.performances) {
    result += `  ${performance.play.name}: ${usd(performance.amount / 100)} (${
      performance.audience
    }석)\n`;
  }
  result += `총액: ${usd(data.totalAmount / 100)}\n`;
  result += `적립 포인트: ${data.totalCredits}점\n`;
  return result;
}

function renderHTML(data) {
  let result = `<h1>청구 내역 (고객명: ${data.customer})</h1>\n`;
  result += '<table>\n';
  result += '<tr><th>play</th><th>석</th><th>cost</th></tr>';
  for (let performance of data.performances) {
    result += `  <tr><td>${performance.play.name}</td>`;
    result += `<td>${performance.audience}</td>`;
    result += `<td>${usd(performance.amount / 100)}</td></tr>\n`;
  }
  result += '</table>\n';
  result += `<p>총액: <em>${usd(data.totalAmount / 100)}</em></p>\n`;
  result += `<p>적립 포인트: <em>${data.totalCredits}</em>점</p>\n`;
  return result;
}

function usd(number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(number);
}

// 사용예:
const playsJSON = {
  hamlet: { name: 'Hamlet', type: 'tragedy' },
  'as-like': { name: 'As You Like It', type: 'comedy' },
  othello: { name: 'Othello', type: 'tragedy' },
};

const invoicesJSON = [
  {
    customer: 'BigCo',
    performances: [
      {
        playID: 'hamlet',
        audience: 55,
      },
      {
        playID: 'as-like',
        audience: 35,
      },
      {
        playID: 'othello',
        audience: 40,
      },
    ],
  },
];

const plainText = statement(invoicesJSON[0], playsJSON);
const html = htmlStatement(invoicesJSON[0], playsJSON);
const expectedText =
  '청구 내역 (고객명: BigCo)\n' +
  '  Hamlet: $650.00 (55석)\n' +
  '  As You Like It: $580.00 (35석)\n' +
  '  Othello: $500.00 (40석)\n' +
  '총액: $1,730.00\n' +
  '적립 포인트: 47점\n';

const expectedHtml =
  `<h1>청구 내역 (고객명: BigCo)</h1>\n` +
  `<table>\n` +
  `<tr><th>play</th><th>석</th><th>cost</th></tr>  <tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>\n` +
  `  <tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>\n` +
  `  <tr><td>Othello</td><td>40</td><td>$500.00</td></tr>\n` +
  `</table>\n` +
  `<p>총액: <em>$1,730.00</em></p>\n` +
  `<p>적립 포인트: <em>47</em>점</p>\n`;

console.log(expectedText);
console.log(plainText);
console.log(expectedText === plainText);
console.log('========================');
console.log(expectedHtml);
console.log(html);
console.log(expectedHtml === html);
