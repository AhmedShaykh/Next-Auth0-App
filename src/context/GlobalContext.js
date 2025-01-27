import React, { createContext, useEffect } from "react";
import { UsePokemonData } from "./UsePokemonData";
import { UseUserData } from "./UseUserData";
import { useUser } from "@auth0/nextjs-auth0/client";

const GloablContext = createContext();

export const GlobalContextProvider = ({ children }) => {

    const { user } = useUser();

    const {
        loading,
        fetchPokemon,
        pokemonList,
        pokemonListDetails,
        fetchPokemonByName,
        activePokemon,
        loadMore,
        searchQuery,
        handleSearchChange,
        handleFilterChange,
        filters,
        clearFilters
    } = UsePokemonData();

    const { userDetails, performAction, fetchUserDetails } = UseUserData();

    useEffect(() => {

        if (user) fetchUserDetails();

    }, [user]);

    return (
        <GloablContext.Provider
            value={{
                loading,
                fetchPokemon,
                pokemonList,
                pokemonListDetails,
                fetchPokemonByName,
                activePokemon,
                loadMore,
                userDetails,
                performAction,
                searchQuery,
                handleSearchChange,
                handleFilterChange,
                filters,
                clearFilters
            }}
        >
            {children}
        </GloablContext.Provider>
    )

};

export const UseGlobalContext = () => {
    return React.useContext(GloablContext);
};