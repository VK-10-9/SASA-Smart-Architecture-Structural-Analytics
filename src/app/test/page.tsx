'use client';

import { TestComponent } from '@/components/TestComponent';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test Page</h1>
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Test Component</h2>
            <TestComponent />
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Path Alias Test</h2>
            <p className="text-green-600">
              If you can see this, the path aliases are working correctly!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
