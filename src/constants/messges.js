export const tickerMessage = (pair) => {
    return {
        "event": "subscribe",
        "channel": "ticker",
        "pair": pair
    }
}

export const orderBookMessage = (pair, prec = 'P0') => {
    return {
        "event": "subscribe",
        "channel": "book",
        "symbol": pair,
        "prec": prec,
        "freq": "F0",
        "len": 25
    }
}

export const tradeMessage = (pair) => {
    return {
        "event": "subscribe",
        "channel": "trades",
        "symbol": pair
    }
}

export const unsubscribe = (id) => {
    return {
        "event": "unsubscribe",
        "chanId": id
    }
}