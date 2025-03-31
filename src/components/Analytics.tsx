
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart2, X, Clock, Calendar, ArrowUp, ArrowDown, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from 'recharts';

interface AnalyticsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Analytics = ({ isOpen, onClose }: AnalyticsProps) => {
  const [activeTab, setActiveTab] = useState('today');
  
  // Sample data for the charts
  const todayData = [
    { name: '6AM', trips: 12 },
    { name: '8AM', trips: 35 },
    { name: '10AM', trips: 20 },
    { name: '12PM', trips: 25 },
    { name: '2PM', trips: 18 },
    { name: '4PM', trips: 32 },
    { name: '6PM', trips: 40 },
    { name: '8PM', trips: 15 }
  ];
  
  const weekData = [
    { name: 'Mon', trips: 120 },
    { name: 'Tue', trips: 95 },
    { name: 'Wed', trips: 108 },
    { name: 'Thu', trips: 132 },
    { name: 'Fri', trips: 150 },
    { name: 'Sat', trips: 85 },
    { name: 'Sun', trips: 60 }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-white"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center space-x-3">
                <BarChart2 size={24} />
                <h1 className="text-xl font-bold">Travel Analytics</h1>
              </div>
              <button onClick={onClose}>
                <X size={24} />
              </button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-100 p-4 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 text-sm">Today</span>
                    <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">+12%</span>
                  </div>
                  <div className="flex items-end space-x-2">
                    <span className="text-2xl font-bold">42</span>
                    <span className="text-sm text-gray-500">trips</span>
                  </div>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 text-sm">Week</span>
                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">-5%</span>
                  </div>
                  <div className="flex items-end space-x-2">
                    <span className="text-2xl font-bold">196</span>
                    <span className="text-sm text-gray-500">trips</span>
                  </div>
                </div>
              </div>
              
              {/* Activity Graph */}
              <div className="bg-white border rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold">Travel Activity</h2>
                  <div className="flex rounded-lg bg-gray-100 p-1">
                    <button
                      className={`px-3 py-1 text-xs rounded-md transition-colors ${
                        activeTab === 'today' ? 'bg-white shadow' : 'text-gray-500'
                      }`}
                      onClick={() => setActiveTab('today')}
                    >
                      Today
                    </button>
                    <button
                      className={`px-3 py-1 text-xs rounded-md transition-colors ${
                        activeTab === 'week' ? 'bg-white shadow' : 'text-gray-500'
                      }`}
                      onClick={() => setActiveTab('week')}
                    >
                      This Week
                    </button>
                  </div>
                </div>
                
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activeTab === 'today' ? todayData : weekData}>
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <Bar dataKey="trips" radius={[4, 4, 0, 0]}>
                        {(activeTab === 'today' ? todayData : weekData).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#6C63FF' : '#8884d8'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Popular Destinations */}
              <div className="bg-white border rounded-xl p-4 mb-6">
                <h2 className="font-semibold mb-4">Popular Destinations</h2>
                {['City Center', 'Train Station', 'University Campus'].map((dest, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-indigo-600">{i+1}</span>
                      </div>
                      <span>{dest}</span>
                    </div>
                    <span className="text-sm text-gray-500">{35 - i*7} trips</span>
                  </div>
                ))}
              </div>
              
              {/* Most Active Times */}
              <div className="bg-white border rounded-xl p-4">
                <h2 className="font-semibold mb-4">Most Active Times</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Clock size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">Morning Peak</div>
                      <div className="text-sm text-gray-500">7:30 AM - 9:00 AM</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Clock size={20} className="text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium">Evening Peak</div>
                      <div className="text-sm text-gray-500">5:00 PM - 7:30 PM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Analytics;
