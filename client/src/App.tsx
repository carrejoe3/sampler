import React from 'react';
import { RecordButton } from './components/RecordButton';
import { Waveform } from './components/Waveform';
import './App.css';
import '../node_modules/papercss/dist/paper.min.css';

function App() {
  return (
    <div className="App">
      <div className="paper container">
        <RecordButton />
        <Waveform />
      </div>
    </div>
  );
}

export default App;
