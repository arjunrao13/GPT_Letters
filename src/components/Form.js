import Button from './Button'






const Form = (props) => {
  return (
    <div>
        <form onSubmit= {props.handleSubmit} >
            <textarea 
            rows = "6"
            value = {props.value}
            onChange = {props.onChange}
            />
           <button type="submit">Send</button>
        </form>
    </div>
  )
}



export default Form