# Hypermart Checkout System

A real-time queue management system for hypermart checkout counters that efficiently assigns customers to checkout counters based on the number of items in their cart, ensuring optimal distribution and reduced waiting times.

## Solution Approach

The core of this solution implements a "least items first" assignment algorithm:

1. **Data Structure**: Each checkout counter maintains:
   - A queue of customers (represented by the number of items they have)
   - A running total of items in the queue

2. **Assignment Algorithm**:
   - When a new customer arrives, the system scans all checkout counters
   - It identifies the counter with the minimum total number of items
   - If multiple counters have the same minimum total, it selects the leftmost one (lowest ID)
   - The customer is added to the selected counter's queue
   - The counter's total is updated immediately

3. **Visual Feedback**:
   - The counter that would receive the next customer is highlighted with a green border
   - Each customer's items are displayed in the queue with a shopping cart icon
   - Total items for each counter are displayed at the bottom

## Time Complexity Analysis

The time complexity of the customer assignment algorithm is **O(n)** where n is the number of checkout counters:

- Finding the counter with minimum items requires scanning all n counters once
- Adding a customer to a queue is O(1)
- Updating the counter's total is O(1)

Example:
- With 3 counters: O(3) operations to find the minimum
- With 10 counters: O(10) operations to find the minimum
- With 100 counters: O(100) operations to find the minimum

This linear time complexity is optimal as we must check all counters to find the one with the minimum total items.

## Space Complexity Analysis

The space complexity is **O(m)** where m is the total number of customers across all counters:

- Each customer requires O(1) space to store their item count
- Each counter requires O(k) space where k is the number of customers in that counter
- Total space across all counters is O(m) where m is the sum of all customers

## Assumptions Made During Development

1. **Customer Behavior**:
   - Customers arrive one at a time or in batches
   - Each customer has a non-negative integer number of items
   - Customers do not leave the queue once assigned

2. **Checkout Counter Operation**:
   - All checkout counters operate at the same speed
   - Checkout counters do not close during operation
   - The number of checkout counters remains fixed during a session

3. **Item Processing**:
   - The time to process a customer is proportional to their number of items
   - The goal is to minimize the total number of items in each queue

4. **User Interface**:
   - Users need visual feedback about which counter will receive the next customer
   - Users need to see the current state of all queues
   - Input validation is necessary to prevent invalid customer assignments

## Edge Cases Handled

1. **First Customer Assignment**:
   - When all queues are empty, the first customer is assigned to the leftmost counter (Counter 1)

2. **Multiple Counters with Same Total**:
   - If multiple counters have the same minimum total, the customer is assigned to the counter with the lowest ID (leftmost)

3. **Zero Items**:
   - Customers with 0 items are valid and assigned to the appropriate counter

4. **Input Validation**:
   - Negative numbers are rejected with an error message
   - Non-numeric input is rejected with an error message
   - Empty input is rejected with an error message
   - Decimal numbers are rounded to the nearest integer

5. **Large Numbers**:
   - The system can handle customers with very large numbers of items
   - The UI remains responsive even with many customers in the queues

## Installation and Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/hypermart-checkout-system.git
   cd hypermart-checkout-system
