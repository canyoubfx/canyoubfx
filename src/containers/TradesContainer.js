import Trades from '../components/Trades/Trades';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        trades : state.trades
    }
}

const mapDispatchToProps = () => {
    return {
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Trades);