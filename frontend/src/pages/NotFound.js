import Icon from '../assets/sad-icon.jpg';
import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom'

export default function NotFound () {
const navigate = useNavigate();

    // if page 404 redirect to home pages after 10 seconds
    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 10000)
    }, [navigate])

  return (
    <> 
      <img src={Icon} alt="Not Found" style={{margin:'0 40%',width:'15%', height:'15%'}}/>
      <h1 className="error" style={{margin:'0 35%',color:'#f01'}}>Ops, error 404 <br/>Page not found</h1>
    </>
  )
}