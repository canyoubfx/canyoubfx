import Ticker from '../components/Ticker/Ticker';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        ticker: state.ticker
    }
}

const mapDispatchToProps = () => {
   return {
       
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ticker);