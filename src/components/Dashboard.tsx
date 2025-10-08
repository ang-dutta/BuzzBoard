import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { TrendingUp, TrendingDown, Target, Users, DollarSign, Calendar, CheckCircle, AlertTriangle, Star } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface FormData {
  businessType: string;
  productCategory: string;
  budget: string;
  duration: string;
  audience: string;
  goal: string;
}

interface DashboardProps {
  formData: FormData;
  onBack: () => void;
}

export function Dashboard({ formData, onBack }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("trends");

  // Mock data based on form inputs
  const roiData = [
    { month: 'Month 1', roi: 120, engagement: 2500, reach: 45000 },
    { month: 'Month 2', roi: 180, engagement: 3200, reach: 62000 },
    { month: 'Month 3', roi: 250, engagement: 4100, reach: 78000 },
    { month: 'Month 4', roi: 320, engagement: 5500, reach: 95000 },
    { month: 'Month 5', roi: 410, engagement: 6800, reach: 115000 },
    { month: 'Month 6', roi: 520, engagement: 8200, reach: 140000 },
  ];

  const platformData = [
    { platform: 'Instagram', performance: 85, audience: 2.1, cost: 1200 },
    { platform: 'TikTok', performance: 92, audience: 1.8, cost: 800 },
    { platform: 'YouTube', performance: 78, audience: 1.5, cost: 2000 },
    { platform: 'Twitter', performance: 65, audience: 0.9, cost: 600 },
  ];

  const audienceData = [
    { name: '18-24', value: 35, color: '#8B5CF6' },
    { name: '25-34', value: 40, color: '#EC4899' },
    { name: '35-44', value: 20, color: '#06B6D4' },
    { name: '45+', value: 5, color: '#10B981' },
  ];

  const getBudgetPrediction = () => {
    const budgetMap: { [key: string]: number } = {
      "$1K - $5K": 3000,
      "$5K - $15K": 10000,
      "$15K - $50K": 32000,
      "$50K - $100K": 75000,
      "$100K+": 150000
    };
    return budgetMap[formData.budget] || 10000;
  };

  const getPlatformRecommendation = () => {
    if (formData.audience === "Gen Z (16-24)") return "TikTok";
    if (formData.productCategory === "Tech" || formData.productCategory === "SaaS") return "YouTube";
    if (formData.productCategory === "Fashion" || formData.productCategory === "Beauty") return "Instagram";
    return "Instagram";
  };

  const recommendedPlatform = getPlatformRecommendation();
  const budgetPrediction = getBudgetPrediction();
  const expectedROI = Math.round(budgetPrediction * 0.35);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl mb-4">Your Personalized Dashboard</h2>
          <p className="text-xl text-gray-600 mb-6">
            AI-powered insights based on your {formData.businessType} in {formData.productCategory}
          </p>
          <Button onClick={onBack} variant="outline" className="mb-8">
            ← Back to Planning
          </Button>
        </motion.div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Expected ROI</p>
                  <p className="text-2xl">+{Math.round((expectedROI / budgetPrediction) * 100)}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Projected Revenue</p>
                  <p className="text-2xl">${expectedROI.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Recommended Platform</p>
                  <p className="text-2xl">{recommendedPlatform}</p>
                </div>
                <Star className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Campaign Duration</p>
                  <p className="text-2xl">{formData.duration}</p>
                </div>
                <Calendar className="w-8 h-8 text-pink-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trends">Predicted Trends</TabsTrigger>
            <TabsTrigger value="analysis">Pros & Cons</TabsTrigger>
            <TabsTrigger value="roadmap">Campaign Roadmap</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>ROI Growth Projection</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={roiData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="roi" stroke="#8B5CF6" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={platformData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="platform" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="performance" fill="#EC4899" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Audience Demographics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={audienceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {audienceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {platformData.map((platform, index) => (
                    <div key={platform.platform} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-green-500' : index === 1 ? 'bg-yellow-500' : 'bg-gray-400'}`} />
                        <span>{platform.platform}</span>
                      </div>
                      <Badge variant={platform.platform === recommendedPlatform ? "default" : "secondary"}>
                        {platform.performance}% match
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                    <div>
                      <p className="font-medium">High Engagement Potential</p>
                      <p className="text-sm text-gray-600">Your target audience is highly active on {recommendedPlatform}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                    <div>
                      <p className="font-medium">Trending Product Category</p>
                      <p className="text-sm text-gray-600">{formData.productCategory} content is performing 23% above average</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                    <div>
                      <p className="font-medium">Optimal Budget Range</p>
                      <p className="text-sm text-gray-600">Your budget aligns well with successful campaigns in this niche</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    Considerations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                    <div>
                      <p className="font-medium">Market Saturation</p>
                      <p className="text-sm text-gray-600">Competition is moderate in {formData.productCategory} space</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                    <div>
                      <p className="font-medium">Seasonal Factors</p>
                      <p className="text-sm text-gray-600">Consider timing campaigns around peak engagement periods</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                    <div>
                      <p className="font-medium">Platform Algorithm Changes</p>
                      <p className="text-sm text-gray-600">Stay flexible with content strategy as algorithms evolve</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="roadmap" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Timeline & Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { phase: "Week 1-2", title: "Research & Planning", tasks: ["Identify top influencers", "Content strategy development", "Contract negotiations"] },
                    { phase: "Week 3-4", title: "Content Creation", tasks: ["Brief influencers", "Content review & approval", "Asset preparation"] },
                    { phase: "Week 5-8", title: "Campaign Launch", tasks: ["Content publishing", "Performance monitoring", "Real-time optimization"] },
                    { phase: "Week 9-10", title: "Analysis & Scale", tasks: ["Performance analysis", "ROI calculation", "Strategy refinement"] }
                  ].map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm">
                          {index + 1}
                        </div>
                        {index < 3 && <div className="w-px h-16 bg-gray-300 mt-2" />}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg">{step.title}</h4>
                          <Badge variant="outline">{step.phase}</Badge>
                        </div>
                        <ul className="space-y-1">
                          {step.tasks.map((task, taskIndex) => (
                            <li key={taskIndex} className="text-sm text-gray-600 flex items-center gap-2">
                              <div className="w-1 h-1 bg-gray-400 rounded-full" />
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}