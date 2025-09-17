import { Calendar, MapPin, Users, Clock } from 'lucide-react';

interface EventPreviewCardProps {
  title: string;
  description: string;
  date: string;
  location: string;
  attendees: number;
  category: string;
  imageUrl?: string;
  isAuthenticated: boolean;
  onViewEvent: () => void;
}

const EventPreviewCard: React.FC<EventPreviewCardProps> = ({
  title,
  description,
  date,
  location,
  attendees,
  category,
  imageUrl,
  isAuthenticated,
  onViewEvent,
}) => {
  return (
    <div className="card overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Event Image */}
      <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 relative">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Calendar className="h-16 w-16 text-white/70" />
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 text-primary-800 text-xs font-medium px-2 py-1 rounded-full">
            {category}
          </span>
        </div>

        {/* Blur overlay for non-authenticated users */}
        {!isAuthenticated && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white/95 rounded-lg p-3 text-center">
              <p className="text-sm font-medium text-gray-900">Sign in to view details</p>
            </div>
          </div>
        )}
      </div>

      {/* Event Details */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
          {title}
        </h3>
        
        <p className={`text-gray-600 mb-4 line-clamp-2 ${!isAuthenticated ? 'blur-sm' : ''}`}>
          {description}
        </p>

        {/* Event Meta */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-primary-600" />
            <span>{new Date(date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2 text-primary-600" />
            <span>{new Date(date).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })}</span>
          </div>

          <div className={`flex items-center text-sm text-gray-600 ${!isAuthenticated ? 'blur-sm' : ''}`}>
            <MapPin className="h-4 w-4 mr-2 text-primary-600" />
            <span className="line-clamp-1">{location}</span>
          </div>

          <div className={`flex items-center text-sm text-gray-600 ${!isAuthenticated ? 'blur-sm' : ''}`}>
            <Users className="h-4 w-4 mr-2 text-primary-600" />
            <span>{attendees} attendees</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onViewEvent}
          className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            isAuthenticated
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {isAuthenticated ? 'View Event' : 'Sign in to Register'}
        </button>
      </div>
    </div>
  );
};

export default EventPreviewCard;