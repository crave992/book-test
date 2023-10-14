import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../supabase';
import { Book } from '../models/Book';

const useBook = () => {
  const [data, setData] = useState<Book[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<boolean>(false);

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('tbl_books').select('*');
      if (error) {
        throw error;
      }
      if (data) {
        setData(data);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, [setData]);

  const fetchBookById = async (id: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('tbl_books').select('*').eq('id', id);
      if (error) {
        throw error;
      }
      if (data && data.length > 0) {
        return data[0];
      } else {
        throw new Error('Book not found');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createBook = async (book: Book) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('tbl_books').insert([book]).select();
      if (error) {
        throw error;
      }
      if (data) {
        await fetchBooks();
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateBook = async (id: string, book: Book) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('tbl_books').update(book).eq('id', id).select();
      if (error) {
        throw error;
      }
      if (data) {
        setTrigger(prev => !prev);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (id: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('tbl_books').delete().eq('id', id);
      if (error) {
        throw error;
      }
      if (data) {
        setTrigger(prev => !prev);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []); 

  return { data, error, loading, fetchBooks, fetchBookById, createBook, updateBook, deleteBook };
};

export { useBook };
