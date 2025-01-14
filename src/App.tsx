import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { SubmissionForm } from './pages/SubmissionForm';
import { MySubmissions } from './pages/MySubmissions';
import { ToastProvider } from './contexts/ToastContext';
import { Toaster } from './components/ui/Toaster';

export default function App() {
  return (
    <ToastProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/submit" element={<SubmissionForm />} />
              <Route path="/my-submissions" element={<MySubmissions />} />
            </Routes>
          </main>
          <Toaster />
        </div>
      </Router>
    </ToastProvider>
  );
}