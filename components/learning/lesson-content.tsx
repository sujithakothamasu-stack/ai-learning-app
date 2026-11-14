'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Lesson } from '@/lib/types'
import { motion } from 'framer-motion'
import { staggerItem } from '@/lib/animations'
import { Clock, BookOpen, CheckCircle, Lock } from 'lucide-react'

interface LessonListProps {
  lessons: Lesson[]
  activeLesson: Lesson | null
  onSelectLesson: (lesson: Lesson) => void
}

export function LessonList({ lessons, activeLesson, onSelectLesson }: LessonListProps) {
  return (
    <div className="space-y-2">
      {lessons.map((lesson, index) => {
        const isActive = activeLesson?.id === lesson.id
        const isCompleted = lesson.progress === 100

        return (
          <motion.button
            key={lesson.id}
            onClick={() => onSelectLesson(lesson)}
            variants={staggerItem}
            className={`w-full text-left p-3 rounded-lg transition-all ${
              isActive
                ? 'glass-card border-primary'
                : 'hover:bg-secondary/50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="pt-1">
                {isCompleted ? (
                  <CheckCircle className="size-5 text-green-500" />
                ) : (
                  <div className="size-5 rounded-full border-2 border-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{lesson.title}</p>
                <p className="text-xs text-muted-foreground flex gap-2 mt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" />
                    {lesson.estimatedTime}m
                  </span>
                  <span>{lesson.topicsCount} topics</span>
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-primary">
                  {lesson.progress}%
                </div>
              </div>
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}

interface LessonContentProps {
  lesson: Lesson
}

export function LessonContent({ lesson }: LessonContentProps) {
  return (
    <motion.div variants={staggerItem} className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">{lesson.title}</h2>
            <p className="text-muted-foreground">{lesson.description}</p>
          </div>
          {lesson.progress === 100 && (
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
              Completed
            </Badge>
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold">{lesson.progress}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${lesson.progress}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
      </div>

      {/* Meta Info */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="size-4" />
              <span className="text-sm">{lesson.estimatedTime} min</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="size-4" />
              <span className="text-sm">{lesson.topicsCount} topics</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <Badge className="w-full text-center justify-center">{lesson.difficulty}</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Content Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Lesson Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tab Content */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Explanation</h3>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {lesson.content}
              </p>
            </div>

            {/* Key Points */}
            <div className="bg-secondary/30 rounded-lg p-4 mt-6">
              <h4 className="font-semibold mb-3">Key Points</h4>
              <ul className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="text-primary font-bold">•</span>
                    <span>Important concept {i} about this lesson topic</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quiz Button */}
      {lesson.hasQuiz && (
        <Button size="lg" className="w-full">
          Take Quiz ({lesson.progress}% complete)
        </Button>
      )}
    </motion.div>
  )
}
