import { useReducer } from "react";
import "./App.css";
import "./index.css";

const homeTeamInitialState = {
  homeTeamBatting: true,
  homeTeamName: "Savage",
  homeTeamPlayers: [],
  homeTeamScore: 0,
  homeTeamExtras: { noballs: 0, wides: 0 },
  homeTeamWickets: 0,
  homeTeamOvers: 0,
  homeTeamRuns: 0,
};

const awayTeamInitialState = {
  awayTeamBatting: false,
  awayTeamName: "",
  awayTeamPlayers: [],
  awayTeamScore: 0,
  awayTeamExtras: { noballs: 0, wides: 0 },
  awayTeamWickets: 0,
  awayTeamOvers: 0,
  awayTeamRuns: 0,
};

function homeTeamReducer(homeTeamState, action) {
  switch (action.type) {
    case "added/homePlayer": {
      return {
        ...homeTeamState,
        homeTeamPlayers: [...homeTeamState.homeTeamPlayers, action.payload],
      };
    }
    case "deleted/homePlayer": {
      return {...homeTeamState, homeTeamPlayers: homeTeamState.homeTeamPlayers.filter(player => player.id !== action.payload)}

    }
    default: return new Error("You cannot do that.")
  }
}

function awayTeamReducer(awayTeamState, action) {
  switch (action.type) {
    case "added/awayPlayer": {
      return {
        ...awayTeamState,
        awayTeamPlayers: [...awayTeamState.awayTeamPlayers, action.payload],
      };
    }
  }
}

function App() {
  const [
    {
      //     homeTeamBatting,
      homeTeamName,
      homeTeamPlayers,
      //     homeTeamScore,
      //     homeTeamExtras,
      //     homeTeamWickets,
      //     homeTeamOvers,
      //     homeTeamRuns,
    },
    dispatchHT,
  ] = useReducer(homeTeamReducer, homeTeamInitialState);

  const homeTeamList = homeTeamPlayers;

  const [
    {
    //   awayTeamBatting,
      awayTeamName,
      awayTeamPlayers,
    //   awayTeamScore,
    //   awayTeamExtras,
    //   awayTeamWickets,
    //   awayTeamOvers,
    //   awayTeamRuns,
     },
        dispatchAT,
  ] = useReducer(awayTeamReducer, awayTeamInitialState);

  const playerId = crypto.randomUUID();

  return (
    <>
    {/* ------------------------------ H O M E  T E A M ------------------------------ */}
      
      <h1>Home Team</h1>
      <input
        type="text"
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            dispatchHT({ type: "added/homePlayer", payload: {"id": playerId, "name": e.target.value }});
          }
        }}
      />

<ul>
{homeTeamPlayers.map((player, idx) => (
  <li key={player.id}>{`${idx + 1} ${player.name}`} <button onClick={() => dispatchHT({type: "took/playerBatting", payload: true})}>Batting</button><button onClick={() => dispatchHT({type: "deleted/homePlayer", payload: player.id})}>Remove</button></li>
))}
    </ul>  

{/* ------------------------------ A W A Y  T E A M ------------------------------ */}
<p>away team list here</p>
      <h1>Away Team</h1>
      <input
        type="text"
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            dispatchAT({ type: "added/awayPlayer", payload: e.target.value });
          }
        }}
      />


      
    </>
  );
}

export default App;
