import React, { useReducer } from 'react';
import './style.css';

const initialState = {
  counter: 0,
  date: new Date(),
};

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'RESET':
      return initialState.counter;
    default:
      return state;
  }
};

const dateReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATE':
      return action.payload;
    default:
      return state;
  }
};

const combineReducers = (reducers) => {
  return (state = {}, action) => {
    const newState = {};
    for (let key in reducers) {
      newState[key] = reducers[key](state[key], action);
    }
    return newState;
  };
};

export default function App() {
  const [state, dispatch] = useReducer(
    combineReducers({
      counter: counterReducer,
      date: dateReducer,
    }),
    initialState
  );

  const { counter, date } = state;

  return (
    <>
      <h1 style={{ textAlign: 'center', color: 'blueviolet' }}>
        Combine Reducers
      </h1>
      <div className="combineReducers">
        <div className="counterReducer">
          <h3>Counter Reducer</h3>
          <div className="counter">
            <button
              onClick={() => dispatch({ type: 'INCREMENT' })}
              className="sign"
            >
              +
            </button>
            <button
              onClick={() => dispatch({ type: 'DECREMENT' })}
              className="sign"
            >
              -
            </button>
            <button
              onClick={() => dispatch({ type: 'RESET' })}
              className="reset"
            >
              Reset
            </button>
          </div>
          <p>
            Counter Value - <strong>{counter.toString()}</strong>
          </p>
        </div>

        <div className="dateReducer">
          <h3>Date Reducer</h3>
          <div className="date">
            <button
              className="set-time"
              onClick={() =>
                dispatch({ type: 'SET_DATE', payload: new Date() })
              }
            >
              Set Time
            </button>
            <p>
              Time value -{' '}
              <strong>
                {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
              </strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
