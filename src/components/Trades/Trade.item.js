import React, { PureComponent } from 'react';
import Radium from 'radium';

class TradeItem extends PureComponent {
    render() {
        const {timestamp, price, amount, type} = this.props;
        return (
            <div style={styles.row}>
                <div style={styles.col(type)}>{timestamp}</div>
                <div style={styles.col(type)}>{price}</div>
                <div style={styles.col(type)}>{amount}</div>
                <div style={styles.break}></div>
            </div>
        )
    }
}

const styles = {
    row: {
        border: 'solid 1px #ddd',
        display: 'flex',
        flexWrap: 'wrap'
    },
    col: (type) => {
        return {
            padding: 5,
            flex: 1,
            backgroundColor: type === 'buy' ? '#5cb85c' : '#d9534f'
        }
    },
    break: {
        width: '100%'
    }
}

export default Radium(TradeItem);