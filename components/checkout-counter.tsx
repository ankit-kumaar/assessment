import { ShoppingCart, User } from "lucide-react"

interface CheckoutCounterProps {
  id: number
  queue: number[]
  total: number
  customers: number
  isHighlighted: boolean
}

export function CheckoutCounter({ id, queue, total, customers, isHighlighted }: CheckoutCounterProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${isHighlighted ? "ring-2 ring-green-500" : ""}`}>
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Counter {id}</h2>
        <div className="flex items-center text-gray-600">
          <User className="h-5 w-5 mr-1" />
          <span>
            {customers} {customers === 1 ? "customer" : "customers"}
          </span>
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="space-y-2">
          {queue.map((items, index) => (
            <div key={index} className="bg-gray-100 p-3 rounded-md flex items-center justify-between">
              <div className="flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2 text-gray-500" />
                <span>
                  {items} {items === 1 ? "item" : "items"}
                </span>
              </div>
              <span className="text-red-500">—</span>
            </div>
          ))}
          {queue.length === 0 && <div className="text-gray-400 text-center py-8">No customers in queue</div>}
        </div>

        {queue.length > 0 && (
          <div className="mt-4 pt-3 text-right text-gray-700">
            <p>Total Items: {total}</p>
          </div>
        )}
      </div>
    </div>
  )
}
