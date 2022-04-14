import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingToRedirect = () => {
  
  const [ count, setCount ] = useState(2);
  const navigate = useNavigate();

  useEffect(() => {

        const interval = setInterval(() => {
                setCount((currentCount)=> --currentCount)
        }, 50)

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