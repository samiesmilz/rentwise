import Link from "next/link";

const Pagination = ({ page, pageSize, totalItems }) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <div className="flex gap-4">
        {hasPreviousPage ? (
          <Link
            href={`/properties?page=${page - 1}`}
            className="mr-2 px-3 py-1 border border-purple-300 rounded text-white bg-black hover:text-purple-200"
          >
            Previous
          </Link>
        ) : (
          <span className="mr-2 px-3 py-1 border border-gray-300 rounded text-gray-400 bg-gray-100 cursor-not-allowed">
            Previous
          </span>
        )}
        <span className="flex items-center justify-center py-1">
          Page {page} of {totalPages}
        </span>
        {hasNextPage ? (
          <Link
            href={`/properties?page=${page + 1}`}
            className="px-6 py-1 border border-purple-300 rounded bg-black hover:text-purple-200 text-white"
          >
            Next
          </Link>
        ) : (
          <span className="px-6 py-1 border border-gray-300 rounded bg-gray-100 text-gray-400 cursor-not-allowed">
            Next
          </span>
        )}
      </div>
    </section>
  );
};

export default Pagination;
