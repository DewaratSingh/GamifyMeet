import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const createRoom = async () => {
    try {
      setError('')
      setCreating(true)
      const res = await fetch('http://localhost:3000/api/room')
      if (!res.ok) throw new Error('Failed to create room')
      const data = await res.json()
      const roomId = data?.roomId
      if (!roomId) throw new Error('Room id missing')
      navigate(`/main?room=${encodeURIComponent(roomId)}`)
    } catch (e) {
      setError(e?.message || 'Something went wrong')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', marginTop: 40 }}>
      <h2>GamifiMeet</h2>
      <button onClick={createRoom} disabled={creating} style={{ padding: '10px 16px', fontWeight: 600 }}>
        {creating ? 'Creating…' : 'Create Room'}
      </button>
      {error ? <div style={{ color: 'red' }}>{error}</div> : null}
      <div style={{ marginTop: 12, fontSize: 14, opacity: 0.8 }}>
        Share the URL after creation to let others join.
      </div>
    </div>
  )
}

export default Home
