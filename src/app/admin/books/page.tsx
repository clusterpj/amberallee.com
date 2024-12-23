'use client'

import { useState } from 'react'
import BookForm from '@/components/admin/BookForm'
import { Button } from '@/components/ui/button'

export default function AdminBooksPage() {
  const [isAddingBook, setIsAddingBook] = useState(false)

  const handleAddBook = async (bookData: any) => {
    try {
      // TODO: Implement API call to save book
      console.log('Saving book:', bookData)
      setIsAddingBook(false)
    } catch (error) {
      console.error('Error saving book:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Book Management</h1>
        <Button onClick={() => setIsAddingBook(!isAddingBook)}>
          {isAddingBook ? 'Cancel' : 'Add New Book'}
        </Button>
      </div>

      {isAddingBook ? (
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Add New Book</h2>
          <BookForm onSubmit={handleAddBook} />
        </div>
      ) : (
        <div className="grid gap-4">
          {/* TODO: Add book list component here */}
          <p className="text-gray-500">No books added yet.</p>
        </div>
      )}
    </div>
  )
}
