'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Subject } from '@/lib/types'
import { hoverLift } from '@/lib/animations'

interface SubjectCardProps {
  subject: Subject
  index?: number
}

export function SubjectCard({ subject, index = 0 }: SubjectCardProps) {
  const difficultyColors = {
    'Beginner': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Intermediate': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'Advanced': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  }

  const progressPercentage = (subject.lessonsCompleted / subject.lessonsTotal) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      {...hoverLift}
    >
      <Link href={`/subjects/${subject.id}`}>
        <Card className="cursor-pointer h-full">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="text-4xl mb-2">{subject.icon}</div>
              <Badge className={difficultyColors[subject.difficulty]}>
                {subject.difficulty}
              </Badge>
            </div>
            <CardTitle className="text-2xl">{subject.name}</CardTitle>
            <CardDescription>{subject.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-semibold">{Math.round(progressPercentage)}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-background/50 rounded-lg p-2">
                <div className="text-muted-foreground text-xs">Lessons</div>
                <div className="font-semibold">
                  {subject.lessonsCompleted}/{subject.lessonsTotal}
                </div>
              </div>
              <div className="bg-background/50 rounded-lg p-2">
                <div className="text-muted-foreground text-xs">Est. Time</div>
                <div className="font-semibold">{subject.estimatedTime}h</div>
              </div>
            </div>

            <Button className="w-full" variant="default">
              Continue Learning
            </Button>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
