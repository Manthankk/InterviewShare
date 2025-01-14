import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useToast } from '../contexts/ToastContext';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  company: z.string().min(1, 'Company is required'),
  country: z.string().min(1, 'Country is required'),
  questions: z.array(z.string()).min(1, 'At least one question is required'),
});

type FormData = z.infer<typeof schema>;

export function SubmissionForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      questions: [''],
    },
  });

  const questions = watch('questions');

  const onSubmit = async (data: FormData) => {
    try {
      const { error } = await supabase.from('submissions').insert({
        ...data,
      });

      if (error) throw error;
      toast('Experience submitted successfully!', 'success');
      navigate('/my-submissions');
    } catch (error) {
      console.error('Error submitting experience:', error);
      toast('Failed to submit experience. Please try again.', 'error');
    }
  };

  const addQuestion = () => {
    setValue('questions', [...questions, '']);
  };

  const removeQuestion = (index: number) => {
    setValue(
      'questions',
      questions.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Share Your Interview Experience</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">
            Company
          </label>
          <input
            type="text"
            id="company"
            {...register('company')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.company && (
            <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <input
            type="text"
            id="country"
            {...register('country')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.country && (
            <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interview Questions
          </label>
          <div className="space-y-4">
            {questions.map((_, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  {...register(`questions.${index}`)}
                  placeholder="Enter an interview question"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(index)}
                    className="px-3 py-2 text-sm text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addQuestion}
            className="mt-2 text-sm text-indigo-600 hover:text-indigo-700"
          >
            + Add another question
          </button>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Experience'}
        </button>
      </form>
    </div>
  );
}