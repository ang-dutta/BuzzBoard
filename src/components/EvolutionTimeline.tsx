import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Radio, Tv, MapPin, Monitor, Users } from 'lucide-react';

export function EvolutionTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stages = [
    {
      icon: Radio,
      title: "Radio",
      description: "Audio advertisements reached mass audiences",
      year: "1920s"
    },
    {
      icon: Tv,
      title: "TV Ads",
      description: "Visual storytelling transformed marketing",
      year: "1950s"
    },
    {
      icon: MapPin,
      title: "Billboards",
      description: "Location-based advertising in public spaces",
      year: "1960s"
    },
    {
      icon: Monitor,
      title: "Website Ads",
      description: "Digital advertising emerged online",
      year: "1990s"
    },
    {
      icon: Users,
      title: "Social Media Influencers",
      description: "Authentic connections drive modern marketing",
      year: "2010s"
    }
  ];

  return (
    <section className="py-20 bg-gray-50" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Evolution of Marketing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From traditional media to social influence – see how marketing has transformed
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full"
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : { height: 0 }}
            transition={{ duration: 2, delay: 0.5 }}
          />

          <div className="space-y-16">
            {stages.map((stage, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
                  transition={{ duration: 0.8, delay: 0.2 * index }}
                  className={`flex items-center ${isEven ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`w-5/12 ${isEven ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className={`flex items-center mb-4 ${isEven ? 'justify-end' : 'justify-start'}`}>
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-3 mr-3">
                          <stage.icon className="w-full h-full text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl">{stage.title}</h3>
                          <p className="text-sm text-purple-600">{stage.year}</p>
                        </div>
                      </div>
                      <p className="text-gray-600">{stage.description}</p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full border-4 border-white shadow-lg" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}