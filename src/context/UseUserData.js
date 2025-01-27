import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";
import axios from "axios";

export const UseUserData = () => {

    const { user } = useUser();

    const [userDetails, setUserDetails] = useState(null);

    const fetchUserDetails = async () => {

        if (!user) return;

        try {

            const res = await axios.get(`/api/user/${user.sub}`);

            setUserDetails(res.data);

        } catch (error) {

            console.log("Error in fetchUserDetails", error);

        }

    };

    const performAction = async (userId, pokemon, action) => {

        try {

            setUserDetails((prev) => {

                const updatedBookmarks = action === "bookmark" ? prev.bookmarks.includes(pokemon)
                    ? prev.bookmarks.filter((p) => p !== pokemon)
                    : [...prev.bookmarks, pokemon]
                    : prev.bookmarks;

                const updatedLikes = action === "like" ? prev.liked.includes(pokemon)
                    ? prev.liked.filter((p) => p !== pokemon)
                    : [...prev.liked, pokemon]
                    : prev.liked;

                return {
                    ...prev,
                    bookmarks: updatedBookmarks,
                    liked: updatedLikes
                };

            });

            await axios.post("/api/pokemon", { userId, pokemon, action });

        } catch (error) {

            console.log("Error in performAction", error);

            fetchUserDetails(userId);

        }

    };

    return { userDetails, performAction, fetchUserDetails };

};