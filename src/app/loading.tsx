export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary mx-auto" />
        <p className="mt-4 text-gray-600">Loading...</p>
        <p className="text-sm text-gray-500">Please wait while we prepare your content</p>
      </div>
    </div>
  );
} 