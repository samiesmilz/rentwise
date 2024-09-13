import Infobox from "./InfoBox";
const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <Infobox
            heading="For Renters"
            buttonInfo={{
              text: "Browse Properties",
              link: "/properties",
              backgroundColor: "bg-black shadow-md",
            }}
          >
            Find your dream rental property. Bookmark properties and contact
            owners.
          </Infobox>
          <Infobox
            heading="For Property Owners"
            backgroundColor="bg-blue-100"
            buttonInfo={{
              text: "Add Property",
              link: "/properties/add",
              backgroundColor: "bg-black shadow-md",
            }}
          >
            List your properties and reach potential tenants. Rent as a
            short-term or long term.
          </Infobox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
