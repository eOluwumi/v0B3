"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw } from "lucide-react"

interface CaptchaProps {
  onVerify: (isVerified: boolean) => void
  isVerified: boolean
}

export function Captcha({ onVerify, isVerified }: CaptchaProps) {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [userAnswer, setUserAnswer] = useState("")
  const [correctAnswer, setCorrectAnswer] = useState(0)

  const generateQuestion = () => {
    const operations = [
      { type: "add", symbol: "+" },
      { type: "subtract", symbol: "-" },
      { type: "multiply", symbol: "×" },
    ]

    const operation = operations[Math.floor(Math.random() * operations.length)]
    let num1, num2, result

    switch (operation.type) {
      case "add":
        num1 = Math.floor(Math.random() * 20) + 1
        num2 = Math.floor(Math.random() * 20) + 1
        result = num1 + num2
        break
      case "subtract":
        num1 = Math.floor(Math.random() * 20) + 10
        num2 = Math.floor(Math.random() * 10) + 1
        result = num1 - num2
        break
      case "multiply":
        num1 = Math.floor(Math.random() * 10) + 1
        num2 = Math.floor(Math.random() * 10) + 1
        result = num1 * num2
        break
      default:
        num1 = 5
        num2 = 3
        result = 8
    }

    setQuestion(`${num1} ${operation.symbol} ${num2} = ?`)
    setCorrectAnswer(result)
    setUserAnswer("")
    onVerify(false)
  }

  useEffect(() => {
    generateQuestion()
  }, [])

  useEffect(() => {
    if (userAnswer && Number.parseInt(userAnswer) === correctAnswer) {
      onVerify(true)
    } else if (userAnswer) {
      onVerify(false)
    }
  }, [userAnswer, correctAnswer, onVerify])

  return (
    <Card className="border-2 border-gray-200 dark:border-gray-700">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Verify you're human 🤖</label>
          <Button type="button" variant="ghost" size="sm" onClick={generateQuestion} className="h-6 w-6 p-0">
            <RefreshCw className="h-3 w-3" />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded font-mono text-lg min-w-[120px] text-center">
            {question}
          </div>
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
            placeholder="?"
          />
          {isVerified && <span className="text-green-600 text-sm font-medium">✓ Verified</span>}
        </div>

        {userAnswer && !isVerified && <p className="text-red-500 text-xs mt-2">Incorrect answer. Please try again.</p>}
      </CardContent>
    </Card>
  )
}
