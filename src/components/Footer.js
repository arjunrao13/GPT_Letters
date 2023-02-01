import React from 'react'
import '../styling/Footer.css';


export default () => {
  return (
    <footer className="Footer">
    Copyright &copy; {new Date().getFullYear()} Letter Manager
    </footer>
  )
}