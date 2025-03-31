
import { QrCode, Camera } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QRButton = () => {
  const [showQR, setShowQR] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);

  const handleQRClick = () => {
    setShowQR(!showQR);
    setCameraActive(false);
  };

  const activateCamera = () => {
    setCameraActive(true);
  };

  return (
    <>
      <motion.button
        className="fixed bottom-32 right-8 z-20 bg-black text-white rounded-full p-4 shadow-lg"
        whileTap={{ scale: 0.95 }}
        onClick={handleQRClick}
      >
        <QrCode size={28} />
      </motion.button>

      <AnimatePresence>
        {showQR && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQR(false)}
          >
            <motion.div
              className="bg-white p-8 rounded-2xl w-80 flex flex-col items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {!cameraActive ? (
                <>
                  <div className="mb-6 flex items-center justify-center">
                    <Camera size={48} className="text-black" />
                  </div>
                  <p className="text-black text-center mb-6">Allow camera access to scan QR codes</p>
                  <button 
                    className="bg-black text-white py-2 px-6 rounded-full"
                    onClick={activateCamera}
                  >
                    Allow Camera Access
                  </button>
                </>
              ) : (
                <>
                  <div className="w-64 h-64 bg-gray-100 flex items-center justify-center overflow-hidden rounded mb-4">
                    <div className="relative w-full h-full bg-black/10">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-40 h-40 border-2 border-white/70 rounded-lg"></div>
                      </div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <motion.div 
                          className="w-44 h-1 bg-red-500 opacity-70"
                          animate={{ 
                            y: [-40, 40, -40], 
                          }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 2, 
                            ease: "linear" 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-black text-sm">Scanning for QR code...</p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default QRButton;
