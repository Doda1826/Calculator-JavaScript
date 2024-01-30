import './App.css';
import { useState, useCallback, useMemo } from 'react'
import { evaluate } from 'mathjs'

function App() {
  const [displayText, setDisplayText] = useState('0'); 

  const CALCULATOR = useMemo(() => [
    {
      sign: '.',
      id: 'decimal',
      numberOrOperator: 'decimal'
    },
    {
      sign: '=',
      id: 'equals',
      numberOrOperator: 'operator'
    },
    {
      sign: '+',
      id: 'add',
      numberOrOperator: 'operator'
    },
    {
      sign: '-',
      id: 'subtract',
      numberOrOperator: 'operator'
    },
    {
      sign: 1,
      id: 'one',
      numberOrOperator: 'number'
    },
    {
      sign: 2,
      id: 'two',
      numberOrOperator: 'number'
    },
    {
      sign: 3,
      id: 'three',
      numberOrOperator: 'number'
    },
    {
      sign: '*',
      id: 'multiply',
      numberOrOperator: 'operator'
    },
    {
      sign: 4,
      id: 'four',
      numberOrOperator: 'number'
    },
    {
      sign: 5,
      id: 'five',
      numberOrOperator: 'number'
    },
    {
      sign: 6,
      id: 'six',
      numberOrOperator: 'number'
    },
    {
      sign: '/',
      id: 'divide',
      numberOrOperator: 'operator'
    },
    {
      sign: 7,
      id: 'seven',
      numberOrOperator: 'number'
    },
    {
      sign: 8,
      id: 'eight',
      numberOrOperator: 'number'
    },
    {
      sign: 9,
      id: 'nine',
      numberOrOperator: 'number'
    },
    {
      sign: 0,
      id: 'zero',
      numberOrOperator: 'number'
    }
  ], []) 

  const showText = useCallback((selector) => {
    const character = CALCULATOR.find((char) => char.sign === selector);
  
    if (character.numberOrOperator === 'number') {
      if (displayText === '0' || displayText === 'Error') {
        setDisplayText(character.sign.toString());
      } else {
        setDisplayText((prevDisplay) => {
          return prevDisplay + character.sign;
        });
      }
    } else if (character.numberOrOperator === 'operator') {
      setDisplayText((prevDisplay) => {
        const lastInput = prevDisplay.split(' ').pop();
        const operators = ['+', '-', '*', '/'];
  
        if (lastInput === '' || (lastInput === '-' && character.sign !== '-')) {
          return prevDisplay.slice(0, -2) + ' ' + character.sign + ' ';
        } else if (operators.includes(lastInput)) {
          return prevDisplay.slice(0, -1) + character.sign + ' ';
        } else {
          return prevDisplay + ' ' + character.sign + ' ';
        }
      });
  
      if (character.sign === '=') {
        try {
          const result = evaluate(displayText); 
          setDisplayText(result.toFixed(10).replace(/\.?0+$/, ''));
        } catch (error) {
          setDisplayText('Error');
        }
      }
    } else if (character.id === 'decimal') {
      setDisplayText((prevDisplay) => {
        const lastInput = prevDisplay.split(' ').pop();
        return (lastInput.includes('.') || lastInput === '') ? prevDisplay : prevDisplay + '.';
      });
    }
  }, [CALCULATOR, displayText]);

  const handleClear = () => {
    setDisplayText('0')
  }

  return (
    <div className="App">
      <div id='calculator-javascript'>
        <div id='display'>{displayText}</div>
        <div className='characters'>
          {CALCULATOR.map((character) => 
          <div
          onClick={() => {showText(character.sign)}} 
          className={`character ${character.numberOrOperator}`} 
          id={character.id}
          key={character.id}>
            {character.sign}
          </div>
        )}</div>
        <div 
        onClick={handleClear}
        id='clear'>AC</div>
      </div>
    </div>
  );
}

export default App;
