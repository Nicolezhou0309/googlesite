import React from 'react'

interface YogaRoomIconProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const YogaRoomIcon: React.FC<YogaRoomIconProps> = ({
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <svg
      className={`${sizeClasses[size]} ${className}`}
      viewBox="0 0 1273 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="42075"
    >
      <path 
        d="M761.616629 938.666667l-21.333333-426.666667-149.333333-42.666667H292.283296v-85.333333h256l298.666667-213.333333 55.466666 65.066666-177.066666 126.933334h121.6l332.8-192 51.2 59.733333-362.666667 281.6-21.333333 426.666667h-85.333334zM505.616629 341.333333q-35.2 0-60.266666-25.066666T420.283296 256q0-35.2 25.066667-60.266667T505.616629 170.666667q35.2 0 60.266667 25.066666T590.949963 256q0 35.2-25.066667 60.266667T505.616629 341.333333z" 
        p-id="42076" 
        fill="#6698F7"
      />
    </svg>
  )
}

export default YogaRoomIcon
