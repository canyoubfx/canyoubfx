import { initialTradeMapper, mapTradeUpdate } from '../../mapping/trade.mapper';
import trades from '../helpers/initial.trades';

it('Can map the trades', () => {
    var response = initialTradeMapper(trades);
    expect(response[0].price).toEqual(6428.7);
});

it('Can map a new trade', () => {
    var payload = [309996974, 1541758113616, 0.00897273, 6428.60787193]
    var response = mapTradeUpdate(payload, [{
        timestamp: 309749367,
        price: 6533.4,
        amount: 0.17992,
        type: 'buy'
    }]);
    expect(response[0].timestamp).toEqual('10:08:33 AM');
})