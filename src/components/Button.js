

function Button({buttonText, onClick, disabled=false}) {
  return <button disabled={disabled} className={`${disabled ? "bg-red-300 cursor-not-allowed" : "bg-red-500 cursor-pointer"} text-bold text-xl rounded-full py-2 px-10 text-white`} onClick={onClick}>{buttonText}</button>;
}

export default Button;
