import React from 'react'

interface CheckIconProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const CheckIcon: React.FC<CheckIconProps> = ({ 
  className = '', 
  size = 'sm' 
}) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4', 
    lg: 'w-5 h-5'
  }

  return (
    <svg 
      className={`${sizeClasses[size]} ${className}`}
      viewBox="0 0 1024 1024" 
      version="1.1" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M5.12 564.906667C0 559.786667 0 551.253333 3.413333 546.133333l34.133334-40.96c5.12-5.12 13.653333-6.826667 18.773333-3.413333l247.466667 162.133333c11.946667 8.533333 30.72 6.826667 42.666666-1.706666l631.466667-501.76c6.826667-5.12 13.653333-3.413333 20.48 1.706666l22.186667 22.186667c5.12 5.12 5.12 13.653333 0 18.773333L344.746667 860.16c-10.24 10.24-27.306667 10.24-37.546667 0L5.12 564.906667z" 
        fill="currentColor"
      />
    </svg>
  )
}

export default CheckIcon
