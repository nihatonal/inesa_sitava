// components/Skeleton.js
import React from 'react'

const Skeleton = ({ height = 'h-6', width = 'w-full', className = '' }) => {
    return (
        <div className={`rounded-lg bg-gray-300 dark:bg-gray-700 animate-pulse ${height} ${width} ${className}`}></div>
    )
}

export default Skeleton
