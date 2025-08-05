import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './common/Layout';

import Home from './pages/home/Home';
import Todos from './pages/todos/Todos';
import Add from './pages/todos/Add';
import EditWrapper from './pages/todos/Edit';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/todos/add" element={<Add />} />
          <Route path="/todos/edit/:id" element={<EditWrapper />} />
        </Routes>
      </Layout>
    </Router>
  );
}
