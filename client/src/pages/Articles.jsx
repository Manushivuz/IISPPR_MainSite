import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";

const Articles = () => {
  const [articleData, setArticleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const backend = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetch(`${backend}/api/documents?type=article`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch article data");
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setArticleData(data.documents);
        } else {
          throw new Error("Invalid response format");
        }
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Research Publications</h2>

      {loading ? (
        <p className="text-gray-600">Loading research articles...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : articleData.length === 0 ? (
        <p className="text-gray-600">No articles found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {articleData.map((article) => (
            <ArticleCard
              key={article._id}
              title={article.title}
              author={article.author_names.join(", ")}
              year={new Date(article.date).getFullYear()}
              pdf={article.pdfUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Articles;
