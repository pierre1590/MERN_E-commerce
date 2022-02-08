import Icon from '../assets/sad-icon.jpg';

export default function NotFound () {
  return (
    <> 
      <img src={Icon} alt="Not Found" style={{margin:'0 40%',width:'15%', height:'15%'}}/>
      <h1 className="error" style={{margin:'0 35%',color:'#f1a'}}>Ops, error 404 <br/>Page not found</h1>
    </>
  )
}