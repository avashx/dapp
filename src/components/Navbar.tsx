import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  expanded: boolean;
  onToggle: () => void;
}

const Navbar = ({ expanded, onToggle }: NavbarProps) => {
  return (
    <motion.div
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-black text-white z-10 rounded-t-3xl shadow-lg",
        expanded ? "pb-6" : ""
      )}
      initial={{ height: 100 }}
      animate={{ height: expanded ? "50vh" : 100 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Toggle bar */}
      <div 
        className="h-20 flex justify-center items-center cursor-pointer"
        onClick={onToggle}
      >
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronUp size={28} />
        </motion.div>
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
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-gray-800 p-4 mb-6">
            <h3 className="font-medium mb-3">Nearby Bus Stops</h3>
            {busStops.slice(0, 3).map((stop, index) => (
              <div key={index} className="flex items-center py-2 border-b border-gray-700 last:border-0">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
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
