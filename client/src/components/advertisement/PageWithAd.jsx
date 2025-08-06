import { createBrowserRouter, Outlet, useLocation } from 'react-router-dom';
import Layout from '../layout/Layout';
import AdDisplay from './AdDisplay';

const validPages = ["home", "about", "gallery", "reports", "articles", "testimonials"];

const PageWithAd = () => {
  const location = useLocation();
  const pathname = location.pathname.split("/")[1] || "home"; // fallback to home if '/'
  const pageType = validPages.includes(pathname) ? pathname : null;

  return (
    <>
      {/* Top Ad above layout */}
      {pageType &&<AdDisplay pageType={pageType} position="top" />}

      {/* Layout with injected bottom ad inside */}
      <Layout>
        {pageType && <AdDisplay pageType={pageType} position="bottom" />}
      </Layout>
    </>
  );
};

export default PageWithAd;


