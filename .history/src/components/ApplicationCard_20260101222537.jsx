const ApplicationCard = ({ title, desc, image, span = 1 }) => {
  return (
    <div
      className={`
        relative h-[240px] rounded-[28px] overflow-hidden
        ${span === 2 ? "md:col-span-2" : ""}
      `}
    >
      {/* IMAGE */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.04]"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-transparent" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex flex-col justify-end p-8">
        <h3 className="text-2xl font-serif text-white mb-2">
          {title}
        </h3>

        <p className="text-white/85 text-sm max-w-md">
          {desc}
        </p>

        <div className="mt-5 inline-flex items-center gap-2 text-lime-400 text-xs uppercase tracking-widest font-semibold">
          View Application
          <i className="fa-solid fa-arrow-right transition-transform duration-300 hover:translate-x-2"></i>
        </div>
      </div>
    </div>
  );
};
