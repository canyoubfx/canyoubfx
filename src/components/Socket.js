import Radium from 'radium';
import React from 'react';

class Socket extends React.Component {

    componentDidMount() {
        const { wssConnect, tickerRequest, symbolsRequest } = this.props;
        wssConnect();
        tickerRequest('btcusd');
        symbolsRequest();
    }

    handleKill() {
        var { socket, killSocket, wssConnect, tickerRequest, openSocket } = this.props;
        if (socket.connected) {
            killSocket();
        } else {
            openSocket();
            wssConnect();
            tickerRequest('btcusd');
        }
    }

    render() {
        var { socket } = this.props;
        return (
            <div>
                <div>Socket status : {socket.connected ? 'Connected' : 'Not connected'}</div>
                <button onClick={this.handleKill.bind(this)}>{socket.connected ? 'Kill socket' : 'Open socket'}</button>
            </div>

        )
    }
}

export default Radium(Socket);