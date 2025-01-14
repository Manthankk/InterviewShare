import { Link } from 'react-router-dom';
import { BookOpen, PlusCircle, User } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">InterviewShare</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Browse
            </Link>
            <Link
              to="/submit"
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Submit Experience</span>
            </Link>
            <Link
              to="/my-submissions"
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              <User className="h-4 w-4" />
              <span>All Submissions</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}