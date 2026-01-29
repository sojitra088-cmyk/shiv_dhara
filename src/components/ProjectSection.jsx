import React from 'react';
import { motion } from 'framer-motion';

const ProjectsSection = () => {
  const projects = [
    {
      name: "The Grand Pavilion",
      location: "Surat, Gujarat",
      material: "Italian Marble • Statuario",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
    },
    {
      name: "Skyline Corporate Tower",
      location: "Ahmedabad, Gujarat",
      material: "Porcelain Slabs • Granite",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200",
    },
    {
      name: "Aurora Boutique Hotel",
      location: "Udaipur, Rajasthan",
      material: "Natural Stone • Designer Marble",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200",
    },
  ];

  return (
    <section className="bg-white py-12 md:py-24 border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* RESPONSIVE HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-20">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 md:w-10 bg-lime-500" />
              <span className="text-lime-600 font-black tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-[10px] uppercase">
                Global Portfolio
              </span>
            </div>
            <h2 className="text-4xl md:text-7xl font-serif leading-none uppercase text-neutral-900">
              Signature <br />
              <span className="text-neutral-300 font-light italic">Installations</span>
            </h2>
          </div>
          {/* Hidden on small mobile to save vertical space, visible from md up */}
          <p className="max-w-xs text-neutral-500 text-xs md:text-sm leading-relaxed border-l border-neutral-200 pl-6 hidden sm:block">
            Showcasing our finest natural stone and ceramic tile projects across premium landscapes.
          </p>
        </div>

        {/* RESPONSIVE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-8">
          
          {/* Main Large Feature: Full width on mobile/tablet, spans 8 cols on desktop */}
          <motion.div 
            className="lg:col-span-8 group relative overflow-hidden rounded-[30px] md:rounded-[45px] h-[400px] md:h-[500px] lg:h-[700px] cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img src={projects[0].image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={projects[0].name} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white pr-6">
              <span className="text-lime-400 font-bold text-[9px] md:text-[10px] tracking-widest uppercase mb-2 block">{projects[0].location}</span>
              <h3 className="text-2xl md:text-4xl font-serif uppercase mb-2 leading-tight">{projects[0].name}</h3>
              <p className="text-white/70 font-medium italic text-xs md:text-sm">{projects[0].material}</p>
            </div>
          </motion.div>

          {/* Sidebar Grid: Stacks below on mobile, sits beside on desktop */}
          <div className="lg:col-span-4 flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-col gap-4 md:gap-8">
            {projects.slice(1).map((project, i) => (
              <motion.div 
                key={i} 
                className="group relative overflow-hidden rounded-[25px] md:rounded-[40px] h-[300px] md:h-[334px] cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <img src={project.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={project.name} />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                   <h3 className="text-lg md:text-xl font-serif text-white uppercase">{project.name}</h3>
                   <span className="text-lime-400 text-[8px] md:text-[9px] font-bold tracking-widest uppercase mt-2">{project.location}</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;