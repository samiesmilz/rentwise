import PropertyAddForm from "@/components/PropertyAddForm";

const AddPropertyPage = () => {
  return (
    <section className="bg-purple-50 min-h-screen flex items-center justify-center">
      <div className="container m-auto max-w-2xl py-12">
        <div className="bg-white 0 shadow-lg rounded-lg border m-4 md:m-0">
          <h2 className="text-xl text-center bg-purple-300 p-5 text-gray-800 ">
            Add a new property
          </h2>
          <PropertyAddForm />
        </div>
      </div>
    </section>
  );
};

export default AddPropertyPage;
