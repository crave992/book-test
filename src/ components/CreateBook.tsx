import { useState } from 'react';
import { Book } from '@/services/models/Book';
import { useBook } from '@/services/hooks/useBook';
import Form from './reusable/Form';

const CreateBook = () => {
  const { createBook } = useBook();
  const fields = [
    { name: 'title', value: '', type: 'text', label: 'Title' },
    { name: 'description', value: '', type: 'text', label: 'Description' },
    { name: 'author', value: '', type: 'text', label: 'Author' },
    { name: 'published_date', value: '', type: 'date', label: 'Published Date' },
    { name: 'genre', value: '', type: 'text', label: 'Genre' }
  ];

  const handleCreate = (book: Book) => {
    createBook(book);
    window.location.reload();
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create New Book</h2>
      <Form
        fields={fields}
        hasOneButton={true}
        onSubmit={handleCreate}
      />
    </div>
  );
};

export default CreateBook;
