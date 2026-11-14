'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { ArrowRight, Zap, Brain, BarChart3 } from 'lucide-react'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="text-center space-y-8"
            >
              <motion.div variants={staggerItem}>
                <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-balance mb-6">
                  <span className="gradient-text">Learn Smarter</span>
                  <br />
                  with AI
                </h1>
              </motion.div>

              <motion.p
                variants={staggerItem}
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
              >
                Master any subject with AI-powered tutoring, interactive 3D visualizations, and real-time feedback. Level up your learning today.
              </motion.p>

              <motion.div
                variants={staggerItem}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href="/dashboard">
                  <Button size="lg" className="gap-2">
                    Start Learning
                    <ArrowRight className="size-5" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline">
                    Explore Features
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Floating Animation */}
            <motion.div
              className="mt-16 relative h-64 sm:h-80 md:h-96"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Why Learn with Us?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Experience the future of education with cutting-edge technology and personalized learning
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                {
                  icon: <Brain className="size-8" />,
                  title: 'AI-Powered Tutoring',
                  description: 'Get instant explanations, personalized feedback, and learn at your own pace with our AI tutor.',
                },
                {
                  icon: <Zap className="size-8" />,
                  title: 'Interactive Learning',
                  description: 'Explore 3D models, run simulations, and interact with concepts like never before.',
                },
                {
                  icon: <BarChart3 className="size-8" />,
                  title: 'Track Progress',
                  description: 'Monitor your learning journey with detailed analytics and achievement badges.',
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="glass-card p-8 rounded-2xl hover:shadow-xl transition-shadow"
                >
                  <div className="text-primary mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Student Stories</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Join thousands of students learning smarter, not harder
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                {
                  name: 'Sarah Chen',
                  role: 'Biology Student',
                  quote: 'The AI tutor helped me understand complex concepts instantly. My grades improved by 30%!',
                  avatar: '👩‍🎓',
                },
                {
                  name: 'Alex Rodriguez',
                  role: 'Physics Enthusiast',
                  quote: 'The 3D visualizations made physics intuitive. I finally understand quantum mechanics!',
                  avatar: '👨‍🎓',
                },
                {
                  name: 'Jordan Lee',
                  role: 'Chemistry Student',
                  quote: 'Learning became fun. The progress tracking keeps me motivated every day.',
                  avatar: '👩‍🔬',
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="glass-card p-6 rounded-2xl"
                >
                  <div className="text-4xl mb-4">{testimonial.avatar}</div>
                  <p className="text-foreground/80 mb-4">"{testimonial.quote}"</p>
                  <div className="pt-4 border-t">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600/10 to-blue-800/10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Learning?</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Join our community of learners and start your journey today.
              </p>
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  Get Started Free
                  <ArrowRight className="size-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4 gradient-text">Learn AI</h3>
              <p className="text-muted-foreground text-sm">
                The future of education is here. Learn smarter with AI.
              </p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Blog'] },
              { title: 'Company', links: ['About', 'Careers', 'Contact'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies'] },
            ].map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t pt-8 text-center text-muted-foreground text-sm">
            <p>&copy; 2024 Learn AI. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  )
}
