"use client";
import addProperty from "@/app/actions/addProperty";
import { useState } from "react";
import {
  Home,
  MapPin,
  Bed,
  Bath,
  Square,
  Wifi,
  DollarSign,
  User,
  Image,
} from "lucide-react";

const FormSection = ({ title, icon, children, bgColor = "bg-white" }) => (
  <div className={`mb-6 p-6 rounded-lg shadow-md ${bgColor}`}>
    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
      {icon}
      {title}
    </h3>
    {children}
  </div>
);

const PropertyAddForm = () => {
  const [formData, setFormData] = useState({});

  const updateFormData = (newData) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <form
      action={addProperty}
      className="w-full max-w-4xl mx-auto p-6 bg-gray-50 shadow-xl rounded-xl"
    >
      <h2 className="text-4xl text-center font-bold mb-8 text-gray-800">
        Propert details.
      </h2>

      <FormSection
        title="Basic Information"
        icon={<Home className="w-5 h-5" />}
        bgColor="bg-blue-50"
      >
        <div className="grid gap-4">
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Property Type
            </label>
            <select
              id="type"
              name="type"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="Apartment">Apartment</option>
              <option value="Condo">Condo</option>
              <option value="House">House</option>
              <option value="CabinOrCottage">Cabin or Cottage</option>
              <option value="Room">Room</option>
              <option value="Studio">Studio</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Listing Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g. Beautiful Apartment In Miami"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add an optional description of your property"
            ></textarea>
          </div>
        </div>
      </FormSection>

      <FormSection
        title="Location"
        icon={<MapPin className="w-5 h-5" />}
        bgColor="bg-green-50"
      >
        <div className="grid gap-4">
          <input
            type="text"
            id="street"
            name="location.street"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Street"
          />
          <input
            type="text"
            id="city"
            name="location.city"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="City"
            required
          />
          <input
            type="text"
            id="state"
            name="location.state"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="State"
            required
          />
          <input
            type="text"
            id="zipcode"
            name="location.zipcode"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Zipcode"
          />
        </div>
      </FormSection>

      <FormSection
        title="Property Details"
        icon={<Square className="w-5 h-5" />}
        bgColor="bg-yellow-50"
      >
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="beds"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Beds
            </label>
            <input
              type="number"
              id="beds"
              name="beds"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label
              htmlFor="baths"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Baths
            </label>
            <input
              type="number"
              id="baths"
              name="baths"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label
              htmlFor="square_feet"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Square Feet
            </label>
            <input
              type="number"
              id="square_feet"
              name="square_feet"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              required
            />
          </div>
        </div>
      </FormSection>

      <FormSection
        title="Amenities"
        icon={<Wifi className="w-5 h-5" />}
        bgColor="bg-purple-50"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
          {[
            "Wifi",
            "Full kitchen",
            "Washer & Dryer",
            "Free Parking",
            "Swimming Pool",
            "Hot Tub",
            "24/7 Security",
            "Wheelchair Accessible",
            "Elevator Access",
            "Dishwasher",
            "Gym/Fitness Center",
            "Air Conditioning",
            "Balcony/Patio",
            "Smart TV",
            "Coffee Maker",
          ].map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`amenity_${amenity.toLowerCase().replace(/\s/g, "_")}`}
                name="amenities"
                value={amenity}
                className="rounded text-purple-600 focus:ring-purple-500"
              />
              <label
                htmlFor={`amenity_${amenity.toLowerCase().replace(/\s/g, "_")}`}
              >
                {amenity}
              </label>
            </div>
          ))}
        </div>
      </FormSection>

      <FormSection
        title="Rates"
        icon={<DollarSign className="w-5 h-5" />}
        bgColor="bg-red-50"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="weekly_rate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Weekly
            </label>
            <input
              type="number"
              id="weekly_rate"
              name="rates.weekly"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="monthly_rate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Monthly
            </label>
            <input
              type="number"
              id="monthly_rate"
              name="rates.monthly"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="nightly_rate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nightly
            </label>
            <input
              type="number"
              id="nightly_rate"
              name="rates.nightly"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>
      </FormSection>

      <FormSection
        title="Seller Information"
        icon={<User className="w-5 h-5" />}
        bgColor="bg-indigo-50"
      >
        <div className="grid gap-4">
          <div>
            <label
              htmlFor="seller_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Seller Name
            </label>
            <input
              type="text"
              id="seller_name"
              name="seller_info.name"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Name"
            />
          </div>
          <div>
            <label
              htmlFor="seller_email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Seller Email
            </label>
            <input
              type="email"
              id="seller_email"
              name="seller_info.email"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Email address"
              required
            />
          </div>
          <div>
            <label
              htmlFor="seller_phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Seller Phone
            </label>
            <input
              type="tel"
              id="seller_phone"
              name="seller_info.phone"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Phone"
            />
          </div>
        </div>
      </FormSection>

      <FormSection
        title="Property Images"
        icon={<Image className="w-5 h-5" />}
        bgColor="bg-pink-50"
      >
        <div>
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Images (Select up to 4 images)
          </label>
          <input
            type="file"
            id="images"
            name="images"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            accept="image/*"
            multiple
            required
          />
        </div>
      </FormSection>

      <div>
        <button
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-6 rounded-full w-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          type="submit"
        >
          Add Property
        </button>
      </div>
    </form>
  );
};

export default PropertyAddForm;
