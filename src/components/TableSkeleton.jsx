const TableSkeleton = ({ rows = 5, columns = 5 }) => {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm p-6 animate-pulse">
      <div className="mb-4 h-6 w-48 rounded bg-gray-200" />
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-12 gap-3">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div
                key={colIndex}
                className="col-span-12 sm:col-span-1 h-10 rounded bg-gray-200"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
