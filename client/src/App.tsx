import React from 'react';
import { RecordButton } from './components/RecordButton';
import './App.css';
import 'papercss/dist/paper.min.css';

function App() {
  return (
    <div className="App">
      <div className="paper container">
        <RecordButton />
      </div>
    </div>
  );
}

export default App;
