'use client'
export default function Error({ error, reset }: { error: Error, reset: () => void }) {
    return (
        <div className="error">
            <p>{error.message}</p>
            <button onClick={reset}>Reset</button>
        </div>
    )
}
