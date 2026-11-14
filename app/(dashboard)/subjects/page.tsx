'use client'

import { Navbar } from '@/components/layout/navbar'
import { SubjectCard } from '@/components/cards/subject-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { mockSubjects } from '@/lib/mock-data'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { Filter, Search } from 'lucide-react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'

export default function SubjectsPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const difficulties = ['Beginner', 'Intermediate', 'Advanced']

  const filteredSubjects = mockSubjects.filter((subject) => {
    const matchesDifficulty = !selectedDifficulty || subject.difficulty === selectedDifficulty
    const matchesSearch = subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         subject.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesDifficulty && matchesSearch
  })

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="space-y-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Header */}
            <motion.div variants={staggerItem}>
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Subjects</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Choose a subject and start your learning journey. Each subject includes interactive lessons, quizzes, and AI-powered tutoring.
                </p>
              </div>
            </motion.div>

            {/* Search and Filter Bar */}
            <motion.div
              variants={staggerItem}
              className="glass-card p-6 rounded-2xl space-y-4"
            >
              <div className="space-y-4">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                  <Input
                    placeholder="Search subjects..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Difficulty Filter */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Filter className="size-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Filter by Difficulty</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant={!selectedDifficulty ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedDifficulty(null)}
                    >
                      All Levels
                    </Button>
                    {difficulties.map((difficulty) => (
                      <Button
                        key={difficulty}
                        variant={selectedDifficulty === difficulty ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedDifficulty(difficulty)}
                      >
                        {difficulty}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Results Count */}
            <motion.div variants={staggerItem} className="text-muted-foreground">
              Showing {filteredSubjects.length} subject{filteredSubjects.length !== 1 ? 's' : ''}
            </motion.div>

            {/* Subject Grid */}
            {filteredSubjects.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {filteredSubjects.map((subject, index) => (
                  <SubjectCard key={subject.id} subject={subject} index={index} />
                ))}
              </motion.div>
            ) : (
              <motion.div variants={staggerItem} className="text-center py-16">
                <p className="text-2xl font-semibold mb-2">No subjects found</p>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </motion.div>
            )}

            {/* Featured Section */}
            <motion.div variants={staggerItem}>
              <Card className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-blue-400/30">
                <CardHeader>
                  <CardTitle>Learning Tips</CardTitle>
                  <CardDescription>Make the most of your learning experience</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">→</span>
                      <span>Start with Beginner level if new to a subject</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">→</span>
                      <span>Complete all lessons in a subject for achievement badges</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">→</span>
                      <span>Use AI tutor for instant help with difficult concepts</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">→</span>
                      <span>Review 3D models multiple times to deepen understanding</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </>
  )
}
