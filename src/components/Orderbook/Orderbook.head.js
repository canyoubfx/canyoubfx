import React from 'react';
import Radium from 'radium';


const OrderBookHead = ({ columns, align }) => {
    return (
        <div style={styles.header}>
            {columns.map((c, i) =>
                <div style={styles[align]} key={i}>{c}</div>
            )}
        </div>

    )
}

const styles = {
    header: {
        backgroundColor: '#efefef',
        display: 'flex',
        flex: 1,
        border: 'solid 1px #ddd',
        padding: 5,
    },
    left: {
        textAlign: 'left',
        flex: 1
    },
    right: {
        textAlign: 'right',
        flex: 1
    }
}


export default Radium(OrderBookHead);
