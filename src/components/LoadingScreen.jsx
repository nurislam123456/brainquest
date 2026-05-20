export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-duo-gray-3">
      <div className="text-6xl animate-bounce mb-4">🧠</div>
      <div className="flex gap-2 mt-2">
        {[0,1,2].map(i => (
          <div
            key={i}
            className="w-3 h-3 rounded-full bg-duo-green animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
