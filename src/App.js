import './App.css';

import Layout from './common/Layout';

import Home from './pages/home/Home';
import Todos from './pages/todos/Todos';
import ViewWrapper from './pages/todos/View';
import EditWrapper from './pages/todos/Edit';
import Add from './pages/todos/Add';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // ✅ corrected import

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/todos/add" element={<Add />} />
          <Route path="/todos/view/:id" element={<ViewWrapper />} />
          <Route path="/todos/edit/:id" element={<EditWrapper />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
