export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1a7bff]">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-white rounded-full animate-spin"></div>
      </div>
    </div>
  );
} 