import { TrendingUp, CheckSquare, Headphones } from "lucide-react";
import ServiceCard from "./ServiceCard";
import WelcomeBanner from "./WelcomeBanner";
import { motion } from "framer-motion";

interface ServicesProps {
  onStartLearning: (category: "sales" | "admin" | "customer") => void;
}

export default function Services({ onStartLearning }: ServicesProps) {
  const services = [
    {
      title: "Sales & Lead Generation",
      description: "Master the art of sales, lead generation, and customer acquisition strategies.",
      icon: TrendingUp,
      iconColor: "text-emerald-500",
      iconBgColor: "bg-emerald-500",
      modules: 2,
      estimatedTime: "5h",
      buttonColor: "bg-emerald-500",
      buttonHoverColor: "bg-emerald-600",
      category: "sales" as const,
    },
    {
      title: "Administrative Support",
      description: "Learn essential admininstrative skills, organization, and support functions.",
      icon: CheckSquare,
      iconColor: "text-blue-500",
      iconBgColor: "bg-blue-500",
      modules: 1,
      estimatedTime: "2h",
      buttonColor: "bg-blue-500",
      buttonHoverColor: "bg-blue-600",
      category: "admin" as const,
    },
    {
      title: "Customer Service",
      description: "Develop excellent customer service skills and relationship management.",
      icon: Headphones,
      iconColor: "text-orange-500",
      iconBgColor: "bg-orange-500",
      modules: 1,
      estimatedTime: "2.5h",
      buttonColor: "bg-orange-500",
      buttonHoverColor: "bg-orange-600",
      category: "customer" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5c72e0] to-[#6952ad]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <WelcomeBanner />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12"
        >
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
              onStartLearning={() => onStartLearning(service.category)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
