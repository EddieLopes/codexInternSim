import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = import.meta.env.VITE_GEMINI_API_KEY
const modelCandidates = ['gemini-2.0-flash', 'gemini-flash-latest']

export async function generateMentorResponse(prompt: string): Promise<string> {
  if (!apiKey) {
    throw new Error('Missing Gemini API key. Add VITE_GEMINI_API_KEY to your .env file.')
  }

  const genAI = new GoogleGenerativeAI(apiKey)
  let lastError: unknown

  for (const modelName of modelCandidates) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName })
      const result = await model.generateContent([
        `You are the Intern Sim AI mentor. Give concise, practical coaching for a job simulation learner.

Keep the response encouraging, specific, and under 120 words.

Learner message:
${prompt}`,
      ])

      return result.response.text()
    } catch (error) {
      lastError = error
    }
  }

  console.error('Gemini mentor request failed', lastError)
  throw new Error('AI mentor is unavailable right now. Please try again in a moment.')
}
