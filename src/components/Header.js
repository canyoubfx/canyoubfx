import React from 'react';
import Radium from 'radium';

const Header = () => (
    <nav style={styles.nav}>
        <h3 style={styles.h3}>Bitfinex</h3>
    </nav>
);

const styles = {
    nav : {
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 75,
        backgroundColor : '#333',
        color: 'white'
    },
    h3 :{
        fontWeight : 'normal'
    }
}

export default Radium(Header);