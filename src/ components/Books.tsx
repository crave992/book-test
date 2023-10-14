import { useEffect, useState } from 'react';
import { useBook } from '@/services/hooks/useBook';
import UpdateBook from './UpdateBook';

const Books = () => {
  const { data, loading, error, fetchBooks, updateBook, deleteBook } = useBook();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  useEffect(() => {
    if (!data) {
      fetchBooks();
    }
  }, [data, fetchBooks]);

  const fetchAllBooks = async () => {
    await fetchBooks(); // Fetch all books again to update the list
  };

  const handleUpdateClick = (id: string) => {
    setSelectedBookId(id);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteBook(id);
    fetchAllBooks(); // Refresh the book list after a successful delete
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      {data &&
        data.map((book) => (
          <div key={book.id} className="w-full md:w-1/2 lg:w-1/3 p-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{book.genre}</div>
                <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                  {book.title}
                </a>
                <p className="mt-2 text-gray-500">{book.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => handleUpdateClick(book.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      {isUpdateModalOpen && selectedBookId && (
        <UpdateBook id={selectedBookId} closeModal={() => setIsUpdateModalOpen(false)} refreshBooks={fetchAllBooks} />
      )}
    </div>
  );
};

export default Books;
