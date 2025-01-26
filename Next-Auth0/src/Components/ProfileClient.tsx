"use client";
import { useUser } from "@auth0/nextjs-auth0/client";

const ProfileClient = () => {

    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>{error.message}</div>;

    return user ? (
        <div className="flex flex-col justify-center gap-3">
            <img // @ts-ignore
                src={user.picture} // @ts-ignore
                alt={user.name}
            />

            <h2 className="text-lg">{user.name}</h2>

            <p>{user.email}</p>
        </div>
    ) : (
        <div className="flex justify-center items-center mt-40">
            <h2 className="text-lg">
                No User Logged In!
            </h2>
        </div>
    );
};

export default ProfileClient;