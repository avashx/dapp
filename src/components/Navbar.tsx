
import { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, MapPin, Bus, ChevronUp, Search, Navigation, Menu, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  expanded: boolean;
  onToggle: () => void;
  onShowBusStops: (show: boolean) => void;
  onShowBuses: (show: boolean) => void;
  onOpenAnalytics: () => void;
}

const Navbar = ({ expanded, onToggle, onShowBusStops, onShowBuses, onOpenAnalytics }: NavbarProps) => {
  const [showBusStops, setShowBusStops] = useState(false);
  const [showBuses, setShowBuses] = useState(false);

  const handleBusStopsToggle = () => {
    const newValue = !showBusStops;
    setShowBusStops(newValue);
    onShowBusStops(newValue);
  };

  const handleBusesToggle = () => {
    const newValue = !showBuses;
    setShowBuses(newValue);
    onShowBuses(newValue);
  };

  return (
    <motion.div
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-black text-white z-10 rounded-t-3xl shadow-lg",
        expanded ? "pb-6" : ""
      )}
      initial={{ height: 100 }} // Increased from 80 to 100
      animate={{ height: expanded ? "50vh" : 100 }} // Increased from 80 to 100
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Toggle bar */}
      <div 
        className="h-20 flex justify-center items-center cursor-pointer" // Increased from h-16 to h-20
        onClick={onToggle}
      >
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronUp size={28} /> {/* Increased from 24 to 28 */}
        </motion.div>
      </div>

      {/* Bottom action buttons in collapsed state */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 flex justify-around pb-6", // Increased from pb-4 to pb-6
        expanded ? "hidden" : "block"
      )}>
        <button 
          className="rounded-full bg-black p-4 shadow" // Increased from p-3 to p-4
          onClick={() => onShowBusStops(true)}
        >
          <MapPin size={28} /> {/* Increased from 24 to 28 */}
        </button>
        <button 
          className="rounded-full bg-black p-4 shadow" // Increased from p-3 to p-4
          onClick={onToggle}
        >
          <Menu size={28} /> {/* Increased from 24 to 28 */}
        </button>
        <button 
          className="rounded-full bg-black p-4 shadow" // Increased from p-3 to p-4
          onClick={onOpenAnalytics}
        >
          <BarChart2 size={28} /> {/* Increased from 24 to 28 */}
        </button>
      </div>

      {/* Expanded content */}
      {expanded && (
        <motion.div 
          className="px-6 pt-2 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search locations..."
                className="w-full py-3 px-10 bg-gray-800 rounded-full text-white placeholder:text-gray-400 focus:outline-none"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 my-6">
            <button 
              className={cn(
                "flex flex-col items-center justify-center p-4 rounded-xl transition-colors",
                showBusStops ? "bg-white text-black" : "bg-gray-800 text-white"
              )}
              onClick={handleBusStopsToggle}
            >
              <MapPin size={24} className="mb-2" />
              <span className="text-sm font-medium">Bus Stops</span>
            </button>
            
            <button 
              className={cn(
                "flex flex-col items-center justify-center p-4 rounded-xl transition-colors",
                showBuses ? "bg-white text-black" : "bg-gray-800 text-white"
              )}
              onClick={handleBusesToggle}
            >
              <Bus size={24} className="mb-2" />
              <span className="text-sm font-medium">Buses</span>
            </button>
            
            <button className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-800">
              <Navigation size={24} className="mb-2" />
              <span className="text-sm font-medium">Navigate</span>
            </button>
            
            <button className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-800">
              <QrCode size={24} className="mb-2" />
              <span className="text-sm font-medium">Scan QR</span>
            </button>
          </div>

          <div className="rounded-xl bg-gray-800 p-4 mb-6">
            <h3 className="font-medium mb-3">Nearby Bus Stops</h3>
            {busStops.slice(0, 3).map((stop, index) => (
              <div key={index} className="flex items-center py-2 border-b border-gray-700 last:border-0">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="font-medium">{stop.name}</p>
                  <p className="text-xs text-gray-400">{stop.distance} away</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

// Sample bus stops for the expanded view
const busStops = [
  { name: "Opera House", distance: "150m" },
  { name: "Rynok Square", distance: "300m" },
  { name: "High Castle", distance: "450m" },
];

export default Navbar;
