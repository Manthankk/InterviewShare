import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Building2, Globe, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type Submission = Database['public']['Tables']['submissions']['Row'];

export function Home() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const { data, error } = await supabase
          .from('submissions')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setSubmissions(data || []);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSubmissions();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Interview Experiences</h1>
        <p className="mt-2 text-gray-600">Learn from others' interview journeys</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {submissions.map((submission) => (
          <div
            key={submission.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center space-x-2 text-gray-600 mb-4">
                <User className="h-4 w-4" />
                <span>{submission.name}</span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Building2 className="h-4 w-4" />
                  <span>{submission.company}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Globe className="h-4 w-4" />
                  <span>{submission.country}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Interview Questions:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {submission.questions.map((question, index) => (
                    <li key={index}>{question}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 text-sm text-gray-500">
                Shared on {format(new Date(submission.created_at), 'MMM d, yyyy')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}