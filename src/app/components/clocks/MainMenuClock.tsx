'use client'

import { useEffect, useState } from 'react'

export default function MainMenuClock() {
    const [timeString, setTimeString] = useState('')

    useEffect(() => {
        const updateClock = () => {
            const now = new Date()
            const options: Intl.DateTimeFormatOptions = {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            }
            setTimeString(now.toLocaleString(undefined, options))
        }

        updateClock()
        const interval = setInterval(updateClock, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <p className="text-emerald-50 text-sm tracking-wide select-none"><a className="font-bold">Local time</a>: {timeString}</p>
    )
}
