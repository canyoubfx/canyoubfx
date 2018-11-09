import { chunk, sortBy, last, first } from 'lodash';

export const initialOrderBookMapper = (data) => {
    var chunks = chunk(data, data.length / 2);
    var bids = {};
    var asks = {};
    var bidsTotal = 0;
    var asksTotal = 0;
    var bidsSorted = sortBy(first(chunks), (c) => c[0]);
    var totals = bidsSorted.map((b) =>  bidsTotal += b[1]).reverse();
    bidsSorted.forEach((b, i) => {
        totals.push(bidsTotal += b[1]);
        bids[b[0]] = mapRow(b, totals[i]);
    });
    var asksSorted = sortBy(last(chunks), (c) => c[0]);
    asksSorted.forEach((a) => {
        asksTotal += a[1];
        asks[a[0]] = mapRow(a, asksTotal);
    });
    return { bids, asks };
}


const mapRow = (args, total) => {
    return {
        price: args[0],
        count: args[1],
        amount: Math.abs(args[2]),
        total: total
    }
}

export const bookUpdateMapper = (orderBook, payload) => {
    if (payload.length) {
        var price = payload[0];
        var count = payload[1];
        var amount = payload[2];
        if (count > 0) {
            if (amount > 0) {
                orderBook.bids[price.toString()] = mapRow([price, count, amount])
            } else {
                orderBook.asks[price.toString()] = mapRow([price, count, Math.abs(amount)])
            }
        } else {
            if (amount === 1) {
                delete orderBook.bids[price.toString()];
            } else {
                delete orderBook.asks[price.toString()];
            }
        }
        return mapTotals(orderBook);
    }
}

const mapTotals = (orderBook) => {
    var bidsTotal = 0;
    var asksTotal = 0;
    var totals = Object.keys(orderBook.bids).sort().map((b) =>  {
         return orderBook.bids[b].count;
    }).reverse();
    Object.keys(orderBook.bids).sort().reverse().forEach((bid, i) => {
        var line = orderBook.bids[bid];
        bidsTotal += totals[i];
        line.total = bidsTotal;
    })
    Object.keys(orderBook.asks).sort().forEach((ask) => {
        var line = orderBook.asks[ask];
        asksTotal += line.count;
        line.total = asksTotal;
    })
    return orderBook;
}


/*
//[264376, 0.00828, 11, 389.97820887]
when count > 0 then you have to add or update the price level
3.1 if amount > 0 then add/update bids
3.2 if amount < 0 then add/update asks
when count = 0 then you have to delete the price level.
4.1 if amount = 1 then remove from bids
4.2 if amount = -1 then remove from asks
*/