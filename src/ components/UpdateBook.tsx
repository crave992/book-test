import { useState, useEffect } from 'react';
import { Book } from '@/services/models/Book';
import { useBook } from '@/services/hooks/useBook';
import Form from './reusable/Form';

const UpdateBook = ({ id, closeModal, refreshBooks }: { id: string; closeModal: () => void; refreshBooks: () => void }) => {
  const { error, loading, fetchBookById, updateBook } = useBook();
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookData = await fetchBookById(id);
        setCurrentBook(bookData);
        setIsFetched(true);
      } catch (err) {
        console.error('Error fetching book by ID:', err);
      }
    };
    if (!isFetched) {
      fetchData();
    }
  }, [fetchBookById, id, isFetched]);

  const handleUpdate = async (book: Book) => {
    if (currentBook) {
      await updateBook(currentBook.id, book);
      closeModal(); // Close the modal on successful update
      refreshBooks(); // Refresh the books in the parent component
    }
  };

  if (loading) {
    return (
      <div className="fixed z-50 inset-0 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) return <p>An error occurred: {error}</p>;
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button className="text-gray-500 hover:text-gray-800" onClick={closeModal}>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h2 className="text-2xl font-bold mb-4">Update Book</h2>
            {currentBook ? (
              <Form
                fields={[
                  { name: 'title', value: currentBook.title, type: 'text', label: 'Title' },
                  { name: 'description', value: currentBook.description, type: 'text', label: 'Description' },
                  { name: 'author', value: currentBook.author, type: 'text', label: 'Author' },
                  {
                    name: 'publishedDate',
                    value: currentBook.published_date ? currentBook.published_date.toString() : '',
                    type: 'date',
                    label: 'Published Date'
                  },
                  { name: 'genre', value: currentBook.genre, type: 'text', label: 'Genre' }
                ]}
                hasOneButton={true}
                onSubmit={handleUpdate}
              />
            ) : (
              <p>Book not found.</p>
            )}
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={closeModal}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBook;
