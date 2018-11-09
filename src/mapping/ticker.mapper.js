export function tickerMapper(data) {
    return {
        bid: data[0],
        bid_size: data[1],
        ask: data[2],
        ask_size: data[3],
        change: data[4],
        change_percent: parseFloat((data[5] * 100)).toFixed(2) + '%',
        last_price: data[6],
        volume: data[7],
        high: data[8],
        low: data[9],
    }
}


