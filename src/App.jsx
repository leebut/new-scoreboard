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

function homeTeamReducer(homeTeamState, action) {
  switch (action.type) {
    case "added/homePlayer": {
      return {
        ...homeTeamState,
        homeTeamPlayers: [...homeTeamState.homeTeamPlayers, action.payload],
      };
    }
    case "deleted/homePlayer": {
      return {
        ...homeTeamState,
        homeTeamPlayers: homeTeamState.homeTeamPlayers.filter(
          (player) => player.id !== action.payload
        ),
      };
    }
    default:
      return new Error("You cannot do that.");
  }
}

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

const batterInitialState = {
  allBattersRuns: [],
  currBatterId: "",
  currBatterName: "",
  currBatterRuns: 0,
  currBatterBalls: 0,
};
function batterReducer(batterState, action) {
  switch (action.type) {
    case "faced/ballBatter": {
      return {
        ...batterState,
        currBatterId: action.payload.id,
        currBatterName: action.payload.name,
      };
    }
    case "hit/runs": {
      return {
        ...batterState,
        currBatterRuns:
          Number(batterState.currBatterRuns) + Number(action.payload),
        currBatterBalls: Number(batterState.currBatterBalls + 1),
        
        allBattersRuns: [
          {
            id: batterState.currBatterId,
            runs: Number(batterState.currBatterRuns) + Number(action.payload),
            balls: Number(batterState.currBatterBalls) + 1,
          },
        ]
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

  const [
    {
      allBattersRuns,
      currBatterId,
      currBatterName,
      currBatterRuns,
      currBatterBalls,
    },
    dispatchBatter,
  ] = useReducer(batterReducer, batterInitialState);

  const playerId = crypto.randomUUID();

  return (
    <>
      {/* ------------------------------ H O M E  T E A M ------------------------------ */}

      <h1>Home Team</h1>
      <input
        type="text"
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            dispatchHT({
              type: "added/homePlayer",
              payload: { id: playerId, name: e.target.value },
            });
          }
        }}
      />

      <ul>
        {homeTeamPlayers.map((player, idx) => (
          <li key={player.id}>
            {`${idx + 1} ${player.name}`}{" "}
            <button
              onClick={() =>
                dispatchBatter({
                  type: "faced/ballBatter",
                  payload: { id: player.id, name: player.name },
                })
              }
            >
              Batting
            </button>
            <button
              onClick={() =>
                dispatchHT({ type: "deleted/homePlayer", payload: player.id })
              }
            >
              Remove
            </button>
          </li>
        ))}
        {/* dispatchHT({type: "took/playerBatting", payload: {currentBatter: true, playerId: player.id }})} */}
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
      <br />
      <button onClick={() => dispatchBatter({ type: "hit/runs", payload: 1 })}>
        1 run
      </button>
      <button onClick={() => dispatchBatter({ type: "hit/runs", payload: 2 })}>
        2 runs
      </button>
      <button onClick={() => dispatchBatter({ type: "hit/runs", payload: 3 })}>
        3 runs
      </button>
      <button onClick={() => dispatchBatter({ type: "hit/runs", payload: 4 })}>
        4 runs
      </button>
      <button onClick={() => dispatchBatter({ type: "hit/runs", payload: 5 })}>
        5 runs
      </button>
      <button onClick={() => dispatchBatter({ type: "hit/runs", payload: 6 })}>
        6 runs
      </button>
    </>
  );
}

// -------------------------- S C O R E  B U T T O N S ------------------------------

export default App;
