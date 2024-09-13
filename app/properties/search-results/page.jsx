import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToObject";

const SearchResultsPage = async ({
  searchParams: { location, propertyType },
}) => {
  await connectDB();
  const locationPattern = new RegExp(location, "i");
  let query = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { "location.street": locationPattern },
      { "location.city": locationPattern },
      { "location.state": locationPattern },
      { "location.zipcode": locationPattern },
    ],
  };
  if (propertyType && propertyType !== "All") {
    const typePattern = new RegExp(propertyType, "i");
    query.type = typePattern;
  }

  const propertiesQueryResults = await Property.find(query).lean();
  const properties = convertToSerializableObject(propertiesQueryResults);

  // Convert properties object to an array
  const propertiesArray = Object.values(properties);

  return (
    <>
      <section className="bg-black py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="w-full max-w-2xl">
              <PropertySearchForm />
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <Link
            href="/properties"
            className="flex items-center text-purple-700 hover:underline mb-3"
          >
            <FaArrowAltCircleLeft className="mr-2" /> Back to properties
          </Link>
          <h2 className="text-3xl font-bold text-purple-500 mb-6 text-left">
            Search Results
          </h2>
          {propertiesArray.length === 0 ? (
            <p>No properties found for this search</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {propertiesArray.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage;
