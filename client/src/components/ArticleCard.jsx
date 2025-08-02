const ArticleCard = ({ title, author, description = "", year, pdf }) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 space-y-2">
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600">{author} • {year}</p>

      {description && (
        <p className="text-gray-700">{description}</p>
      )}

      {pdf ? (
        <a
          href={pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-blue-600 hover:underline mt-2 font-medium"
        >
          View PDF →
        </a>
      ) : (
        <p className="text-sm text-red-500 italic">PDF not available</p>
      )}
    </div>
  );
};

export default ArticleCard;
