import connectDB from "@/config/database";
import Property from "@/models/Property";
import FeaturedPropertyCard from "./FeaturedPropertyCard";

const FeaturedProperties = async () => {
  await connectDB();
  const properties = await Property.find({ is_featured: true }).lean();

  return properties.length > 0 ? (
    <section className="bg-gradient-to-r  to-indigo-100 px-4 py-6">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold text-purple-200 mb-8 text-center animate-fade-in">
          Featured Properties
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property._id} className="animate-fade-in-up">
              <FeaturedPropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  ) : null;
};

export default FeaturedProperties;
