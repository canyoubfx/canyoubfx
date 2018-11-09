import PropTypes from 'prop-types';
import Radium from 'radium';
import React, { PureComponent } from 'react';

class OrderBookAsksItem extends PureComponent {
    render() {
        var { price, amount, count, total, min, max } = this.props;
        return (
            <div style={styles.row(total, min, max)}>
                <div style={styles.col}>{total}</div>
                <div style={styles.col}>{count}</div>
                <div style={styles.col}>{amount}</div>
                <div style={styles.col}>{price}</div>
            </div>
        )
    }
}

var styles = {
    row: (total, min, max) => {
        var perc = 10 + (total - min)/(max - min)*90;
        return {
            padding: 5,
            border: 'solid 1px #ddd',
            display: 'flex',
            background: 'linear-gradient(to left, #5cb85c ' + (perc) + '%, #fff ' + 0 + '%)',
        }
    },
    col: {
        flex: 1,
        textAlign: 'right'
    }
}

OrderBookAsksItem.propTypes = {
    orders: PropTypes.number,
    amount: PropTypes.number,
    total: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number
}

export default Radium(OrderBookAsksItem);