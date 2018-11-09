import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import Loader from '../Loader/Loader';
import TradeItem from './Trade.item';

const Trades = ({ trades }) => {
    return (
        <div>

            {!trades.isLoading ?
                <div>
                    {
                        trades.trades.map((t, i) =>
                            <div key={i}>
                                <TradeItem 
                                    timestamp={t.timestamp}
                                    price={t.price}
                                    amount={t.amount}
                                    type={t.type}
                                ></TradeItem>
                            </div>
                        )
                    }
                </div>
                : <Loader></Loader>}
        </div>
    )
}

Trades.propTypes = {
    trades: PropTypes.object
}

export default Radium(Trades);