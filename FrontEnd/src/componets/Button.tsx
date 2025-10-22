import React from 'react'

interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

function Button({ onClick, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold text-xl rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
    >
      {children || "New Game"}
    </button>
  )
}

export default Button