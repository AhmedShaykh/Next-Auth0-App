"use client";
import { UseGlobalContext } from "@/context/GlobalContext";
import { Search } from "lucide-react";

const SearchForm = () => {

    const { searchQuery, handleSearchChange } = UseGlobalContext();

    return (
        <form className="relative w-[80%] md:w-[50%]">
            <input
                className="u-shadow-1 w-full py-5 px-6 rounded-xl text-lg outline-none text-gray-200"
                placeholder="Search Pokemon!"
                onChange={handleSearchChange}
                value={searchQuery}
                type="text"
            />

            <span className="absolute right-6 text-3xl top-[50%] translate-y-[-50%] text-gray-300 pointer-events-none">
                <Search />
            </span>
        </form>
    )
};

export default SearchForm;