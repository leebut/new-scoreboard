import { createContext, useContext } from "react";

const TeamsContext = createContext();

function TeamsProvider({children}) {
    // logic goes here
    return (
        <TeamsContext.Provider value={{}}>
            {children}
        </TeamsContext.Provider>
    )
}

function useTeams(){
    const context = useContext(TeamsContext);
    if (context === undefined)
    throw new Error("CitiesContext used outside of CitiesProvider");
    return context;
}

export {TeamsProvider, useTeams}
