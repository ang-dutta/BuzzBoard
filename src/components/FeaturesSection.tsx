import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { TrendingUp, Target, BarChart3 } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: TrendingUp,
      title: "Predictions Engine",
      description: "BuzzBoard predicts ROI of influencer campaigns using advanced AI algorithms and market data analysis.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Target,
      title: "Trend Tracking",
      description: "Stay updated with real-time social media trends across all major platforms and demographics.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: BarChart3,
      title: "Smart Analysis",
      description: "Compare platforms, audiences, and engagement metrics to optimize your influencer marketing strategy.",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4">What We Do</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to maximize your influencer marketing ROI
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 * index }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 mb-6`}>
                    <feature.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-2xl mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}