import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(1)

    const handleNext = () => {
        setCurrentIndex((prevIndex) => prevIndex + 1 === images.length ? 1 : prevIndex + 1)
    }

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1)
    }

    const handleDotClick = (index) => {
        setCurrentIndex(index)
    }

    return (
        <div className='carousel'>
            <div className='carousel-images'>
            <img key={currentIndex-1} src={images[currentIndex-1]} />
            <img key={currentIndex} src={images[currentIndex]} />
            <img key={currentIndex+1} src={images[currentIndex+1]} />
            <div className='slide-direction'>
                <div className='left' onClick={handlePrevious}>
                    <svg xmlns='http://www.w3.org/2000/svg' height='20' width='20' viewBox='0 96 960 960'>
                        <path d='M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z' />
                    </svg>
                </div>
                <div className='right' onClick={handleNext}>
                    <svg xmlns='http://www.w3.org/2000/svg' height='20' width='20' viewBox='0 96 960 960'>
                        <path d='m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z' />
                    </svg>
                </div>
            </div>
            </div>
            <div className='indicator'>
                {images.map((_, index) => (
                    <div key={index} className={`dot ${currentIndex === index ? 'active' : ''}`} onClick={() => handleDotClick(index)}></div>
                ))}
            </div>
        </div>
    )
}

export default Carousel