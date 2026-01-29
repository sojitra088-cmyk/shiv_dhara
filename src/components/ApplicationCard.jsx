import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const ApplicationCard = ({ title, desc, image, span }) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={`
        group relative h-[260px] rounded-[28px] overflow-hidden
        ${span === 2 ? "md:col-span-2" : ""}
      `}
    >
      {/* IMAGE */}
      <motion.img
        src={image}
        alt={title}
        variants={{
          hover: { scale: 1.04 },
        }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* OVERLAY */}
      <motion.div
        variants={{
          hover: { opacity: 0.75 },
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"
      />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex flex-col justify-end p-8">
        <motion.h3
          variants={{
            hover: { y: -2 },
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-2xl font-serif text-white mb-2"
        >
          {title}
        </motion.h3>

        <motion.p
          variants={{
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-white/85 text-sm max-w-md"
        >
          {desc}
        </motion.p>

        {/* CTA */}
        <div className="mt-5 inline-flex items-center gap-2 text-lime-400 text-xs uppercase tracking-widest font-semibold">
          View Application
          <span
            className="
              inline-block
              transition-transform duration-300 ease-out
              group-hover:translate-x-2
            "
          >
            <i className="fa-solid fa-arrow-right"></i>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ApplicationCard;
