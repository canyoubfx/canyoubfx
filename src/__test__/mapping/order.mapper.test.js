
import { initialOrderBookMapper, bookUpdateMapper } from '../../mapping/order.mapper';
import book from '../helpers/initial.book';

it('Maps the initial order book correctly', () => {
    var orderBook = initialOrderBookMapper(book);
    console.log(orderBook)
    expect(orderBook.bids['6408'].price).toEqual(6408);
    expect(orderBook.bids['6408'].count).toEqual(6);
    expect(orderBook.bids['6408'].amount).toEqual(8.06450565);
});

it('Can can map an updated book message', () => {
    // const payload = [528476, 6408, 96, 127.25136772]
    // var orderBook = initialOrderBookMapper(book);
    // var update = bookUpdateMapper(orderBook, payload);
    // expect(update.bids['6408'].count).toEqual(6);
    // expect(update.bids['6408'].price).toEqual(6408);
    // expect(update.bids['6408'].amount).toEqual(8.06450565);
})