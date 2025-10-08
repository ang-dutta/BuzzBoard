import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

interface FormData {
  businessType: string;
  productCategory: string;
  budget: string;
  duration: string;
  audience: string;
  goal: string;
}

interface PlanningFormProps {
  onComplete: (data: FormData) => void;
}

export function PlanningForm({ onComplete }: PlanningFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    businessType: '',
    productCategory: '',
    budget: '',
    duration: '',
    audience: '',
    goal: ''
  });

  const steps = [
    {
      title: "Business Type",
      key: "businessType" as keyof FormData,
      options: ["Startup", "Small Business", "Enterprise", "E-commerce", "SaaS", "Agency"]
    },
    {
      title: "Product Category",
      key: "productCategory" as keyof FormData,
      options: ["Fashion", "Tech", "Food & Beverage", "Beauty", "Fitness", "Travel", "Gaming", "Education"]
    },
    {
      title: "Budget Range",
      key: "budget" as keyof FormData,
      options: ["$1K - $5K", "$5K - $15K", "$15K - $50K", "$50K - $100K", "$100K+"]
    },
    {
      title: "Campaign Duration",
      key: "duration" as keyof FormData,
      options: ["1 Week", "2-4 Weeks", "1-3 Months", "3-6 Months", "6+ Months"]
    },
    {
      title: "Target Audience",
      key: "audience" as keyof FormData,
      options: ["Gen Z (16-24)", "Millennials (25-40)", "Gen X (41-56)", "Boomers (57+)", "Mixed Demographics"]
    },
    {
      title: "Primary Goal",
      key: "goal" as keyof FormData,
      options: ["Brand Awareness", "Sales Increase", "Engagement", "Lead Generation", "App Downloads", "Event Promotion"]
    }
  ];

  const handleOptionSelect = (value: string) => {
    const currentKey = steps[currentStep].key;
    setFormData(prev => ({ ...prev, [currentKey]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(formData);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const isStepComplete = formData[steps[currentStep].key] !== '';
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <section id="planning" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl mb-4">Plan with Us</h2>
          <p className="text-xl text-gray-600">
            Answer a few questions to get your personalized influencer marketing strategy
          </p>
        </motion.div>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
          <CardContent className="p-8">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Step {currentStep + 1} of {steps.length}</span>
                <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl mb-6 text-center">{steps[currentStep].title}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {steps[currentStep].options.map((option, index) => (
                    <motion.button
                      key={option}
                      onClick={() => handleOptionSelect(option)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                        formData[steps[currentStep].key] === option
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {formData[steps[currentStep].key] === option && (
                          <CheckCircle className="w-5 h-5 text-purple-600" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="flex justify-between">
                  <Button
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  
                  <Button
                    onClick={handleNext}
                    disabled={!isStepComplete}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    {currentStep === steps.length - 1 ? 'Generate Dashboard' : 'Next'}
                    {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4" />}
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}