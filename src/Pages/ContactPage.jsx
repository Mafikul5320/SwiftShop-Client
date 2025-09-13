import { Phone, Mail, MapPin } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-12">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Get in Touch
        </h2>
        <p className="text-gray-500 text-center mb-10">
          We'd love to hear from you! Fill out the form below or reach us
          directly via phone or email.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Write your message..."
                className="textarea textarea-bordered w-full"
              ></textarea>
            </div>

            <button
              type="button"
              className="w-full py-3 px-6 bg-[#08aec3] text-white rounded-lg shadow hover:bg-[#079caf] transition"
            >
              Send Message
            </button>
          </form>

          {/* Contact Information */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-green-100 rounded-lg">
                <Phone className="w-6 h-6 text-[#08aec3]" />
              </div>
              <div>
                <p className="text-gray-700 font-medium">Phone</p>
                <p className="text-gray-500">+880 1234-567890</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-4 bg-green-100 rounded-lg">
                <Mail className="w-6 h-6 text-[#08aec3]" />
              </div>
              <div>
                <p className="text-gray-700 font-medium">Email</p>
                <p className="text-gray-500">support@yourapp.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-4 bg-green-100 rounded-lg">
                <MapPin className="w-6 h-6 text-[#08aec3]" />
              </div>
              <div>
                <p className="text-gray-700 font-medium">Address</p>
                <p className="text-gray-500">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
