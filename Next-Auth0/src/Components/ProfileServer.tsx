import { getSession } from "@auth0/nextjs-auth0";

const ProfileServer = async () => {

    const session = await getSession();

    const user = session?.user;

    if (!user) {

        return null;

    }

    return user ? (
        <div className="flex flex-col justify-center gap-3">
            <img
                src={user.picture}
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

export default ProfileServer;