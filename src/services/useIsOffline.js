import React, { useEffect, useState } from 'react'

const useIsOffline = () => {
  const [isOffline, setIsOffline] = useState(false);
  
  useEffect(() => {
    window.addEventListener('offline',() => {
        setIsOffline(true);

    window.addEventListener('online',() => {
        setIsOffline(false)
    })
    })
  },[])

  return isOffline;
}

export default useIsOffline