import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {

    try {

        const { userId, pokemon, action } = await req.json();

        if (!["bookmark", "like"].includes(action)) {

            return NextResponse.json({ message: "Invalid action" }, { status: 400 });

        }

        let user = await prisma.user.findUnique({ where: { auth0Id: userId } });

        if (!user) {

            user = await prisma.user.create({
                data: {
                    auth0Id: userId,
                    bookmarks: [],
                    liked: []
                }
            });

        }

        const fieldToUpdate = action === "bookmark" ? "bookmarks" : "liked";

        const currentItems = user[fieldToUpdate];

        let updateditems;

        if (currentItems.includes(pokemon)) {

            updateditems = currentItems.filter((item) => item !== pokemon);

        } else {

            updateditems = [...currentItems, pokemon];

        }

        await prisma.user.update({
            where: { auth0Id: userId },
            data: {
                [fieldToUpdate]: updateditems
            }
        });

        return NextResponse.json({
            toggledOff: currentItems.includes(pokemon),
            success: true,
            message: `Successfully ${action}ed ${pokemon}`
        });

    } catch (error) {

        console.log("Error In Linking Or Bookmarking", error);

        return NextResponse.json({ message: "An error coccured while processing your request" }, { status: 500 });

    }

};