import React from 'react';
import chat from './lib/chat';
import AppContainer from './AppContainer';

class App extends React.Component {
  constructor(props) {
    super(props);
    chat.init();
  }
  render() {
    
    return (
      <AppContainer />
      
    );
  }
}


export default App;
