"use client";
import { useEffect, useState } from "react";
import { UseGlobalContext } from "@/context/GlobalContext";
import PokemonCard from "@/Components/PokemonCard";

const Favourites = () => {

    const { fetchPokemonByName, userDetails } = UseGlobalContext();

    const [likedPokemons, setLikedPokemons] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (userDetails?.liked) {

            setLoading(true);

            const fetchPokemons = async () => {

                const pokemonDetails = await Promise.all(userDetails.liked.map(async (pokemon: any) => {

                    const details = await fetchPokemonByName(pokemon);

                    return details;

                }));

                setLikedPokemons(pokemonDetails as any);

            };

            setLoading(false);

            fetchPokemons();

        }

    }, [userDetails?.liked]);

    if (loading) {
        return (
            <div className="h-[100vh] flex justify-center items-center">
                <div className="loader" />
            </div>
        );
    }

    return (
        <>
            {!loading && (
                <section className="min-h-[91vh]">
                    {likedPokemons.length > 0 ? (
                        <div className="px-16 py-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {likedPokemons.map((pokemon: any, index: number) => (
                                <PokemonCard key={pokemon.name + index} pokemon={pokemon} />
                            ))}
                        </div>
                    ) : (
                        <h2 className="text-center text-4xl font-bold text-gray-200 mt-40">
                            No Liked Pokemons
                        </h2>
                    )}
                </section>
            )}
        </>
    )
};

export default Favourites;