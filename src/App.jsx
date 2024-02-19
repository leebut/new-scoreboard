import { useReducer } from "react";
import "./App.css";
import "./index.css";
import HomeTeam from "./components/HomeTeam";

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
    // case "hit/runs": {
    //   return {
    //     ...batterState,
    //     currBatterRuns: batterState.currBatterRuns + action.payload,
    //     currBatterBalls: Number(batterState.currBatterBalls + 1),
    //   };
    // }

    case "runs/scored": {
      const checkBatterExists = batterState.allBattersRuns.find(
        (batter) => batter.id === batterState.currBatterId
      );

      if (checkBatterExists) {
        console.log("Yep! Here! ", action.payload);
        return {
          ...batterState,
          allBattersRuns: batterState.allBattersRuns.map((batter) =>
            batter.id === batterState.currBatterId
              ? {
                  ...batter,
                  runs: Number(batter.runs) + action.payload,
                  balls: batter.balls + 1,
                }
              : batter
          ),
        };
      } else {
        console.log("Go ahead with ", action.payload);
        return {
          ...batterState,
          allBattersRuns: [
            ...batterState.allBattersRuns,
            { id: batterState.currBatterId, runs: action.payload, balls: 1 },
          ],
        };
      }
    }

    case "batter/out": {
      const checkBatterExists = batterState.allBattersRuns.find(
        (batter) => batter.id === batterState.currBatterId
      );

      if (checkBatterExists) {
        console.log("Yep! Here! ", action.payload);
        return {
          ...batterState,
          allBattersRuns: batterState.allBattersRuns.map((batter) =>
            batter.id === action.payload.id
              ? { ...batter, isOut: true }
              : batter
          ),
        };
      } else {
        return {
          ...batterState,
        };
      }
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

  const [{ allBattersRuns, currBatterId, currBatterName }, dispatchBatter] =
    useReducer(batterReducer, batterInitialState);

  const playerId = crypto.randomUUID();

  return (
    <>
      {/* ------------------------------ H O M E  T E A M ------------------------------ */}
      <HomeTeam
        dispatchAT={dispatchAT}
        dispatchBatter={dispatchBatter}
        dispatchHT={dispatchHT}
        homeTeamPlayers={homeTeamPlayers}
        allBattersRuns={allBattersRuns}
        playerId={playerId}
      />

      {/* ------------------------------ A W A Y  T E A M ------------------------------ */}

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
      <button
        onClick={() => {
          // dispatchBatter({ type: "hit/runs", payload: Number(0) }),
          dispatchBatter({ type: "runs/scored", payload: Number(0) });
        }}
      >
        Zero
      </button>
      <button
        onClick={() => {
          // dispatchBatter({ type: "hit/runs", payload: Number(1) }),
          dispatchBatter({ type: "runs/scored", payload: Number(1) });
        }}
      >
        1 run
      </button>
      <button
        onClick={() => {
          // dispatchBatter({ type: "hit/runs", payload: Number(2) }),
          dispatchBatter({ type: "runs/scored", payload: Number(2) });
        }}
      >
        2 runs
      </button>
      <button
        onClick={() => {
          // dispatchBatter({ type: "hit/runs", payload: Number(3) }),
          dispatchBatter({ type: "runs/scored", payload: Number(3) });
        }}
      >
        3 runs
      </button>
      <button
        onClick={() => {
          // dispatchBatter({ type: "hit/runs", payload: Number(4) }),
          dispatchBatter({ type: "runs/scored", payload: Number(4) });
        }}
      >
        4 runs
      </button>
      <button
        onClick={() => {
          // dispatchBatter({ type: "hit/runs", payload: Number(5) }),
          dispatchBatter({ type: "runs/scored", payload: Number(5) });
        }}
      >
        5 runs
      </button>
      <button
        onClick={() => {
          // dispatchBatter({ type: "hit/runs", payload: Number(6) }),
          dispatchBatter({ type: "runs/scored", payload: Number(6) });
        }}
      >
        6 runs
      </button>
    </>
  );
}

// -------------------------- S C O R E  B U T T O N S ------------------------------

export default App;
