'use client'

import { Navbar } from '@/components/layout/navbar'
import { SubjectCard } from '@/components/cards/subject-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { mockUser, mockSubjects, mockProgressStats, mockBadges } from '@/lib/mock-data'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { Flame, Trophy, Zap, TrendingUp } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const chartData = [
  { day: 'Mon', hours: 1.5 },
  { day: 'Tue', hours: 2 },
  { day: 'Wed', hours: 2.5 },
  { day: 'Thu', hours: 1 },
  { day: 'Fri', hours: 3 },
  { day: 'Sat', hours: 2.5 },
  { day: 'Sun', hours: 1.5 },
]

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="space-y-12"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Welcome Banner */}
            <motion.div variants={staggerItem}>
              <Card className="bg-gradient-to-r from-blue-600/20 to-blue-800/20 border-blue-400/30">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-4xl font-bold mb-2">
                        Welcome back, <span className="gradient-text">{mockUser.name}!</span>
                      </h1>
                      <p className="text-muted-foreground text-lg">
                        You&apos;re doing great! Keep up the momentum.
                      </p>
                    </div>
                    <div className="hidden md:block text-6xl">🚀</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {[
                {
                  icon: <Flame className="size-6 text-orange-500" />,
                  label: 'Learning Streak',
                  value: `${mockUser.learningStreak}`,
                  suffix: 'days',
                },
                {
                  icon: <Zap className="size-6 text-yellow-500" />,
                  label: 'Total XP',
                  value: `${mockUser.totalXP}`,
                  suffix: 'points',
                },
                {
                  icon: <TrendingUp className="size-6 text-green-500" />,
                  label: 'Lessons Done',
                  value: `${mockUser.lessonsCompleted}`,
                  suffix: 'completed',
                },
                {
                  icon: <Trophy className="size-6 text-purple-500" />,
                  label: 'Quiz Average',
                  value: '82',
                  suffix: '%',
                },
              ].map((stat, index) => (
                <motion.div key={index} variants={staggerItem}>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                          <p className="text-3xl font-bold">{stat.value}</p>
                          <p className="text-xs text-muted-foreground mt-1">{stat.suffix}</p>
                        </div>
                        <div className="bg-secondary/50 p-2 rounded-lg">{stat.icon}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Weekly Study Chart */}
            <motion.div variants={staggerItem}>
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Study Activity</CardTitle>
                  <CardDescription>Your study hours this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="day" stroke="var(--muted-foreground)" />
                      <YAxis stroke="var(--muted-foreground)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--card)',
                          border: `1px solid var(--border)`,
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="hours"
                        stroke="var(--primary)"
                        strokeWidth={2}
                        dot={{ fill: 'var(--primary)', r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Continue Learning */}
            <motion.div variants={staggerItem}>
              <div>
                <h2 className="text-2xl font-bold mb-6">Continue Learning</h2>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  {mockSubjects.map((subject, index) => (
                    <SubjectCard key={subject.id} subject={subject} index={index} />
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Achievement Badges */}
            <motion.div variants={staggerItem}>
              <Card>
                <CardHeader>
                  <CardTitle>Your Achievements</CardTitle>
                  <CardDescription>Keep learning to unlock more badges</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {mockBadges.map((badge) => (
                      <motion.div
                        key={badge.id}
                        className="flex flex-col items-center gap-2"
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
                        <p className="text-xs font-semibold text-center line-clamp-2">
                          {badge.name}
                        </p>
                        {!badge.unlockedAt && (
                          <Badge variant="secondary" className="text-xs">
                            Locked
                          </Badge>
                        )}
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
