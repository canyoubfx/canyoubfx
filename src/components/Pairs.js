import React, { Component } from 'react';

class Pairs extends Component {

    handleChange = (event) => {
        const { tickerRequest } = this.props;
        tickerRequest(event.target.value);
        this.setState({
            selected: event.target.value.toUpperCase()
        });
    }

    render() {
        const { symbols } = this.props;
        return (
            symbols.symbols.length ?
                <select defaultValue={'btcusd'} onChange={this.handleChange}>
                    {
                        symbols.symbols.map(p => <option value={p} key={p}>{p}</option>)
                    }
                </select>
                : null
        )
    }
}

export default Pairs;