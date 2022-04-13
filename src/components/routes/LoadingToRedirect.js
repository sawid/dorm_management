import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingToRedirect = () => {
  
  const [ count, setCount ] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {

        const interval = setInterval(() => {
                setCount((currentCount)=> --currentCount)
        }, 1)

        count === 0 && navigate('/login')
        return () => clearInterval(interval)

  }, [count])
  

  return (
    <div>
            No Authenticated, redirect in {count}
    </div>
  )
}

export default LoadingToRedirect