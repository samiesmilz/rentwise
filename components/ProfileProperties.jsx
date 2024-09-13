"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import deleteProperty from "@/app/actions/deleteProperty";
import { toast } from "react-toastify";

const ProfileProperties = ({ properties: initialProperties }) => {
  const [properties, setProperties] = useState(initialProperties);
  const handleDeleteProperty = async (propertyId) => {
    const comfirmed = window.confirm(
      "Are you sure - you want to delete this property?"
    );
    if (!comfirmed) {
      return;
    }
    await deleteProperty(propertyId);
    const updatedProperties = properties.filter(
      (property) => property._id !== propertyId
    );
    setProperties(updatedProperties);
    toast.success("Property deleted successfully.");
  };

  return properties.map((property, index) => (
    <div key={index} className="mb-10">
      <Link href={`properties/${property._id}`}>
        <Image
          className="h-32 w-full rounded-md object-cover"
          src={property.images[0]}
          alt="Property 2"
          width={1000}
          height={200}
        />
      </Link>
      <div className="mt-2">
        <p className="text-lg font-semibold">{property?.name}</p>
        <p className="text-gray-600">
          Address: {property.location.street} {property.location.city},{" "}
          {property.location.state}, {property.location.zipcode}
        </p>
      </div>
      <div className="mt-2">
        <Link
          href={`/properties/${property._id}/edit`}
          className="bg-purple-500 text-white px-5 py-2 rounded-md mr-2 hover:bg-purple-600"
        >
          Edit
        </Link>
        <button
          className="bg-red-500 text-white px-5 py-1 rounded-md hover:bg-red-600"
          type="button"
          onClick={() => handleDeleteProperty(property._id)}
        >
          Delete
        </button>
      </div>
    </div>
  ));
};

export default ProfileProperties;
