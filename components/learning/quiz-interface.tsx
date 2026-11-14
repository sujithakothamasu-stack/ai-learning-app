'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react'
import { Quiz, Question } from '@/lib/types'
import { staggerContainer, staggerItem } from '@/lib/animations'

interface QuizInterfaceProps {
  quiz: Quiz
}

export function QuizInterface({ quiz }: QuizInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string | number>>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1
  const isAnswered = currentQuestion.id in selectedAnswers

  const handleSelectAnswer = (answer: string | number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }))
  }

  const handleNext = () => {
    if (isLastQuestion) {
      calculateScore()
      setShowResults(true)
    } else {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const calculateScore = () => {
    let correctCount = 0
    quiz.questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctCount++
      }
    })
    setScore(Math.round((correctCount / quiz.questions.length) * 100))
  }

  const isPassing = score >= quiz.passingScore

  if (showResults) {
    return (
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="space-y-6"
      >
        <Card>
          <CardContent className="pt-8 text-center space-y-6">
            <motion.div variants={staggerItem}>
              <div className="text-6xl font-bold mb-2">
                {score}
                <span className="text-3xl">%</span>
              </div>
              <p className="text-muted-foreground">Quiz Complete!</p>
            </motion.div>

            {isPassing && (
              <motion.div
                variants={staggerItem}
                className="text-4xl animate-bounce"
              >
                🎉
              </motion.div>
            )}

            <motion.div
              variants={staggerItem}
              className={`inline-block px-4 py-2 rounded-lg ${
                isPassing
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
              }`}
            >
              {isPassing ? 'Passed!' : 'Try Again'}
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="space-y-2 text-sm"
            >
              <p>Correct: {Object.values(selectedAnswers).filter((ans, idx) => ans === quiz.questions[idx]?.correctAnswer).length} / {quiz.questions.length}</p>
              <p>Passing Score: {quiz.passingScore}%</p>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="flex gap-3 justify-center"
            >
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentQuestionIndex(0)
                  setSelectedAnswers({})
                  setShowResults(false)
                  setScore(0)
                }}
              >
                Review Answers
              </Button>
              <Button>
                Continue Learning
                <ArrowRight className="size-4 ml-2" />
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={staggerItem}>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {quiz.questions.length}
                </p>
                <h2 className="text-2xl font-bold mt-1">
                  {quiz.title}
                </h2>
              </div>
              <Badge variant="secondary">
                {Math.round(((currentQuestionIndex) / quiz.questions.length) * 100)}%
              </Badge>
            </div>
            {/* Progress Bar */}
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentQuestionIndex) / quiz.questions.length) * 100}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          variants={staggerItem}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                {currentQuestion.text}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswers[currentQuestion.id] === index
                const isCorrect = index === currentQuestion.correctAnswer
                const showFeedback = isAnswered

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleSelectAnswer(index)}
                    className={`w-full p-4 rounded-lg text-left border-2 transition-all ${
                      isSelected
                        ? showFeedback
                          ? isCorrect
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                            : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                          : 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex-1">{option}</span>
                      {showFeedback && isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          {isCorrect ? (
                            <CheckCircle className="size-5 text-green-500" />
                          ) : (
                            <XCircle className="size-5 text-red-500" />
                          )}
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                )
              })}

              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-secondary/30 rounded-lg"
                >
                  <p className="text-sm font-semibold mb-2">Explanation:</p>
                  <p className="text-sm text-muted-foreground">
                    {currentQuestion.explanation}
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <motion.div variants={staggerItem} className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        <Button
          className="flex-1"
          onClick={handleNext}
          disabled={!isAnswered}
        >
          {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
          <ArrowRight className="size-4 ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  )
}
