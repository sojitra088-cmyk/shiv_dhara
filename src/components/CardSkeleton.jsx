const CardSkeleton = ({ count = 3 }) => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-3xl border bg-white p-6 shadow-sm animate-pulse">
          <div className="h-6 w-32 rounded bg-gray-200 mb-6" />
          <div className="space-y-4">
            <div className="h-20 rounded bg-gray-200" />
            <div className="h-5 w-1/2 rounded bg-gray-200" />
            <div className="h-5 w-1/3 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardSkeleton;
