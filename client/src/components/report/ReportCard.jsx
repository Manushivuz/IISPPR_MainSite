const ReportCard = ({ title, author_names, date, description, pdfUrl }) => {
  const formattedDate = new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full bg-white rounded-2xl shadow-md flex flex-col sm:flex-row overflow-hidden transform transition duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100">
      <div className="w-full sm:w-[300px] h-[200px] sm:h-auto bg-gray-300" />

      <div className="flex flex-col justify-between p-6 flex-1 text-black">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-orange-500 font-semibold">
            {formattedDate}
          </p>

          <h3 className="text-lg sm:text-xl font-bold text-[#0F1B2B]">
            {title}
          </h3>

          {author_names?.length > 0 && (
            <p className="text-lg text-gray-600">
              <strong>Authors:</strong> {author_names.join(", ")}
            </p>
          )}

          {description && (
            <p className="text-sm text-gray-500 line-clamp-4">
              <strong>Description:</strong> {description}
            </p>
          )}
        </div>

        {pdfUrl && (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#252A34] text-white px-6 py-2 rounded-full text-sm self-end mt-4 hover:bg-blue-600 hover:text-white transition duration-300 transform hover:scale-105"
          >
            View PDF
          </a>
        )}
      </div>
    </div>
  );
};

export default ReportCard;
