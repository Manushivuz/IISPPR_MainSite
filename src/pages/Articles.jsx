import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";

const Articles = () => {
  const [articleData, setArticleData] = useState([]);

  useEffect(() => {
    fetch("/articles/articleData.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch article data");
        }
        return res.json();
      })
      .then((data) => setArticleData(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Research Publications</h2>
      
      {articleData.length === 0 ? (
        <p className="text-gray-600">Loading research articles...</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {articleData.map((item) => (
            <ArticleCard key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Articles;
