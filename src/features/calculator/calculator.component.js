import React from 'react';
import './calculator.component.css';
import { CogsList, GagsPicker } from './components';


export default function CalculatorComponent() {
  return (
    <>
      {/* <div className="wrapper">
        <h2>Calculator</h2>
      </div> */}
      <GagsPicker />
      <CogsList />
    </>
  );
}