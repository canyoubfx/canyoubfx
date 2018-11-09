import Socket from '../components/Socket';
import { connect } from 'react-redux';
import { CHANNEL_INIT, TICKER_REQUEST, SYMBOLS_REQUEST, SOCKET_KILL, SOCKET_OPEN } from '../actions'

const mapStateToProps = (state) => {
    return {
        socket: state.socket
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        wssConnect: () => dispatch({ type: CHANNEL_INIT }),
        tickerRequest: (payload) => dispatch({ type: TICKER_REQUEST, payload }),
        symbolsRequest: () => dispatch({ type: SYMBOLS_REQUEST }),
        killSocket: () => dispatch({ type: SOCKET_KILL }),
        openSocket: () => dispatch({ type: SOCKET_OPEN })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Socket);