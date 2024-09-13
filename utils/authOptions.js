import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

// Connect to the database
const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful authentication
    async signIn({ profile }) {
      try {
        // Connect to the database
        await connectDB();

        // Find the user in the database
        let user = await User.findOne({ email: profile.email }).lean();

        // If the user does not exist, create a new user
        if (!user) {
          const username = profile.name.slice(0, 20);
          user = await User.create({
            email: profile.email,
            username: username,
            image: profile.picture,
          });
        }
        return true; // Return true to indicate successful sign-in
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false; // Return false to indicate failure
      }
    },
    // Session callback function that modifies the session object
    async session({ session }) {
      try {
        // Get the user from the database
        const user = await User.findOne({ email: session.user.email }).lean();

        // Check if user exists before accessing _id
        if (user) {
          session.user.id = user._id.toString(); // Add user ID to session
        } else {
          console.warn(
            "User not found in session callback:",
            session.user.email
          );
        }

        // Return the session
        return session;
      } catch (error) {
        console.error("Error during session callback:", error);
        return session; // Return the session even if there's an error
      }
    },
  },
};

export default authOptions;
