"use client"

import React, { useEffect } from 'react'
import { Button } from './button'

function DarkmodeToggle() {

    const [darkMode, setDarkMode] = React.useState(false)
   
   useEffect(() => {
    const localTheme = localStorage.getItem('theme')
    if(localTheme === 'dark'){
        document.documentElement.classList.add('dark')
        setDarkMode(true)
    }
   },[])
   
    const toggleDarkMode = () => {
        if(darkMode){
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
            setDarkMode(false)
            
        }
        else{
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
            setDarkMode(true)
        }
    }
  return (
    <>
    <Button 
    onClick={toggleDarkMode}
    variant="default"
    >
        Toggle {darkMode ? 'Light' : 'Dark'} Mode
    </Button>
    </>
  )
}

export default DarkmodeToggle