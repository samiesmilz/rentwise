import Image from "next/image";
import Link from "next/link";
import { FaBed, FaBath, FaRulerCombined, FaMapMarker } from "react-icons/fa";

const FeaturedPropertyCard = ({ property }) => {
  const getRateDisplay = () => {
    const { rates } = property;
    if (rates.monthly) {
      return `$${rates.monthly.toLocaleString()}/mo`;
    } else if (rates.weekly) {
      return `$${rates.weekly.toLocaleString()}/wk`;
    } else if (rates.nightly) {
      return `$${rates.nightly.toLocaleString()}/night`;
    }
  };

  return (
    <Link href={`/properties/${property._id}`} className="block">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 relative group cursor-pointer">
        <div className="relative w-full h-[300px]">
          <Image
            src={property.images[0]}
            alt={property.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute top-2 left-0 bg-black text-purple-50 px-4 py-1 shadow-md rounded-e-md text-sm">
            <span className="text-xs">Featured</span>
          </div>
        </div>
        <div className="absolute top-2 right-2 bg-purple-500 px-3 py-1 rounded-full text-white font-bold text-sm">
          {getRateDisplay()}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 m-4 rounded-md bg-white bg-opacity-80 transition-all duration-300 group-hover:bg-opacity-90 group-hover:bg-purple-50">
          <h3 className="text-lg font-bold truncate mb-2">{property.name}</h3>
          <div className="flex flex-wrap justify-between text-sm text-slate-800 mb-3">
            <p className="w-1/2 inline-flex items-center">
              <i className="fas fa-home mr-1"></i> {property.type}
            </p>
            <p className="w-1/2 inline-flex items-center">
              <FaBed className="mr-1" /> {property.beds} Beds
            </p>
            <p className="w-1/2 inline-flex items-center">
              <FaBath className="mr-1" /> {property.baths} Baths
            </p>
            <p className="w-1/2 inline-flex items-center">
              <FaRulerCombined className="mr-1" /> {property.square_feet} sqft
            </p>
          </div>
          <div className="flex items-center text-sm text-purple-700 mb-2">
            <FaMapMarker className="mr-1" />
            <span className="truncate">{`${property.location.city}, ${property.location.state}`}</span>
          </div>
          <div className="transition-all duration-300 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-full text-sm transition duration-300 inline-block">
              <i className="fas fa-info-circle mr-1"></i> View Details
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedPropertyCard;
