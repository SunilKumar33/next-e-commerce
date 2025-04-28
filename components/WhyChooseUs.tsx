import {
  FaGlobe,
  FaCheckCircle,
  FaPercent,
  FaShieldAlt,
  FaExchangeAlt,
  FaHandHoldingHeart,
  FaAward,
} from "react-icons/fa";

const features = [
  {
    icon: <FaGlobe className="w-8 h-8" />,
    title: "Worldwide Shipping",
    description:
      "We offer worldwide shipping to make our products accessible to customers all over the world.",
  },
  {
    icon: <FaCheckCircle className="w-8 h-8" />,
    title: "Best Quality",
    description:
      "We believe in providing our customers with only the best quality products.",
  },
  {
    icon: <FaPercent className="w-8 h-8" />,
    title: "Best Offers",
    description:
      "We pride ourselves on offering the best deals and discounts to our customers.",
  },
  {
    icon: <FaShieldAlt className="w-8 h-8" />,
    title: "Secure Payments",
    description:
      "We offer a range of secure payment options to ensure that your transactions are safe and secure.",
  },
  {
    icon: <FaExchangeAlt className="w-8 h-8" />,
    title: "Easy Exchange",
    description:
      "Our hassle-free exchange policy ensures customer satisfaction.",
  },
  {
    icon: <FaHandHoldingHeart className="w-8 h-8" />,
    title: "100% Handpicked",
    description:
      "Every product in our collection is carefully selected to ensure quality.",
  },
  {
    icon: <FaAward className="w-8 h-8" />,
    title: "Assured Quality",
    description: "We guarantee the quality of all our products.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.slice(0, 7).map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-primary-600 mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
