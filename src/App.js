import Footer from './components/Footer';
import Header from './components/Header';
import React, { Component } from 'react';
import Radium from 'radium';
import OrderbookContainer from './containers/OrderbookContainer';
import TickerContainer from './containers/TickerContainer';
import TradesContainer from './containers/TradesContainer';
import PairsContainer from './containers/PairsContainer';
import SocketContainer from './containers/SocketContainer';

export class App extends Component {

  render() {
    return (
      <div className="App" style={styles.app}>
        <Header></Header>
        <section style={styles.home}>
          <SocketContainer></SocketContainer>
          <br/>
          <PairsContainer></PairsContainer>
          <TickerContainer></TickerContainer>
          <hr style={styles.hr} />
          <div style={styles.flex}>
            <div style={styles.book}>
              <h3>Book</h3>
              <OrderbookContainer />
            </div>
            <div style={styles.trades}>
              <h3>Trades</h3>
              <TradesContainer />
            </div>
          </div>
        </section>
        <Footer></Footer>
      </div>
    );
  }
}

const styles = {
  app: {
    fontFamily: 'Roboto, sans-serif'
  },
  home: {
    padding: 20
  },
  hr: {
    border: 'solid 1px #ddd',
    margin: '20px 0',
    display: 'block'
  },
  flex: {
    display: 'flex'
  },
  book: {
    flex: '2 1'
  },
  trades: {
    flex: '1 1'
  }
}

export default Radium(App);
