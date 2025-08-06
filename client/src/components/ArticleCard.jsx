const ArticleCard = ({ title, author, description = "", year, pdf }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 space-y-3 group">
      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition">{title}</h3>
      <p className="text-sm text-gray-500">
        <span className="font-medium text-gray-700">By:</span> {author}
      </p>
      <p className="text-sm text-gray-500">
        <span className="font-medium text-gray-700">Year:</span> {year}
      </p>

      {description && (
        <p className="text-gray-700 text-sm">{description}</p>
      )}

      <div className="pt-2">
        {pdf ? (
          <a
            href={pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm text-blue-600 hover:underline font-medium"
          >
            View PDF →
          </a>
        ) : (
          <p className="text-sm text-red-500 italic">PDF not available</p>
        )}
      </div>
    </div>
  );
};

export default ArticleCard;
