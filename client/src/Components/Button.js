
const Button = (props) =>{
  return(
    <div> 
      <button onClick={props.onClick} href='#' className='btn btn-dark' style={{boxShadow: "2px 2px 4px 2px rgba(0,0,0,0.2)"}}>{props.name}</button>
    </div>
  )
}

export default Button;