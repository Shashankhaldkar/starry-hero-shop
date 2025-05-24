
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Heart } from 'lucide-react';

const Careers = () => {
  const jobOpenings = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Help build the future of superhero fashion e-commerce with React and modern web technologies.",
      requirements: ["5+ years React experience", "TypeScript proficiency", "E-commerce experience"]
    },
    {
      id: 2,
      title: "Product Designer",
      department: "Design",
      location: "New York, NY",
      type: "Full-time",
      description: "Design amazing user experiences for superhero fans worldwide.",
      requirements: ["Figma expertise", "UX/UI design experience", "Portfolio required"]
    },
    {
      id: 3,
      title: "Content Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      description: "Create engaging content that resonates with our superhero community.",
      requirements: ["Content creation experience", "Social media savvy", "Comic book knowledge a plus"]
    }
  ];

  const benefits = [
    "Health, dental, and vision insurance",
    "Unlimited PTO policy",
    "Remote-first culture",
    "Professional development budget",
    "Free HeroicThreads merchandise",
    "Comic-Con attendance bonus"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-purple-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
            Join Our Hero Team
          </h1>
          <p className="text-purple-300 text-lg max-w-2xl mx-auto">
            Help us build the future of superhero fashion and inspire heroes everywhere
          </p>
        </div>

        {/* Company Culture */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Why HeroicThreads?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Amazing Team</h3>
              <p className="text-purple-300">Work with passionate people who love comics and great design</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Mission Driven</h3>
              <p className="text-purple-300">Help people express their inner hero through fashion</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Work-Life Balance</h3>
              <p className="text-purple-300">Flexible hours and unlimited PTO to recharge your powers</p>
            </div>
          </div>
        </div>

        {/* Job Openings */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Open Positions</h2>
          <div className="space-y-6">
            {jobOpenings.map((job) => (
              <Card key={job.id} className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-white">{job.title}</CardTitle>
                    <Badge variant="secondary" className="bg-purple-600/50 text-purple-200">
                      {job.department}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-purple-300 text-sm">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.type}
                    </div>
                  </div>
                  <CardDescription className="text-purple-300 mt-2">
                    {job.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="text-white font-medium mb-2">Requirements:</h4>
                    <ul className="text-purple-300 text-sm space-y-1">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-purple-500/30 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Benefits & Perks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 text-purple-300">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
