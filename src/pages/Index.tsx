
import { useEffect, useState } from 'react';
import Map from '../components/Map';
import Navbar from '../components/Navbar';
import QRButton from '../components/QRButton';
import Analytics from '../components/Analytics';
import { BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  const [navbarExpanded, setNavbarExpanded] = useState(false);
  const [showBusStops, setShowBusStops] = useState(true); // Default to true
  const [showBuses, setShowBuses] = useState(true); // Default to true
  const [showAnalytics, setShowAnalytics] = useState(false);
  
  // Add mobile viewport meta for better mobile display
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
    document.getElementsByTagName('head')[0].appendChild(meta);
    
    return () => {
      document.getElementsByTagName('head')[0].removeChild(meta);
    };
  }, []);

  const toggleNavbar = () => {
    setNavbarExpanded(!navbarExpanded);
  };

  const openAnalytics = () => {
    setShowAnalytics(true);
  };

  return (
    <div className="h-screen w-screen overflow-hidden mobile-app">
      <div className="relative h-full w-full">
        <Map 
          navbarExpanded={navbarExpanded} 
          showBusStops={showBusStops} 
          showBuses={showBuses} 
        />

        {/* Analytics Button - Above QR Button with increased distance */}
        <motion.button
          className="fixed bottom-50 right-8 z-20 bg-black text-white rounded-full p-2.8 shadow-lg"
          whileTap={{ scale: 0.95 }}
          onClick={openAnalytics}
        >
          <BarChart2 size={22} />
        </motion.button>

        <QRButton />

        <Navbar 
          expanded={navbarExpanded} 
          onToggle={toggleNavbar}
        />

        <Analytics 
          isOpen={showAnalytics} 
          onClose={() => setShowAnalytics(false)} 
        />
      </div>
    </div>
  );
};

export default Index;
