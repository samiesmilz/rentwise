// entrance and layout of the app
import "@assets/styles/globals.css";

export const metadata = {
  title: "Just Co-Host",
  keywords: ["rental, property, short-term-rentals, real eatate"],
  description: "find the perfect rental property",
};
const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
