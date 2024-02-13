import { useReducer } from 'react';
import './App.css';
import './index.css';

const homeTeamInitialState = {
  homeTeamBatting: true,
  homeTeamName: '',
  homeTeamPlayers: [],
  homeTeamScore: 0,
  homeTeamExtras: { noballs: 0, wides: 0 },
  homeTeamWickets: 0,
  homeTeamOvers: 0,
  homeTeamRuns: 0,
};

const awayTeamInitialState = {
  awayTeamBatting: false,
  awayTeamName: '',
  awayTeamPlayers: [],
  awayTeamScore: 0,
  awayTeamExtras: { noballs: 0, wides: 0 },
  awayTeamWickets: 0,
  awayTeamOvers: 0,
  awayTeamRuns: 0,
};

function homeTeamReducer(state, action) {
  switch (action.type) {
    case 'added/homePlayer': {
      return {
        ...state,
        homeTeamPlayers: [...state.homeTeamPlayers, action.payload],
      };
    }
  }
}

function awayTeamReducer(state, action) {
  switch (action.type) {
    case 'added/awayPlayer': {
      return {
        ...state,
        awayTeamPlayers: [...state.awayTeamPlayers, action.payload],
      };
    }
  }
}

function App() {
  const [
    {
      homeTeamBatting,
      homeTeamName,
      homeTeamPlayers,
      homeTeamScore,
      homeTeamExtras,
      homeTeamWickets,
      homeTeamOvers,
      homeTeamRuns,
    },
    dispatch,
  ] = useReducer(homeTeamReducer, homeTeamInitialState);

  const [
    {
      awayTeamBatting,
      awayTeamName,
      awayTeamPlayers,
      awayTeamScore,
      awayTeamExtras,
      awayTeamWickets,
      awayTeamOvers,
      awayTeamRuns,
    },
    dispatch1,
  ] = useReducer(awayTeamReducer, awayTeamInitialState);
  return (
    <>
      <h1>Page One </h1>
      <button
        onClick={() =>
          dispatch({ type: 'added/homePlayer', payload: 'Leggo Logran' })
        }
      >
        Add Home Player
      </button>
      <button
        onClick={() =>
          dispatch1({ type: 'added/awayPlayer', payload: 'Savage Socks' })
        }
      >
        Add Away Player
      </button>
    </>
  );
}

export default App;
