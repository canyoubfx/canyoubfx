import PropTypes from 'prop-types';
import Radium from 'radium';
import React from 'react';

export const Ticker = ({ ticker }) => {
    return (
        <section>
            <h3>Ticker</h3>
            <div style={styles.ticker}>
                <div style={styles.row}>
                    {<span style={styles.muted}>Price</span>}
                    {<span style={styles.item}>{ticker.last_price}</span>}
                </div>
                <div style={styles.row}>
                    {<span style={styles.muted}>High</span>}
                    {<span style={styles.item}>{ticker.high}</span>}
                </div>
                <div style={styles.row}>
                    {<span style={styles.muted}>Low</span>}
                    {<span style={styles.item}>{ticker.low}</span>}
                </div>
                <div style={styles.row}>
                    {<span style={styles.muted}>Bid</span>}
                    {<span style={styles.item}>{ticker.bid}</span>}
                </div>
                <div style={styles.row}>
                    {<span style={styles.muted}>Ask</span>}
                    {<span style={styles.item}>{ticker.ask}</span>}
                </div>
                <div style={styles.row}>
                    {<span style={styles.muted}>Change</span>}
                    {<span style={styles.item}>{ticker.change}</span>}
                </div>
                <div style={styles.row}>
                    {<span style={styles.muted}>Change%</span>}
                    {<span style={styles.item}>{ticker.change_percent}</span>}
                </div>
                <div style={styles.row}>
                    {<span style={styles.muted}>Volume</span>}
                    {<span style={styles.item}>{ticker.volume}</span>}
                </div>
            </div>
        </section>
    )
}

const styles = {
    row: {
        display: 'flex',
        margin: 3
    },
    muted: {
        color: '#777',
        flex: 1
    },
    item: {
        paddingBottom: 5,
        display: 'inline-flex',
        flex: 1
    },
    ticker: {
        marginTop: 10,
        border: 'solid 1px #ddd',
        padding: 5,
        width: 500
    }
}

Ticker.propTypes = {
    ticker: PropTypes.object.isRequired,
    seleted : PropTypes.string
}

export default Radium(Ticker);

