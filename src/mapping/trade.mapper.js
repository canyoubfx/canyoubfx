
import { last } from 'lodash';

export const initialTradeMapper = (trades) => {
    var mapped = last(trades).map((t) => mapRow(t));
    return mapped;
}

const mapRow = (args) => {    
    return {
        timestamp: new Date(args[1]).toLocaleTimeString(),
        price: args[3],
        amount: args[2],
        type: args[2] < 0 ? 'sell' : 'buy'
    }
}

export const mapTradeUpdate = (args, trades) => {
    var newTrade = {
        timestamp: new Date(args[1]).toLocaleTimeString(),
        price: args[3],
        amount: args[2],
        type: args[2] < 0 ? 'sell' : 'buy'
    }
    trades.unshift(newTrade);
    trades.pop();
    return trades;
}