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
    // inovked on successful authentication
    async signIn({ profile }) {
      // connect to the database
      await connectDB();

      // Find the user in the database
      const user = await User.findOne({ email: profile.email }).lean();

      // If the user does not exist, create a new user
      if (!user) {
        const username = profile.name.slice(0, 20);
        const newUser = await User.create({
          email: profile.email,
          username: username,
          image: profile.picture,
        });
      }
      return true;
    },
    // session call back function that modifies the session object
    async session({ session }) {
      // Get the user from the database
      const user = await User.findOne({ email: session.user.email }).lean();

      // Add the user to the session
      session.user.id = user._id.toString();

      // Return the session
      return session;
    },
  },
};

export default authOptions;
