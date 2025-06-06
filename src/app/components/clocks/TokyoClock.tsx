import { useEffect, useState } from 'react'

export default function Clock() {
    const [tokyoDateTime, setTokyoDateTime] = useState<string>('')

    const JAPANESE_MONTHS = [
        '', '一月', '二月', '三月', '四月', '五月', '六月',
        '七月', '八月', '九月', '十月', '十一月', '十二月'
    ]

    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            const options: Intl.DateTimeFormatOptions = {
                timeZone: 'Asia/Tokyo',
                weekday: 'short',
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            }

            const formatter = new Intl.DateTimeFormat('ja-JP', options)
            const parts = formatter.formatToParts(now)

            const weekday = parts.find(p => p.type === 'weekday')?.value ?? ''
            const year = parts.find(p => p.type === 'year')?.value ?? ''
            const monthNum = parseInt(parts.find(p => p.type === 'month')?.value ?? '1', 10)
            const monthName = JAPANESE_MONTHS[monthNum]
            const day = parts.find(p => p.type === 'day')?.value ?? ''
            const hour = parts.find(p => p.type === 'hour')?.value ?? ''
            const minute = parts.find(p => p.type === 'minute')?.value ?? ''
            const second = parts.find(p => p.type === 'second')?.value ?? ''

            setTokyoDateTime(`${year}年 ${monthNum}${monthName} ${day}日 (${weekday}) ${hour}:${minute}:${second}`)
        }

        updateTime()
        const interval = setInterval(updateTime, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="text-emerald-200 bg-black/90 font-mono px-3 py-2 rounded shadow-md select-none">
            東京: {tokyoDateTime}
        </div>
    )
}
