import React from 'react'
import './Navbar.css'
import { useCustomTheme } from '../../context/interface';
import { Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const { currentTheme, setCustomTheme } = useCustomTheme();

  const toggleTheme = () => {
    if (currentTheme === "dark") setCustomTheme("light");
    else setCustomTheme("dark");
  };

  return (
    <div className='navbar'>
      <h1>Mini Issue Tracker</h1>
      {currentTheme === 'dark' ? 
        <Sun
        size={24}
        color="rgb(247, 243, 243)"
        onClick={toggleTheme}
        style={{ cursor: "pointer" }}
        />
        : 
        <Moon 
        size={24}
        color="rgb(20, 18, 18)"
        onClick={toggleTheme}
        style={{ cursor: "pointer" }}
        />
      }
    </div>
  )
}

export default Navbar