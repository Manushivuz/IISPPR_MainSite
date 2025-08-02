import React from 'react';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';

const Contact = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 px-8 md:px-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">Contact Us</h1>
          <p className="text-xl text-white/80 max-w-2xl font-serif">
            Get in touch with us to learn more about our initiatives or to get involved in our environmental conservation efforts.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 md:px-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div>
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;