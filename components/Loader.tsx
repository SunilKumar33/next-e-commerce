export function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[600px]">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-t-blue-600 border-r-blue-600 border-b-gray-200 border-l-gray-200 animate-spin"></div>
        <div className="absolute inset-3 rounded-full border-4 border-t-blue-400 border-r-blue-400 border-b-gray-100 border-l-gray-100 animate-spin-reverse"></div>
      </div>
      <p className="mt-4 text-gray-600 animate-pulse">Loading...</p>
    </div>
  );
}
