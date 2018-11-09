import React from 'react';
import ReactDOM from 'react-dom';
import Socket from '../../components/Socket';

var testProps = {
  wssConnect: () => { },
  tickerRequest: () => { },
  symbolsRequest : () => {},
  socket: {
    connected: true
  }
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Socket {...testProps} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
