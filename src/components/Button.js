

function Button({buttonText, onClick}) {
  return <button className="bg-red-500 text-bold text-xl rounded-full py-2 px-10 text-white" onClick={onClick}>{buttonText}</button>;
}

export default Button;
