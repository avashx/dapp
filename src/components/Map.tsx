import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import { Bus, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import 'leaflet/dist/leaflet.css';

// Import Leaflet marker icons directly as URLs (not using require)
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Custom hook to manage location
const useCurrentLocation = () => {
  const [position, setPosition] = useState<LatLngExpression>([28.604, 77.225]); // Default: Lviv

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error obtaining location", error);
        }
      );
    }
  }, []);

  return position;
};

// Component to manage map view based on current location
const MapController = ({ center, navbarExpanded }: { center: LatLngExpression, navbarExpanded: boolean }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, 15);
  }, [center, map]);

  // Adjust padding when navbar expands
  useEffect(() => {
    if (navbarExpanded) {
      map.invalidateSize();
      map.setView(center, 15, {
        animate: true,
        padding: [0, 0, window.innerHeight / 2, 0]
      });
    } else {
      map.invalidateSize();
      map.setView(center, 15, {
        animate: true,
        padding: [0, 0, 0, 0]
      });
    }
  }, [navbarExpanded, center, map]);

  return null;
};

// Mock data for bus stops
const busStops = [
  { id: 1, position: [28.628, 77.216], name: "India Gate", distance: "150m" },
  { id: 2, position: [28.635, 77.222], name: "Connaught Place", distance: "300m" },
  { id: 3, position: [28.604, 77.225], name: "Qutub Minar", distance: "450m" },
  { id: 4, position: [28.608, 77.232], name: "Red Fort", distance: "520m" },
  { id: 5, position: [28.596, 77.290], name: "Lotus Temple", distance: "650m" },
];

// Mock data for buses
const buses = [
  { id: 1, position: [28.630, 77.218], number: "501", eta: "3 min" },
  { id: 2, position: [28.612, 77.230], number: "102", eta: "7 min" },
  { id: 3, position: [28.609, 77.220], number: "203", eta: "1 min" },
];

// Get nearest bus stop
const getNearestBusStop = (position: LatLngExpression) => {
  // In a real app, this would calculate actual distances
  return busStops[0];
};

// Get nearest bus
const getNearestBus = (position: LatLngExpression) => {
  // In a real app, this would calculate actual distances
  return buses[2];
};

interface MapProps {
  navbarExpanded: boolean;
  showBusStops: boolean;
  showBuses: boolean;
}

const Map = ({ navbarExpanded, showBusStops, showBuses }: MapProps) => {
  const currentPosition = useCurrentLocation();
  const nearestBusStop = getNearestBusStop(currentPosition);
  const nearestBus = getNearestBus(currentPosition);
  
  // Create Leaflet icon for markers
  const createIcon = () => {
    return new L.Icon({
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
  };

  return (
    <div className={cn(
      "w-full transition-all duration-300 ease-in-out",
      navbarExpanded ? "h-[50vh]" : "h-screen"
    )}>
      <MapContainer 
        center={currentPosition}
        zoom={15} 
        zoomControl={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController center={currentPosition} navbarExpanded={navbarExpanded} />
        
        {/* Current location marker */}
        <Marker position={currentPosition}>
          <Popup>You are here</Popup>
        </Marker>
        
        {/* Bus stop markers */}
        {showBusStops && busStops.map(stop => (
          <Marker 
            key={stop.id} 
            position={stop.position as LatLngExpression} 
            icon={createIcon()}
          >
            <Popup>{stop.name} - {stop.distance} away</Popup>
          </Marker>
        ))}
        
        {/* Bus markers */}
        {showBuses && buses.map(bus => (
          <Marker 
            key={bus.id} 
            position={bus.position as LatLngExpression}
            icon={createIcon()}
          >
            <Popup>Bus {bus.number} - Arriving in {bus.eta}</Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Nearest Stop Indicator */}
      {showBusStops && (
        <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-md z-10 flex items-center space-x-2">
          <MapPin size={20} className="text-red-500" />
          <div>
            <p className="font-semibold text-sm">Nearest Stop</p>
            <p className="text-xs">{nearestBusStop.name} ({nearestBusStop.distance})</p>
          </div>
        </div>
      )}

      {/* Nearest Bus Indicator */}
      {showBuses && (
        <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-md z-10 flex items-center space-x-2">
          <Bus size={20} className="text-blue-500" />
          <div>
            <p className="font-semibold text-sm">Bus {nearestBus.number}</p>
            <p className="text-xs">Arriving in {nearestBus.eta}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;