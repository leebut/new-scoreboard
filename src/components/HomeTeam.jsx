function HomeTeam({
  dispatchHT,
  dispatchBatter,
  homeTeamPlayers,
  allBattersRuns,
  playerId,
}) {
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
            {allBattersRuns.map((batter) =>
              batter.id === player.id ? (
                <>
                  <span>
                    {batter.runs} {batter.balls}
                  </span>
                  <button
                    onClick={() =>
                      dispatchBatter({
                        type: "batter/out",
                        payload: { id: batter.id },
                      })
                    }
                  >
                    OUT
                  </button>
                </>
              ) : (
                ""
              )
            )}
            <button
              onClick={() =>
                dispatchHT({ type: "deleted/homePlayer", payload: player.id })
              }
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default HomeTeam;
