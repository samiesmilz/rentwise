import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

const SavedPropertiesPage = async () => {
  const { userId } = await getSessionUser();
  const { bookmarks } = await User.findById(userId).populate("bookmarks");

  return (
    <section className="px-4 py-6">
      <div className="container lg:container m-auto px-4 py-6">
        <h2 className="text-3xl font-bold text-purple-500 mb-6 text-left">
          Saved Properties
        </h2>
        {bookmarks.length === 0 ? (
          <p>No saved properties.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bookmarks.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
