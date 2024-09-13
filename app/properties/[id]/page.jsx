import connectDB from "@/config/database";
import Property from "@/models/Property";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import PropertyDetails from "@/components/PropertyDetails";
import { notFound } from "next/navigation";
import PropertyImages from "@/components/PropertyImages";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";

const PropertyPage = async ({ params }) => {
  await connectDB();

  const property = await Property.findById(params.id).lean();

  if (!property) {
    notFound();
  }

  // Convert the property to a plain object
  const plainProperty = {
    ...property,
    _id: property._id.toString(), // Convert _id to string
    owner: property.owner ? property.owner.toString() : null, // Convert owner to string if it exists
    // Add any other fields that need conversion here
  };

  return (
    <>
      <PropertyHeaderImage image={plainProperty.images[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-black hover:text-white flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-purple-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <PropertyDetails property={plainProperty} />
            <aside className="space-y-4">
              <BookmarkButton property={plainProperty} />
              <ShareButtons property={plainProperty} />
              <PropertyContactForm property={plainProperty} />
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={plainProperty.images} />
    </>
  );
};

export default PropertyPage;
