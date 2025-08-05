import logo from './logo.svg';
import './App.css';

import Header from './common/Header';
import Footer from './common/Footer';

import Home from './pages/home/Home';
import Todos from './pages/todos/Todos';
import ViewWrapper from './pages/todos/View';
import EditWrapper from './pages/todos/Edit';
import Add from './pages/todos/Add';

import { BrowserRouter as Router, Route, Routes } from "react-router";


function App() {
  return (
    <div className='container'>
    <Router>
      <Header />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/todos/add" element={<Add />} />
        <Route path="/todos/view/:id" element={<ViewWrapper />} />
        <Route path="/todos/edit/:id" element={<EditWrapper />} />
      </Routes>
      <Footer />
    </Router>
    </div>
  );
}

export default App;
