import type { Course } from '../types/schema'

export const dummyCourse: Course = {
  id: 'intern-sim-101',
  title: 'Intern Sim: AI Product Builder',
  description: 'Build an AI-driven job simulation experience with hands-on lessons designed for product-ready learning.',
  thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  totalLessons: 4,
  lessons: [
    {
      id: 1,
      title: 'Configure the code workspace',
      type: 'code-editor',
      startingState: `// Welcome to Intern Sim
// Complete this lesson by reviewing the workspace configuration.

function bootstrap() {
  console.log('AI workspace loaded')
}

bootstrap()`,
      isLocked: false,
    },
    {
      id: 2,
      title: 'Run the terminal flow',
      type: 'terminal',
      startingState: `> npm install
> npm run dev

VITE v5.0.0 ready in 420 ms
  Local: http://localhost:5173/
  Network: http://10.0.0.129:5173/`,
      isLocked: true,
    },
    {
      id: 3,
      title: 'Complete the project quiz',
      type: 'quiz',
      startingState: 'Which principle is most important for the Dark Matter theme?',
      isLocked: true,
    },
    {
      id: 4,
      title: 'Coach with AI feedback',
      type: 'chat-only',
      startingState: 'Review the lesson summary and ask the AI for help.',
      isLocked: true,
    },
  ],
}
