import React from 'react';
import { Toaster } from 'react-hot-toast';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import ReportForm from './components/ReportForm';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Toaster position="top-center" />
      
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <AlertTriangle className="w-8 h-8 text-green-600" />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-900">UAE Waste Reporter</h1>
          </div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white shadow-xl rounded-xl p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900">Report Waste</h2>
              <p className="mt-2 text-gray-600">
                Help keep the UAE clean by reporting waste in your area.
                Your report will be sent directly to the relevant authorities.
              </p>
            </motion.div>
            
            <ErrorBoundary>
              <ReportForm />
            </ErrorBoundary>
          </div>
        </motion.div>
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white border-t mt-12"
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} UAE Waste Reporter. All rights reserved.
          </p>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;