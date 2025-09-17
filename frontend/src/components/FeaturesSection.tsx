import { Calendar, Users, MapPin, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturesSection = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Smart Event Discovery',
      description: 'Find events that match your interests with our intelligent recommendation system.',
      color: 'bg-blue-500',
    },
    {
      icon: Users,
      title: 'Community Building',
      description: 'Create and manage communities around shared interests and passions.',
      color: 'bg-green-500',
    },
    {
      icon: MapPin,
      title: 'Location-Based Search',
      description: 'Discover events happening in your neighborhood or plan to attend elsewhere.',
      color: 'bg-purple-500',
    },
    {
      icon: Star,
      title: 'Premium Experience',
      description: 'Get exclusive access to VIP events and early bird registrations.',
      color: 'bg-yellow-500',
    },
    {
      icon: Zap,
      title: 'Instant Notifications',
      description: 'Never miss out on events with real-time updates and reminders.',
      color: 'bg-red-500',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to plan amazing events
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From discovery to execution, Planify provides all the tools you need 
            to create memorable experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 ${feature.color} rounded-lg mb-4`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to get started?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Join thousands of event organizers and attendees who trust Planify 
            for their event planning needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="btn-primary px-8 py-3 inline-flex items-center justify-center"
            >
              Start Planning Today
            </Link>
            <Link
              to="/login"
              className="btn-secondary px-8 py-3 inline-flex items-center justify-center"
            >
              Sign In to Continue
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;