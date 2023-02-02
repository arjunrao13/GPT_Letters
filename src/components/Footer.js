import React from 'react'
import '../styling/Footer.css';


const Footer = () => {
  return (
    <footer className="Footer">
    Copyright &copy; {new Date().getFullYear()} Letter Manager
    </footer>
  )
}

export default Footer