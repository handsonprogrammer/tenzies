export default function Dice(props){
    return(
        <button className={props.isHold?"hold":null} onClick={()=>{props.holdDice(props.id)}}>
            {props.value}
        </button>
    )
}