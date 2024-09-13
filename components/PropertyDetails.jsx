import React from "react";
import {
  FaTimes,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCheck,
  FaMapMarker,
} from "react-icons/fa";
import PropertyMap from "./PropertyMap";

const PropertyDetails = ({ property }) => {
  if (!property) return null;

  const { amenities = [], rates = {}, location = {} } = property;

  // Ensure property and its properties are defined
  const amenitiesList = Array.isArray(amenities) ? amenities : [];

  return (
    <main>
      <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
        <div className="text-gray-500 mb-4">{property.type}</div>
        <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
        <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
          <FaMapMarker className="mt-1 mr-1 text-purple-500" />
          <p className="text-purple-700">
            {location.street}, {location.city}
            {location.zipcode}
          </p>
        </div>

        <h3 className="text-lg font-bold my-6 px-7 bg-purple-400 text-white p-2">
          Rates & Options
        </h3>
        <div className="flex flex-col md:flex-row justify-around">
          <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Nightly</div>
            <div className="text-2xl font-bold text-purple-500">
              {rates.nightly ? (
                `$${rates.nightly.toLocaleString()}`
              ) : (
                <FaTimes className="text-purple-500" />
              )}
            </div>
          </div>
          <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Weekly</div>
            <div className="text-2xl font-bold text-purple-500">
              {" "}
              {rates.weekly ? (
                `$${rates.weekly.toLocaleString()}`
              ) : (
                <FaTimes className="text-purple-500" />
              )}
            </div>
          </div>
          <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Monthly</div>
            <div className="text-2xl font-bold text-purple-500">
              {" "}
              {rates.monthly ? (
                `$${rates.monthly.toLocaleString()}`
              ) : (
                <FaTimes className="text-purple-500" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Description & Details</h3>
        <div className="flex gap-4 text-blue-500 mb-4 text-md space-x-9">
          <p className="bg-purple-50 pl-4 pr-4 rounded text-purple-600 ">
            <FaBed className="inline-block" /> {property.beds}{" "}
            <span className="hidden sm:inline">Beds</span>
          </p>
          <p className="bg-purple-50 pl-4 pr-4 rounded text-purple-600">
            <FaBath className="inline-block mr-2" />
            {property.baths} <span className="hidden sm:inline">Baths</span>
          </p>
          <p className="bg-purple-50 pl-4 pr-4 rounded text-purple-600">
            <FaRulerCombined className="inline-block mr-2" />
            {property.square_feet}{" "}
            <span className="hidden sm:inline">sqft</span>
          </p>
        </div>
        <p className="text-gray-500 mb-4">{property.description}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Amenities</h3>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none">
          {amenitiesList.map((amenity, index) => (
            <li key={index}>
              <FaCheck className=" inline-block text-purple-500 mr-2" />{" "}
              {amenity}
            </li>
          ))}
        </ul>
      </div>
      {/* <!-- Map --> */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <PropertyMap property={property} />
      </div>
    </main>
  );
};

export default PropertyDetails;
