// src/hooks/useTodo.js
import { useState, useEffect } from 'react';
import api from '../api/api'; // adjust path if needed

export default function useTodo(id) {
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setTodo(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    api.get(`/api/v1/todos/${id}`)
      .then(res => {
        if (cancelled) return;
        const payload = res?.data?.data ?? res?.data ?? null;
        setTodo(payload);
      })
      .catch(err => {
        if (cancelled) return;
        setError(err?.response?.data?.message || err.message || 'Failed to load todo');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [id]);

  return { todo, setTodo, loading, error };
}
