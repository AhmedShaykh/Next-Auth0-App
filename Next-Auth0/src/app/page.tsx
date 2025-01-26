import { getSession } from "@auth0/nextjs-auth0";

const Home = async () => {

    const session = await getSession();

    const user = session?.user;

    return (
        <>
            {user ? (
                <div className="flex justify-center items-center mt-40">
                    <p className="text-3xl">{user.name}</p>
                </div>
            ) : (
                <div className="flex justify-center items-center mt-40">
                    <p className="text-3xl">Home</p>
                </div>
            )}
        </>
    )
};

export default Home;