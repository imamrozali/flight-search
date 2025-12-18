import Link from 'next/link';
import { Plane, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-indigo-50 to-blue-50 dark:from-slate-900 dark:to-slate-950">
      <div className="text-center w-full max-w-md mx-auto px-4">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-indigo-100 dark:bg-indigo-900/50 rounded-full mb-6">
            <Plane className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-8xl font-black text-indigo-600 dark:text-indigo-400 mb-2">404</h1>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">Oops! Page Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            It looks like the flight you&apos;re looking for has taken off to another destination.
            Let&apos;s get you back on track.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center px-8 py-4 bg-indigo-600 dark:bg-indigo-500 text-white font-semibold rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Home className="w-5 h-5 mr-2" />
            Take Me Home
          </Link>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Or try searching for flights above
          </p>
        </div>
      </div>
    </div>
  );
}