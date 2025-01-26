"use client";
import { SignupButton } from "./SignupButton";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

const NavBar = () => {

    const { user, error, isLoading } = useUser();

    return (
        <div className="py-4 flex w-full justify-between bg-gray-900 px-44">
            <div className="flex gap-8">
                <Link href="/">
                    Home
                </Link>

                <Link href="/profile">
                    Profile
                </Link>

                <Link href="/auth-protected">
                    Auth
                </Link>
            </div>

            <div className="flex gap-4">
                {!user && !isLoading && (
                    <>
                        <SignupButton />
                        <LoginButton />
                    </>
                )}

                {user && !isLoading && (
                    <>
                        <LogoutButton />
                    </>
                )}
            </div>
        </div>
    );
};

export default NavBar;