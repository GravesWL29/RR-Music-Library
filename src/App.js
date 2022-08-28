import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import React, {Suspense} from 'react';
import { useEffect, useState } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import './components/Header.css'
import Home from './components/HomePage';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  let [searchTerm, setSearchTerm] = useState('')
  let [data, setData] = useState([])
  let [message, setMessage] = useState('Search for Music!')

  useEffect(() => {
    if (searchTerm) {
      document.title=`${searchTerm} Music`
      const fetchData = async () => {
        const response = await fetch(`https://itunes.apple.com/search?term=${searchTerm}`)
        const resData = await response.json()
        if(resData.results.length > 0) {
          setData(resData.results)
        } else {
          setMessage('Not Found')
        }
      }
      fetchData()
  }
  }, [searchTerm])

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearchTerm(term)
  }

  return (
    <div className="App">
      <Router>
      <header className="HeaderHead">Welcome to my music search Library!</header>
      <div className="navBar">
                    <ul>
                      <li>
                      <Link to="/">Home</Link>
                      </li>
                      <li>
                      <Link to="/about">About Us</Link>
                      </li>
                      <li>
                      <Link to="/contact">Contact</Link>
                      </li>
                    </ul>
                </div>
      <SearchBar handleSearch={handleSearch} />
      {message}
      <Suspense fallback={<p>loading...</p>}>
      <Gallery data={data} />
      </Suspense>

      
      <div className="display">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;


