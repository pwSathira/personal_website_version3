export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <div className="w-full h-12 rounded-lg bg-gray-800 animate-pulse"></div>
        </div>
        <div className="grid gap-8">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 animate-pulse">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-16 h-20 bg-gray-700 rounded-lg"></div>
                <div className="flex-grow">
                  <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 