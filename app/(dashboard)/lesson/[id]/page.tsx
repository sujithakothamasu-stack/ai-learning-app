'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { LessonList, LessonContent } from '@/components/learning/lesson-content'
import { ModelViewer } from '@/components/3d/model-viewer'
import { mockLessons } from '@/lib/mock-data'
import { motion } from 'framer-motion'
import { pageTransition, staggerContainer, staggerItem } from '@/lib/animations'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

interface LessonPageProps {
  params: {
    id: string
  }
}

export default function LessonPage({ params }: LessonPageProps) {
  const [activeLesson, setActiveLesson] = useState(mockLessons[0])

  return (
    <>
      <Navbar />
      <motion.main
        className="min-h-screen pt-20 pb-10"
        variants={pageTransition}
        initial="initial"
        animate="animate"
      >
        {/* Mobile View - Use Tabs/Sheet */}
        <div className="md:hidden px-4 py-6">
          <div className="space-y-6">
            <motion.div variants={staggerItem}>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Menu className="size-4" />
                    View Topics
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64">
                  <SheetHeader>
                    <SheetTitle>Topics</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4">
                    <LessonList
                      lessons={mockLessons}
                      activeLesson={activeLesson}
                      onSelectLesson={setActiveLesson}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </motion.div>

            <motion.div
              className="space-y-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <LessonContent lesson={activeLesson} />
              <ModelViewer
                title="3D Visualization"
                description="Interactive 3D model of the lesson concepts"
              />
            </motion.div>
          </div>
        </div>

        {/* Desktop View - 3 Column Layout */}
        <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Left Sidebar - Topics (20%) */}
            <motion.div
              variants={staggerItem}
              className="col-span-1 space-y-4 max-h-screen sticky top-20 overflow-y-auto"
            >
              <div>
                <h3 className="font-semibold text-sm mb-3">Topics</h3>
                <LessonList
                  lessons={mockLessons}
                  activeLesson={activeLesson}
                  onSelectLesson={setActiveLesson}
                />
              </div>
            </motion.div>

            {/* Main Content (55%) */}
            <motion.div
              variants={staggerItem}
              className="col-span-2 space-y-6 max-h-screen overflow-y-auto"
            >
              <LessonContent lesson={activeLesson} />
            </motion.div>

            {/* Right Sidebar - 3D Model (25%) */}
            <motion.div
              variants={staggerItem}
              className="col-span-1 space-y-4 max-h-screen sticky top-20 overflow-y-auto"
            >
              <ModelViewer
                title="3D Model"
                description="Interactive visualization"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.main>
    </>
  )
}
