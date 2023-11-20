"use client"

import React, { useEffect } from 'react'
import './style.css'

export default function Home() {
  const [second, setSecond] = React.useState(0)
  const [minute, setMinute] = React.useState(0)
  const [hour, setHour] = React.useState(0)
  const [start, setStart] = React.useState(false)
  const [pSecond, setpSecond] = React.useState("00")
  const [pMinute, setpMinute] = React.useState("00")
  const [pHour, setpHour] = React.useState("00")
  const [times, setTimes] = React.useState([])

  useEffect(() => {
    let interval;
  
    if (start) {
      interval = setInterval(() => {
        setSecond((prevSecond) => {
          if (prevSecond >= 59) {
            setMinute((prevMinute) => {
              if (prevMinute >= 59) {
                setHour((prevHour) => {
                  return prevHour+1;
                })
                return 0;
              } else {
                return prevMinute+1;
              }
            })
            return 0;
          } else {
            return prevSecond+1;
          }
        })
      }, 1000);
    }
  
    return () => {
      clearInterval(interval);
    };
  }, [start]);

  useEffect(() => {
    setpHour(hour > 9 ? String(hour) : `0${hour}`);
    setpMinute(minute > 9 ? String(minute) : `0${minute}`);
    setpSecond(second > 9 ? String(second) : `0${second}`);
  }, [second]);

  return (
    <main>
      <h1 className='text-center m-2 title'>Kronometre</h1>
      <div className='flex'>
        <div className='grow'></div>
        <div className='flex grow-0 m-2 justify-center outline-dashed timer-container'>
          <h2 className='p-2'>{pHour}:{pMinute}:{pSecond}</h2>
        </div>
        <div className='grow'></div>
      </div>
      <div className='flex gap-4 m-4 justify-center'>
        <button className="button-18" onClick={() => {setStart(true)}}>Başlat</button>
        <button className="button-18" onClick={() => {setStart(false)}}>Durdur</button>
        <button className="button-18" onClick={() => {
          const currentTime = `${hour}:${minute}:${second}`
          setTimes([...times, currentTime])
        }}>Zamanı Kaydet</button>
        <button className="button-18" onClick={() => {
          setSecond(0)
          setMinute(0)
          setHour(0)
          setTimes([])
          setStart(false)
        }}>Sıfırla</button>
      </div>
      <div className='custom-width gap-1 m-2'>
        {times.map((x, index) => (
          <div key={index} className="time-record">
            <span className="index">{index + 1})</span>
            <span className="time">{x}</span>
          </div>
        ))}
      </div>
    </main>
  )
}