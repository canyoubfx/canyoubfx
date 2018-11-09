import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import OrderBookAskItem from './Orderbook.asks.item';
import OrderBookBidItem from './Orderbook.bids.item';
import OrderBookHead from './Orderbook.head';
import Loader from '../Loader/Loader';
import { last, first, sortBy } from 'lodash';
class OrderBook extends Component {

    state = {
        prec: 0
    }

    renderAsks(asks) {
        var mapped = [];
        Object.keys(asks).forEach(function (key) {
            mapped.push(asks[key]);
        });
        var sorted = sortBy(mapped, (m) => m.total);
        return sorted.map((i, k) =>
            (
                <div key={k}>
                    <OrderBookAskItem
                        price={i.price}
                        amount={i.amount}
                        count={i.count}
                        total={i.total}
                        min={first(sorted).total}
                        max={last(sorted).total}
                    />
                </div>
            )
        )
    }

    renderBids(asks) {
        var mapped = [];
        Object.keys(asks).forEach(function (key) {
            mapped.push(asks[key]);
        });
        var sorted = sortBy(mapped, (m) => m.total);
        return sorted.reverse().map((i, k) =>
            (
                <div key={k}>
                    <OrderBookBidItem
                        price={i.price}
                        amount={i.amount}
                        count={i.count}
                        total={i.total}
                        min={first(sorted).total}
                        max={last(sorted).total}
                    />
                </div>
            )
        )
    }

    handlePrecIncrease() {
        var prec = this.state.prec - 1;
        this.setState({ prec: prec })
        this.props.changePrecision(prec);
    }

    handlePrecDecrease() {
        var prec = this.state.prec + 1;
        this.setState({ prec: prec })
        this.props.changePrecision(prec);
    }

    render() {
        const { orders } = this.props;
        return (
            <section>
                <div>
                    <button disabled={this.state.prec === 0} onClick={this.handlePrecIncrease.bind(this)} style={styles.button}>Increase</button>
                    <button disabled={this.state.prec === 3} onClick={this.handlePrecDecrease.bind(this)} style={styles.button}>Decrease</button>
                </div>
                {!orders.isLoading ?
                    <div style={styles.flex}>
                        <div style={styles.column}>
                            <div style={styles.table}>
                                <OrderBookHead align={'right'} columns={['Total', 'Count', ' Amount', 'Price']} />
                                <div style={styles.break}></div>
                                <div style={styles.grow}>
                                    <div styles={styles.bg}>
                                        {this.renderBids(orders.bids)}
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div style={styles.column}>
                            <div style={styles.table}>
                                <OrderBookHead align={'left'} columns={['Price', 'Amount', 'Count', 'Total']} />
                                <div style={styles.break}></div>
                                <div style={styles.grow}>
                                    {this.renderAsks(orders.asks)}
                                </div>
                            </div>
                        </div>
                    </div>
                    : <Loader></Loader>}
            </section>
        )
    }

}

const styles = {
    flex: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    table: {
        borderCollapse: 'collapse',
        display: 'flex',
        flexWrap: 'wrap'
    },
    grow: {
        flex: 1
    },
    column: {
        border: 'solid 1px #ddd',
        flex: 1
    },
    break: {
        width: '100%'
    },
    textLeft: {
        textAlign: 'left'
    },
    row: {
        padding: 5,
        border: 'solid 1px #ddd',
        display: 'flex'
    },
    button: {
        marginBottom: 10
    },
    itemRow: (total, min, max) => {
        var perc = 10 + (total - min)/(max - min)*90;
        return {
            padding: 5,
            border: 'solid 1px #ddd',
            display: 'flex',
            background: 'linear-gradient(to right, #d9534f ' + (perc) + '%, #fff ' + 0 + '%)'
        }
    },
    col: {
        flex: 1,
        textAlign: 'left'
    }
}

OrderBook.propTypes = {
    orders: PropTypes.object
}

export default Radium(OrderBook);