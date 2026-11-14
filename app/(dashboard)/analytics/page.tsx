'use client'

import { Navbar } from '@/components/layout/navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockProgressStats, mockBadges } from '@/lib/mock-data'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, Target, BookOpen, Trophy } from 'lucide-react'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const weeklyData = days.map((day, idx) => ({
  name: day,
  hours: mockProgressStats.weeklyStudyHours[idx],
}))

const subjectData = [
  { name: 'Biology', value: 45, color: '#10b981' },
  { name: 'Physics', value: 30, color: '#8b5cf6' },
  { name: 'Chemistry', value: 25, color: '#f97316' },
]

export default function AnalyticsPage() {
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
            <motion.div variants={staggerItem} className="space-y-2">
              <h1 className="text-4xl font-bold">Learning Analytics</h1>
              <p className="text-muted-foreground">Track your progress and achievement</p>
            </motion.div>

            {/* Key Metrics */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {[
                {
                  icon: <BookOpen className="size-6 text-blue-500" />,
                  label: 'Lessons Completed',
                  value: mockProgressStats.totalLessonsCompleted,
                  suffix: '',
                },
                {
                  icon: <TrendingUp className="size-6 text-green-500" />,
                  label: 'Total XP',
                  value: mockProgressStats.totalXP,
                  suffix: 'points',
                },
                {
                  icon: <Target className="size-6 text-purple-500" />,
                  label: 'Average Quiz Score',
                  value: mockProgressStats.averageQuizScore,
                  suffix: '%',
                },
                {
                  icon: <Trophy className="size-6 text-yellow-500" />,
                  label: 'Learning Streak',
                  value: mockProgressStats.learningStreak,
                  suffix: 'days',
                },
              ].map((metric, index) => (
                <motion.div key={index} variants={staggerItem}>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-muted-foreground text-sm mb-1">{metric.label}</p>
                          <p className="text-3xl font-bold">{metric.value}</p>
                          {metric.suffix && (
                            <p className="text-xs text-muted-foreground mt-1">{metric.suffix}</p>
                          )}
                        </div>
                        <div className="bg-secondary/50 p-2 rounded-lg">{metric.icon}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Charts */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {/* Weekly Study Time */}
              <motion.div variants={staggerItem}>
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Study Hours</CardTitle>
                    <CardDescription>Your study activity this week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                        <YAxis stroke="var(--muted-foreground)" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'var(--card)',
                            border: `1px solid var(--border)`,
                          }}
                        />
                        <Bar dataKey="hours" fill="var(--primary)" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Subject Distribution */}
              <motion.div variants={staggerItem}>
                <Card>
                  <CardHeader>
                    <CardTitle>Subject Distribution</CardTitle>
                    <CardDescription>Time spent on each subject</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={subjectData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {subjectData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'var(--card)',
                            border: `1px solid var(--border)`,
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Favorites and Weakest */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={staggerItem}>
                <Card>
                  <CardHeader>
                    <CardTitle>Favorite Subjects</CardTitle>
                    <CardDescription>Where you spend most time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {mockProgressStats.favoriteSubjects.map((subject) => (
                        <div key={subject} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                          <span className="font-medium">{subject}</span>
                          <Badge variant="secondary">Top</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={staggerItem}>
                <Card>
                  <CardHeader>
                    <CardTitle>Areas for Improvement</CardTitle>
                    <CardDescription>Topics to focus on</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {mockProgressStats.weakestTopics.map((topic) => (
                        <div key={topic} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                          <span className="font-medium">{topic}</span>
                          <Badge variant="outline">Practice</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Recent Achievements */}
            <motion.div variants={staggerItem}>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Achievements</CardTitle>
                  <CardDescription>Your unlocked badges and milestones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {mockBadges.map((badge) => (
                      <motion.div
                        key={badge.id}
                        className="flex flex-col items-center gap-2 text-center"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div
                          className={`size-16 rounded-lg flex items-center justify-center text-3xl ${
                            badge.unlockedAt
                              ? 'bg-gradient-to-br from-yellow-400/20 to-yellow-600/20'
                              : 'bg-secondary/50'
                          }`}
                        >
                          {badge.icon}
                        </div>
                        <div>
                          <p className="text-xs font-semibold line-clamp-2">{badge.name}</p>
                          {!badge.unlockedAt && (
                            <Badge variant="secondary" className="text-xs mt-1">
                              Locked
                            </Badge>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </>
  )
}
