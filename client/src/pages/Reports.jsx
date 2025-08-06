import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Handshake, Users, Heart, Globe, Search } from "lucide-react";
import axios from "axios";
import ReportCard from "../components/report/ReportCard";

// Stats Data
const stats = [
  {
    icon: <Handshake className="w-10 h-10 text-[#0F1B2B]" />,
    numericValue: 4597,
    label: "People Rised",
  },
  {
    icon: <Users className="w-10 h-10 text-[#0F1B2B]" />,
    numericValue: 8945,
    label: "Volunteer",
  },
  {
    icon: <Heart className="w-10 h-10 text-[#0F1B2B]" />,
    numericValue: 10000000,
    label: "Poor People Saved",
  },
  {
    icon: <Globe className="w-10 h-10 text-[#0F1B2B]" />,
    numericValue: 100,
    label: "Country Member",
  },
];

// Animated Counter
const AnimatedCounter = ({ numericValue }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 50;
      const stepTime = duration / steps;
      let currentCount = 0;

      const timer = setInterval(() => {
        currentCount += numericValue / steps;
        if (currentCount >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(currentCount));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);

  const displayValue =
    numericValue >= 1000000
      ? `${Math.floor(count / 1000000)}M+`
      : numericValue >= 1000
      ? `${Math.floor(count)}+`
      : `${count}+`;

  return (
    <motion.h3
      ref={counterRef}
      className="text-2xl sm:text-3xl font-bold text-[#0F1B2B] mt-4"
    >
      {displayValue}
    </motion.h3>
  );
};

// Stat Card
const StatCard = ({ icon, numericValue, label }) => (
  <div className="bg-[#EAF3FB] rounded-lg shadow-md flex flex-col items-center text-center p-6">
    <div className="bg-white p-4 rounded-full border border-gray-300">
      {icon}
    </div>
    <AnimatedCounter numericValue={numericValue} />
    <p className="text-[#4B4B4B] mt-1">{label}</p>
  </div>
);

// Main Component
const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/documents?type=report"
        );
        setReports(res.data.documents || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching reports:", err);
        setError("Failed to load reports.");
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="w-full font-[Playfair]">
      {/* Stats Section */}
      <section className="bg-[#0F1B2B] w-full py-20 px-4 text-white">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between gap-10 mb-16">
            <div className="lg:w-1/2">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">Reports</h1>
              <p className="text-gray-300 test-lg">
                Explore our comprehensive reports that highlight our impact and
                the communities we serve. Each report provides insights into our
                initiatives, challenges, and successes over the years.
              </p>
            </div>
          </div>

          <div className="text-center mb-12">
            <p className="text-sm text-gray-400">Our Statistics</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Our Impact Across The Years
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Reports List Section */}
      <section className="bg-white w-full py-20 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1B2B] mb-4 sm:mb-0">
              Reports
            </h2>
            <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 w-full sm:w-80">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search Reports"
                className="outline-none bg-transparent text-sm w-full"
              />
            </div>
          </div>

          {/* Reports Grid */}
          <div className="flex flex-col gap-6">
            {loading && <p>Loading reports...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && reports.length === 0 && (
              <p className="text-gray-500">No reports found.</p>
            )}
            {reports.map((report) => (
              <ReportCard
                key={report._id}
                title={report.title}
                author_names={report.author_names}
                date={report.date}
                description={report.description}
                pdfUrl={report.pdfUrl}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reports;
