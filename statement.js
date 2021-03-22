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