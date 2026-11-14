export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  joinedDate: Date
  learningStreak: number
  totalXP: number
  lessonsCompleted: number
}

export interface Subject {
  id: string
  name: string
  description: string
  icon: string
  color: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  progress: number
  estimatedTime: number
  lessonsTotal: number
  lessonsCompleted: number
}

export interface Lesson {
  id: string
  title: string
  subjectId: string
  description: string
  content: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  estimatedTime: number
  progress: number
  hasQuiz: boolean
  topicsCount: number
}

export interface Quiz {
  id: string
  title: string
  lessonId: string
  description: string
  questions: Question[]
  timeLimit?: number
  passingScore: number
  userScore?: number
}

export interface Question {
  id: string
  text: string
  type: 'multiple-choice' | 'true-false' | 'matching'
  options: string[]
  correctAnswer: string | number
  explanation: string
}

export interface AIMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  sources?: string[]
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt?: Date
  requirement: string
}

export interface ProgressStats {
  totalLessonsCompleted: number
  totalXP: number
  learningStreak: number
  averageQuizScore: number
  favoriteSubjects: string[]
  weakestTopics: string[]
  weeklyStudyHours: number[]
}
