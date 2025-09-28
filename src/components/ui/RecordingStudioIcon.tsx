import React from 'react'

interface RecordingStudioIconProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const RecordingStudioIcon: React.FC<RecordingStudioIconProps> = ({
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
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="45629"
    >
      <path 
        d="M512 640c115.2 0 208-92.8 208-208V272c0-115.2-92.8-208-208-208S304 156.8 304 272v160c0 115.2 92.8 208 208 208z m-144-368c0-80 64-144 144-144s144 64 144 144v160c0 80-64 144-144 144s-144-64-144-144V272z" 
        fill="#95BFE9" 
        p-id="45630"
      />
      <path 
        d="M844.8 480c0-17.6-14.4-32-32-32-16 0-30.4 12.8-32 28.8C758.4 606.4 646.4 704 512 704s-246.4-97.6-268.8-227.2c-1.6-16-16-28.8-32-28.8-17.6 0-32 14.4-32 32v4.8C204.8 635.2 328 752 480 766.4V928c0 17.6 14.4 32 32 32s32-14.4 32-32V766.4c152-14.4 275.2-131.2 299.2-280 0-1.6 1.6-4.8 1.6-6.4z" 
        fill="#6698F7" 
        p-id="45631"
      />
    </svg>
  )
}

export default RecordingStudioIcon
