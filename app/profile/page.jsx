import Image from "next/image";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import profileDefault from "@/assets/images/profile.png";
import ProfileProperties from "@/components/ProfileProperties";
import { convertToSerializableObject } from "@/utils/convertToObject";
// component
const ProfilePage = async () => {
  // connect to DB and get session user
  await connectDB();
  const sessionUser = await getSessionUser();
  const { userId } = sessionUser;
  if (!userId) {
    throw new Error("User ID is required!");
  }
  const propertiesDocs = await Property.find({ owner: userId }).lean();
  const properties = propertiesDocs.map(convertToSerializableObject);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h2 className="text-2xl font-bold mb-4 pl-[70px] py-2 bg-purple-50">
            Your Profile
          </h2>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mt-10 mb-10 bg-purple-50">
              <div className="mb-4 p-5">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={sessionUser.user.image || profileDefault}
                  alt="User"
                  width={32}
                  height={32}
                />

                <h2 className="mb-4">
                  <span className="font-bold block">Name: </span>{" "}
                  {sessionUser.user?.name || "N/A"}
                </h2>
                <h2>
                  <span className="font-bold block">Email: </span>{" "}
                  {sessionUser.user?.email || "N/A"}
                </h2>
              </div>
            </div>

            <div className="md:w-3/4 md:pl-4 p-10">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              <ProfileProperties properties={properties} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
