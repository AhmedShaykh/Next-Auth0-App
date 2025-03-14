import { FC, useEffect, useState } from "react";
import { UseGlobalContext } from "@/context/GlobalContext";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { typeColor } from "@/lib/colors";
import { ArrowRight, Bookmark, Heart } from "lucide-react";
import Image from "next/image";

const PokemonCard: FC<any> = ({ pokemon }) => {

    const { performAction, userDetails } = UseGlobalContext();

    const isBookmarked = userDetails?.bookmarks?.includes(pokemon.name);

    const isLiked = userDetails?.liked?.includes(pokemon.name);

    const [bookmarked, setBookmarked] = useState(isBookmarked);

    const [liked, setLiked] = useState(isLiked);

    const { user } = useUser();

    const router = useRouter();

    useEffect(() => { setLiked(isLiked) }, [isLiked]);

    useEffect(() => { setBookmarked(isBookmarked) }, [isBookmarked]);

    return (
        <div className="relative p-4 bg-zinc-900 rounded-xl shadow-sm flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <div className="flex gap-4 bg-zinc-900 rounded-tl-xl rounded-tr-xl">
                    <button
                        className={`p-2 w-10 h-10 text-xl flex items-center justify-center rounded-full border-2 ${liked
                            ? "bg-[#fd4878]" : "text-gray-300 border-gray-300"}`}
                        onClick={() => {
                            if (user?.sub) {
                                setLiked((prev: boolean) => !prev);
                                performAction(user?.sub, pokemon?.name, "like");
                            } else {
                                router.push("/api/auth/login");
                            }
                        }}
                    >
                        {liked ? <Heart /> : <Heart />}
                    </button>

                    <button
                        className={`p-2 w-10 h-10 text-xl flex items-center justify-center rounded-full border-2 ${bookmarked
                            ? "bg-[#00b894]" : "text-gray-300 border-gray-300"}`}
                        onClick={() => {
                            if (user?.sub) {
                                setBookmarked((prev: boolean) => !prev);
                                performAction(user?.sub, pokemon?.name, "bookmark");
                            } else {
                                router.push("/api/auth/login");
                            }
                        }}
                    >
                        {bookmarked ? <Bookmark /> : <Bookmark />}
                    </button>
                </div>

                <button
                    className="p-2 w-10 h-10 text-xl flex items-center justify-center rounded-full border-2 text-gray-300 border-gray-300
                    hover:bg-[#00b894] hover:border-transparent hover:text-white transition-all duration-300 ease-in-out"
                    onClick={() => router.push(`/pokemon/${pokemon?.name}`)}
                >
                    <ArrowRight />
                </button>
            </div>

            <div className="flex gap-4">
                <div className="flex-1">
                    <Image
                        src={pokemon?.sprites?.other?.home?.front_default || pokemon?.sprites?.front_default}
                        alt="pokemon image"
                        width={200}
                        height={200}
                        className="object-contain"
                    />
                </div>

                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    <div className="mb-2 flex gap-2">
                        <p className="text-xs uppercase font-semibold text-gray-500">
                            {pokemon?.height} m,
                        </p>

                        <p className="text-xs uppercase font-semibold text-gray-500">
                            {pokemon?.weight} kg,
                        </p>

                        <p className="text-xs uppercase font-semibold text-gray-500">
                            {pokemon?.base_experience} xp
                        </p>
                    </div>

                    <h2 className="text-2xl text-gray-200 capitalize font-bold text-center">
                        {pokemon?.name}
                    </h2>

                    <div className="flex justify-center gap-2">
                        {pokemon?.types?.map((type: any, index: number) => (
                            <p
                                className="text-xs uppercase font-semibold text-white px-5 py-1 rounded-full"
                                style={{ backgroundColor: typeColor[type?.type?.name] }}
                                key={index}
                            >
                                {type.type.name}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PokemonCard;