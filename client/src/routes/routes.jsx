import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Gallery from '../pages/Gallery';
import Projects from '../pages/Projects';
import Testimonials from '../pages/Testimonials';
import Reports from '../pages/Reports';
import Articles from '../pages/Articles'; // ✅ Import Articles
import NotFound from '../pages/NotFound';
import LoginPage from '../pages/LoginPage';
import AdminLayout from '../components/admin/AdminLayout';

import Ads from '../components/admin/Ads';
import AdminReports from '../components/admin/AdminReports'; // your admin report page
import AdminArticles from '../components/admin/AdminArticles'; // your admin articles page
import AdminTestimonials from '../components/admin/AdminTestimonial';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'gallery', element: <Gallery /> },
      { path: 'projects', element: <Projects /> },
      { path: 'testimonials', element: <Testimonials /> },
      { path: 'reports', element: <Reports /> },
      { path: 'articles', element: <Articles /> }, // ✅ Add this line
      { path: '*', element: <NotFound /> }
    ]
  },
  {
    path: '/login', // ✅ Separate route outside Layout
    element: <LoginPage />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: 'ads', element: <Ads /> },
      { path: 'report', element: <AdminReports /> },
      { path: 'articles', element: <AdminArticles /> },
      { path: 'testimonials', element: <AdminTestimonials /> },
    ]
  }
]);

export default router;
