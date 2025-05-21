"use client"

import { useState, useEffect } from "react"
import { CheckoutCounter } from "@/components/checkout-counter"
import { CustomerForm } from "@/components/customer-form"

export default function Home() {
  // Initialize three checkout counters with sample data to match the reference image
  const [checkouts, setCheckouts] = useState([
    { id: 1, queue: [5, 1, 2, 1], total: 9 },
    { id: 2, queue: [12], total: 12 },
    { id: 3, queue: [6, 1, 1], total: 8 },
  ])

  // Track which counter will receive the next customer
  const [nextCounterIndex, setNextCounterIndex] = useState<number | null>(null)

  // Function to assign a new customer to the checkout with the fewest items
  const assignCustomer = (items: number) => {
    // Find the checkout with the minimum total items
    let minTotal = Number.POSITIVE_INFINITY
    let minIndex = 0

    checkouts.forEach((checkout, index) => {
      if (checkout.total < minTotal) {
        minTotal = checkout.total
        minIndex = index
      }
    })

    // Create a copy of the checkouts array
    const updatedCheckouts = [...checkouts]

    // Add the new customer to the selected checkout
    updatedCheckouts[minIndex].queue.push(items)
    updatedCheckouts[minIndex].total += items

    // Update the state
    setCheckouts(updatedCheckouts)

    // Calculate the next counter for highlighting
    calculateNextCounter(updatedCheckouts)
  }

  // Calculate which counter would receive the next customer
  const calculateNextCounter = (currentCheckouts = checkouts) => {
    let minTotal = Number.POSITIVE_INFINITY
    let minIndex = 0

    currentCheckouts.forEach((checkout, index) => {
      if (checkout.total < minTotal) {
        minTotal = checkout.total
        minIndex = index
      }
    })

    setNextCounterIndex(minIndex)
  }

  // Reset all checkout counters
  const resetCheckouts = () => {
    setCheckouts([
      { id: 1, queue: [], total: 0 },
      { id: 2, queue: [], total: 0 },
      { id: 3, queue: [], total: 0 },
    ])
    calculateNextCounter([
      { id: 1, queue: [], total: 0 },
      { id: 2, queue: [], total: 0 },
      { id: 3, queue: [], total: 0 },
    ])
  }

  // Load sample data
  const loadSampleData = () => {
    setCheckouts([
      { id: 1, queue: [5, 1, 2, 1], total: 9 },
      { id: 2, queue: [12], total: 12 },
      { id: 3, queue: [6, 1, 1], total: 8 },
    ])
    calculateNextCounter([
      { id: 1, queue: [5, 1, 2, 1], total: 9 },
      { id: 2, queue: [12], total: 12 },
      { id: 3, queue: [6, 1, 1], total: 8 },
    ])
  }

  // Calculate the next counter on initial render
  useEffect(() => {
    calculateNextCounter()
  }, [])

  return (
    <main className="min-h-screen bg-[#f0f4fa] flex flex-col items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Hypermart Checkout System</h1>
          <p className="text-gray-600 mb-4">Real-time queue management system</p>

          <div className="flex justify-center gap-2 mb-4">
            <button
              onClick={resetCheckouts}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors text-sm"
            >
              Reset Queues
            </button>
            <button
              onClick={loadSampleData}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors text-sm"
            >
              Load Sample Data
            </button>
          </div>
        </div>

        <CustomerForm onSubmit={assignCustomer} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {checkouts.map((checkout, index) => (
            <CheckoutCounter
              key={checkout.id}
              id={checkout.id}
              queue={checkout.queue}
              total={checkout.total}
              customers={checkout.queue.length}
              isHighlighted={index === nextCounterIndex}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
