import ProfileClient from "@/Components/ProfileClient";
import ProfileServer from "@/Components/ProfileServer";

const Profile = async () => {
    return (
        <div className="flex items-center justify-center w-full mt-10 px-44">
            <div className="flex items-center w-full justify-between">
                <div>
                    <h1 className="text-2xl mb-4">Client Component</h1>
                    <ProfileClient />
                </div>

                <div>
                    <h1 className="text-2xl mb-4">Server Component</h1>
                    <ProfileServer />
                </div>
            </div>
        </div>
    );
};

export default Profile;