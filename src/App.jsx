import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import Hero from './components/Hero/Hero.jsx'
import About from './components/About/About.jsx'
import Catalog from './components/Catalog/Catalog.jsx'
import Reviews from './components/Reviews/Reviews.jsx'

function App() {
  const [count, setCount] = useState(0)
  const logoName = 'Jenesius'
  const loveName = 'C любовью JenesiusGroup'
    const about = ' Мы — команда JenesiusGroup, объединяющая творческих людей,\n' +
        '                    которые создают современные цифровые решения для всех.'
  return (
    <>
        <Header logo={logoName}/>
        <Hero />
        <About about={about}/>
        <Catalog />
        <Reviews />
        <Footer love={loveName}/>
    </>
  )
}

export default App
