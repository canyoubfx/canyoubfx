import Pairs from '../components/Pairs';
import { connect } from 'react-redux';
import { TICKER_REQUEST } from '../actions'

const mapStateToProps = (state) => {
    return {
        symbols : state.symbols,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        tickerRequest: (payload) => dispatch({ type: TICKER_REQUEST, payload })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pairs);