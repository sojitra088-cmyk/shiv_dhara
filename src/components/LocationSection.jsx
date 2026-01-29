  import React, { useState } from 'react';
  import { motion, AnimatePresence } from 'framer-motion';
  import { ArrowRight, Store, MapPin } from 'lucide-react';

  const cityData = [
    {
      id: "ahmedabad",
      name: "Ahmedabad",
      query: "Shivdhara Marble Ahmedabad Gujarat India",
      locations: [
        {
          name: "Shivdhara marbo stone",
          addr: "Odhav Industrial Estate, Odhav, Kathwada, Ahmedabad, Gujarat 382415",
          specificQuery:
            "Shivdhara marbo stone Odhav Industrial Estate Odhav Kathwada Ahmedabad Gujarat 382415 India",
        },
        {
          name: "Shivdhara CERAMIC stone",
          addr: "Gota Chokdi Flyover, Vasant Nagar, Gota, Ahmedabad, Gujarat 382481",
          specificQuery:
            "Shivdhara CERAMIC stone Gota Chokdi Flyover Vasant Nagar Gota Ahmedabad Gujarat 382481 India",
        },
      ],
    },

    {
      id: "surat",
      name: "Surat",
      query: "Shivdhara Marble Surat Gujarat India",
      locations: [
        {
          name: "Shivdhara Marbo Granito",
          addr:
            "120 FT Bamroli Road, Udhana - Magdalla Rd, Near Sosyo Circle, Surat, Gujarat 395002",
          specificQuery:
            "Shivdhara Marbo Granito 120 FT Bamroli Road Near Sosyo Circle Surat Gujarat 395002 India",
        },
        {
          name: "Shivdhara Sanitary",
          addr:
            "38, Surat - Kamrej Hwy, Ishwar Nagar, Nana Varachha, Surat, Gujarat 395013",
          specificQuery:
            "Shivdhara Sanitary 38 Surat Kamrej Highway Nana Varachha Surat Gujarat 395013 India",
        },
        {
          name: "Shivdhara Marble And Granite",
          addr: "Diamond Nagar-3, Laskana, Surat, Gujarat 395013",
          specificQuery:
            "Shivdhara Marble And Granite Diamond Nagar 3 Laskana Surat Gujarat 395013 India",
        },
      ],
    },

    {
      id: "vadodara",
      name: "Vadodara",
      query: "Shivdhara Marble Vadodara Gujarat India",
      locations: [
        {
          name: "Shivdhara Granite & Marble",
          addr:
            "G-13, Makarpura G.I.D.C Road, Nandanvan Society, Near Vadsar Fatak, Manjalpur, Vadodara, Gujarat 390010",
          specificQuery:
            "Shivdhara Granite and Marble G 13 Makarpura GIDC Road Manjalpur Vadodara Gujarat 390010 India",
        },
        {
          name: "Shivdhara Marble Ceramic",
          addr:
            "NH 8 Tarsali, Novino Tarsali Rd, near Bridge, Somnath Nagar, Makarpura, Vadodara, Gujarat 390009",
          specificQuery:
            "Shivdhara Marble Ceramic NH 8 Tarsali Novino Tarsali Road Makarpura Vadodara Gujarat 390009 India",
        },
      ],
    },

    {
      id: "ankleshwar",
      name: "Ankleshwar",
      query: "Shivdhara Marble Ankleshwar Gujarat India",
      locations: [
        {
          name: "Shivdhara Marble & Granito",
          addr:
            "Laksh Corporation, Fire Station Road, behind Jayaben Modi Hospital, GIDC, Ankleshwar, Gujarat 393002",
          specificQuery:
            "Shivdhara Marble and Granito Laksh Corporation Fire Station Road GIDC Ankleshwar Gujarat 393002 India",
        },
      ],
    },

    {
      id: "bharuch",
      name: "Bharuch",
      query: "Shivdhara Marble Bharuch Gujarat India",
      locations: [
        {
          name: "Shivdhara Granito & Marble",
          addr:
            "Plot no C1B A1-11, GIDC Rd, Phase 1, GIDC, Bharuch, Gujarat 392015",
          specificQuery:
            "Shivdhara Granito and Marble Plot C1B A1 11 GIDC Road Phase 1 Bharuch Gujarat 392015 India",
        },
      ],
    },
  ];


  const LocationSection = () => {
    const [activeCity, setActiveCity] = useState(cityData[0]);
    // State to handle specific store selection for the map
    const [selectedLocation, setSelectedLocation] = useState(null);

    // Determine which query to use for the iframe
    const currentQuery = selectedLocation ? selectedLocation.specificQuery : activeCity.query;
    const isStore = Boolean(selectedLocation);

    const query = isStore
      ? selectedLocation.specificQuery
      : activeCity.cityOnlyQuery;

    const zoom = isStore ? 16 : 11;

    // const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    //   query
    // )}&z=${zoom}&output=embed`;

    const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(currentQuery)}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`;
    const mapRef = React.useRef(null);

    return (
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            
            {/* LEFT PANEL */}
            <div className="w-full lg:w-1/3 flex flex-col">
              <header className="mb-10">
                <p className="text-[#bef264] text-[10px] tracking-[0.4em] uppercase font-bold mb-3">Store Locator</p>
                <h2 className="text-5xl font-serif text-gray-900">Find <span className="italic text-neutral-400 font-light">Us</span></h2>
              </header>

              <div className="flex flex-col gap-4">
                {cityData.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => {
                      setActiveCity(city);
                      setSelectedLocation(null);

                      setTimeout(() => {
                        mapRef.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }, 200);
                    }}

                    className="group flex items-center justify-between text-left transition-all duration-500"
                  >
                    <span className={`uppercase tracking-tighter transition-all duration-500 ${
                      activeCity.id === city.id ? 'text-3xl md:text-4xl font-black text-black' : 'text-xl font-bold text-slate-200 hover:text-slate-400'
                    }`}>
                      {city.name}
                    </span>
                    {activeCity.id === city.id && (
                      <motion.div layoutId="arrow" className="bg-slate-100 p-3 rounded-full">
                        <ArrowRight size={20} className="text-[#bef264]" />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
              {/* STORE INFO BELOW CITY LIST */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="mt-10 bg-white rounded-3xl shadow-xl border border-gray-100 p-6"
                >
                  {/* Header */}
                  <div className="mb-5">
                    <h3 className="text-xl font-black uppercase tracking-tight text-gray-900">
                      Shivdhara {activeCity.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Store size={14} className="text-[#bef264]" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        {activeCity.locations.length} Showrooms
                      </span>
                    </div>
                  </div>

                  {/* Locations */}
                  <div className="space-y-4 border-t border-gray-100 pt-4 max-h-[260px] overflow-y-auto custom-scrollbar">
                    {activeCity.locations.map((loc, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setSelectedLocation(loc);

                          setTimeout(() => {
                            mapRef.current?.scrollIntoView({
                              behavior: "smooth",
                              block: "center",
                            });
                          }, 200);
                        }}

                        className={`cursor-pointer pl-4 border-l-2 transition ${
                          selectedLocation?.name === loc.name
                            ? "border-[#bef264] bg-[#bef264]/5"
                            : "border-transparent hover:border-gray-200"
                        }`}
                      >
                        <h4 className="text-xs font-black uppercase text-gray-900">
                          {loc.name}
                        </h4>
                        <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                          {loc.addr}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/search/${encodeURIComponent(currentQuery)}`
                      )
                    }
                    className="w-full mt-6 bg-[#bef264] text-black text-[11px] font-black py-3 rounded-full uppercase tracking-widest hover:bg-[#a8d956] transition"
                  >
                    Open in Google Maps
                  </button>
                </motion.div>
              </AnimatePresence>

            </div>

            {/* RIGHT PANEL: Map with Interactive Compact Card */}
            <div ref={mapRef} className="w-full lg:w-2/3 h-[600px] lg:h-[750px] relative">
              <motion.div
                key={currentQuery}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl bg-slate-50 border border-gray-100"
              >
                <iframe
                  title="Shivdhara Map"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  src={mapUrl}
                  allowFullScreen
                  loading="lazy"
                />
              </motion.div>

            </div>
          </div>
        </div>

        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #bef264; border-radius: 20px; }
        `}</style>
      </section>
    );
  };

  export default LocationSection;