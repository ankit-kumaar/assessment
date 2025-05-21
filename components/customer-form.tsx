"use client"

import type React from "react"
import { useState } from "react"

interface CustomerFormProps {
  onSubmit: (items: number) => void
}

export function CustomerForm({ onSubmit }: CustomerFormProps) {
  const [items, setItems] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate input
    if (!items.trim()) {
      setError("Please enter a number of items")
      return
    }

    const itemCount = Number(items)

    // Check if it's a valid number
    if (isNaN(itemCount)) {
      setError("Please enter a valid number")
      return
    }

    // Check if it's negative
    if (itemCount < 0) {
      setError("Number of items cannot be negative")
      return
    }

    // Clear error and input
    setError("")
    setItems("")

    // Call the onSubmit callback with rounded integer
    onSubmit(Math.round(itemCount))
  }

  return (
    <div className="flex justify-center flex-col items-center">
      <div className="flex w-full max-w-md">
        <input
          type="number"
          min="0"
          value={items}
          onChange={(e) => setItems(e.target.value)}
          placeholder="Enter number of items"
          className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md transition-colors"
        >
          Checkout Items
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  )
}
