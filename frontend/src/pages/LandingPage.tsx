
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import EventPreviewCard from '../components/EventPreviewCard';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const isAuthenticated = !!user;

  // Mock event data for preview
  const mockEvents = [
    {
      id: '1',
      title: 'Tech Startup Networking Mixer',
      description: 'Connect with fellow entrepreneurs, investors, and tech enthusiasts in this exclusive networking event. Share ideas, build partnerships, and grow your professional network.',
      date: '2024-02-15T18:00:00Z',
      location: 'Innovation Hub, Downtown Tech District',
      attendees: 127,
      category: 'Networking',
      imageUrl: '',
    },
    {
      id: '2',
      title: 'Photography Workshop: Street Photography',
      description: 'Learn the art of capturing life in motion with renowned photographer Sarah Chen. Hands-on workshop covering composition, lighting, and post-processing techniques.',
      date: '2024-02-18T10:00:00Z',
      location: 'Creative Arts Center, Gallery District',
      attendees: 45,
      category: 'Workshop',
      imageUrl: '',
    },
    {
      id: '3',
      title: 'Community Garden Spring Festival',
      description: 'Celebrate the arrival of spring with our annual garden festival. Live music, local food vendors, gardening workshops, and activities for the whole family.',
      date: '2024-03-22T11:00:00Z',
      location: 'Central Community Garden, Green Valley',
      attendees: 320,
      category: 'Community',
      imageUrl: '',
    },
    {
      id: '4',
      title: 'Digital Marketing Masterclass',
      description: 'Master the latest digital marketing strategies from industry experts. Cover social media, content marketing, SEO, and conversion optimization.',
      date: '2024-02-25T14:00:00Z',
      location: 'Business Center Conference Hall',
      attendees: 89,
      category: 'Education',
      imageUrl: '',
    },
    {
      id: '5',
      title: 'Jazz Night at The Blue Room',
      description: 'An evening of smooth jazz featuring local musicians and special guest performer Marcus Williams. Cocktails, dinner, and live music in an intimate setting.',
      date: '2024-02-20T19:30:00Z',
      location: 'The Blue Room Jazz Club, Music Quarter',
      attendees: 156,
      category: 'Music',
      imageUrl: '',
    },
    {
      id: '6',
      title: 'Sustainable Living Workshop',
      description: 'Learn practical tips for eco-friendly living. Topics include zero-waste practices, sustainable shopping, and green home solutions.',
      date: '2024-03-05T16:00:00Z',
      location: 'EcoCenter, Sustainable Campus',
      attendees: 67,
      category: 'Sustainability',
      imageUrl: '',
    },
  ];

  const handleViewEvent = (eventId: string) => {
    if (isAuthenticated) {
      // Navigate to event details page (will be implemented later)
      console.log(`Viewing event ${eventId}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">Planify</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <span className="text-gray-700">Welcome, {user?.fullName}!</span>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="btn-primary"
                  >
                    Go to Dashboard
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    className="text-gray-700 hover:text-primary-600 font-medium"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    className="btn-primary"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Featured Events Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Discover Amazing Events
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {isAuthenticated 
                ? "Here are some events you might be interested in based on your preferences."
                : "Get a taste of what's happening in your community. Sign up to see full details and register for events."
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockEvents.map((event) => (
              <EventPreviewCard
                key={event.id}
                title={event.title}
                description={event.description}
                date={event.date}
                location={event.location}
                attendees={event.attendees}
                category={event.category}
                imageUrl={event.imageUrl}
                isAuthenticated={isAuthenticated}
                onViewEvent={() => handleViewEvent(event.id)}
              />
            ))}
          </div>

          {!isAuthenticated && (
            <div className="text-center mt-12">
              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Want to see more?
                </h3>
                <p className="text-gray-600 mb-6">
                  Sign up to access full event details, register for events, and create your own.
                </p>
                <button
                  onClick={() => navigate('/register')}
                  className="btn-primary w-full"
                >
                  Join Planify Today
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Planify</h3>
              <p className="text-gray-400">
                The ultimate platform for planning, discovering, and attending amazing events in your community.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Organizers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Planify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;