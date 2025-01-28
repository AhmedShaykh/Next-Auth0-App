"use client";
import { UseGlobalContext } from "@/context/GlobalContext";
import PokemonCard from "@/Components/PokemonCard";
import SearchForm from "@/Components/SearchForm";
import Filters from "@/Components/Filters";
import { ArrowDown } from "lucide-react";

const Home = () => {

    const { pokemonListDetails, loading, loadMore } = UseGlobalContext();

    return (
        <>
            <section className="mt-10 flex items-center justify-center">
                <SearchForm />
            </section>

            <section>
                <Filters />
            </section>

            <section className="min-h-[91vh]">
                <div className="px-16 py-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {!loading && pokemonListDetails.map((pokemon: any, index: number) => {
                        return <PokemonCard key={index} pokemon={pokemon} />
                    })}
                </div>
            </section>

            {pokemonListDetails.length > 38 && (
                <div className="mt-4 mb-10 flex items-center justify-center">
                    <button
                        onClick={loadMore}
                        className="py-2 px-6 flex items-center gap-2 bg-[#6c5ce7] rounded-full shadow-md font-medium
                        hover:bg-green-400 text-white transition-all duration-300 ease-in-out"
                    >
                        <span className="text-left"><ArrowDown /></span>Load More
                    </button>
                </div>
            )}
        </>
    )
};

export default Home;