import Orderbook from '../components/Orderbook/Orderbook';
import { connect } from 'react-redux';
import { CHANGE_PRECISION } from '../actions'

const mapStateToProps = (state) => {
    return {
        orders : state.orders
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changePrecision : (payload) => dispatch({type : CHANGE_PRECISION, payload})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orderbook);