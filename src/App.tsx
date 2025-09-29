import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import { ArweaveContextProvider } from './hooks/ArweaveContext'
import { WalletContextProvider } from './hooks/WalletContext'

import { TableUpload } from './pages/TableUpload'
import { TableShow } from './pages/TableShow'

function AppInner() {
  return (
    <>
      <nav className="flex gap-4">
        <a href="/">Home</a>
        <a href="/upload">Upload</a>
      </nav>
      <Router>
        <Routes>
          <Route path="/" element={<TableShow />} />
          <Route path="/upload" element={<TableUpload />} />
        </Routes>
      </Router>
    </>
  )
}

function App() {
  return (
    <ArweaveContextProvider>
      <WalletContextProvider>
        <AppInner />
      </WalletContextProvider>
    </ArweaveContextProvider>
  )
}

export default App
