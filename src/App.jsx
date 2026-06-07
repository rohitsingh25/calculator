import { useState, useEffect } from 'react'

function App() {
  const [display, setDisplay] = useState('0')
  const [history, setHistory] = useState('')
  const [shouldReset, setShouldReset] = useState(false)
  const [heartActive, setHeartActive] = useState(false)

  // Mobile Swipe Gestures on display screen for backspace
  const [touchStartX, setTouchStartX] = useState(null)
  const [touchEndX, setTouchEndX] = useState(null)

  const triggerHaptic = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(8) // subtle click tactile pulse
      } catch (e) {
        // Ignore vibration errors if blocked by permissions
      }
    }
  }

  const appendValue = (val) => {
    triggerHaptic()
    let currentDisplay = display
    let currentHeartActive = heartActive
    let currentShouldReset = shouldReset

    if (currentHeartActive || currentShouldReset || currentDisplay === 'Error') {
      currentDisplay = '0'
      setHistory('')
      setHeartActive(false)
      setShouldReset(false)
      // Update local variables for immediate update below
      currentDisplay = '0'
    }

    if (currentDisplay === '0' && !isNaN(val)) {
      setDisplay(val)
    } else {
      setDisplay(currentDisplay + val)
    }
  }

  const clearScreen = () => {
    triggerHaptic()
    setDisplay('0')
    setHistory('')
    setHeartActive(false)
    setShouldReset(false)
  }

  const handleDelete = () => {
    triggerHaptic()
    if (heartActive || shouldReset || display === 'Error') {
      clearScreen()
      return
    }
    if (display.length <= 1) {
      setDisplay('0')
    } else {
      setDisplay(display.slice(0, -1))
    }
  }

  const calculate = () => {
    triggerHaptic()
    let expression = display

    // Check division by zero (logic matches index.html)
    if (/\/0(?:\.0*)?(?!\d)/.test(expression)) {
      setHistory(expression + ' =')
      setDisplay('Undefined ❤️')
      setHeartActive(true)
      setShouldReset(true)
      return
    }

    try {
      // Safely evaluate standard mathematical expression in strict mode
      let result = Function('"use strict";return (' + expression + ')')()
      if (result === Infinity || result === -Infinity || isNaN(result)) {
        setDisplay('Undefined ❤️')
        setHeartActive(true)
        setShouldReset(true)
      } else {
        setHistory(expression + ' =')
        // Limit precision to 8 decimal places and format to string
        setDisplay(Number(result.toFixed(8)).toString())
        setShouldReset(true)
      }
    } catch (error) {
      setDisplay('Error')
      setShouldReset(true)
    }
  }

  // Bind Keyboard inputs for professional desktop interaction
  useEffect(() => {
    const handleKeyDown = (e) => {
      const { key } = e
      if (/^[0-9]$/.test(key)) {
        appendValue(key)
      } else if (['+', '-', '*', '/', '(', ')', '.'].includes(key)) {
        appendValue(key)
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault()
        calculate()
      } else if (key === 'Backspace') {
        handleDelete()
      } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        clearScreen()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [display, history, shouldReset, heartActive])

  // Swipe gesture handlers on the screen
  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return
    const diff = touchStartX - touchEndX
    // Swipe distance > 50px left or right triggers a single backspace
    if (Math.abs(diff) > 50) {
      handleDelete()
    }
    setTouchStartX(null)
    setTouchEndX(null)
  }

  // Dynamically calculate font-size to prevent overflow in display container
  const getFontSize = (text) => {
    const len = text.length
    if (len <= 9) return '2.25rem'
    if (len <= 13) return '1.75rem'
    if (len <= 18) return '1.3rem'
    return '1.05rem'
  }

  return (
    <>
      {/* Premium Ambient Background Blobs */}
      <div className="ambient-glow" aria-hidden="true">
        <div className="glow-blob-1"></div>
        <div className="glow-blob-2"></div>
      </div>

      <div className="calculator-card">
        {/* Decorative Header */}
        <div className="calc-header">
          <span className="calc-logo">House of Mrida 🍃</span>
          <div className="calc-indicator">
            <span className="indicator-dot"></span>
            <span className={`indicator-dot ${heartActive ? 'active' : ''}`}></span>
          </div>
        </div>

        {/* Display Screen */}
        <div 
          className="screen-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          title="Swipe left/right to backspace"
        >
          <div className="history-view">
            {history}
          </div>
          <div 
            className={`display-view ${heartActive ? 'heart-active' : ''}`}
            style={{ fontSize: getFontSize(display) }}
          >
            {display}
          </div>
        </div>

        {/* Keypad Grid */}
        <div className="keyboard-grid">
          <button className="btn btn-util" onClick={clearScreen}>C</button>
          <button className="btn btn-util" onClick={() => appendValue('(')}>(</button>
          <button className="btn btn-util" onClick={() => appendValue(')')}>)</button>
          <button className="btn btn-op" onClick={() => appendValue('/')}>/</button>
          
          <button className="btn btn-num" onClick={() => appendValue('7')}>7</button>
          <button className="btn btn-num" onClick={() => appendValue('8')}>8</button>
          <button className="btn btn-num" onClick={() => appendValue('9')}>9</button>
          <button className="btn btn-op" onClick={() => appendValue('*')}>&times;</button>
          
          <button className="btn btn-num" onClick={() => appendValue('4')}>4</button>
          <button className="btn btn-num" onClick={() => appendValue('5')}>5</button>
          <button className="btn btn-num" onClick={() => appendValue('6')}>6</button>
          <button className="btn btn-op" onClick={() => appendValue('-')}>&minus;</button>
          
          <button className="btn btn-num" onClick={() => appendValue('1')}>1</button>
          <button className="btn btn-num" onClick={() => appendValue('2')}>2</button>
          <button className="btn btn-num" onClick={() => appendValue('3')}>3</button>
          <button className="btn btn-op" onClick={() => appendValue('+')}>+</button>
          
          <button className="btn btn-num" onClick={() => appendValue('0')}>0</button>
          <button className="btn btn-num" onClick={() => appendValue('.')}>.</button>
          <button className="btn btn-equals" onClick={calculate}>=</button>
        </div>
      </div>
    </>
  )
}

export default App
