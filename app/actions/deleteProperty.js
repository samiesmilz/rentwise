"use server";
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty(propertyId) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser.userId) {
    throw new Error("User ID is require!");
  }
  const { userId } = sessionUser;
  const property = await Property.findById(propertyId);
  if (!property) {
    throw new Error("Property Not Found.");
  }
  // validate ownership
  if (property.owner.toString() !== userId) {
    throw new Error("Unauthorized!");
  }
  // etxract public Id from image Urls
  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split("/");
    return parts.at(-1).split(".").at(0);
  });
  // delete images from cloudnary
  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy("justcohost/" + publicId);
    }
  }

  await property.deleteOne();
  revalidatePath("/", "layout");
}
export default deleteProperty;
