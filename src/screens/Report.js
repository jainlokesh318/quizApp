import React from 'react';
import confetti from "../images/confetti.svg"

export default function Report() {
    return <div className='bg-violet-400 h-full flex flex-col justify-between'>
        <img src={confetti} />
        <div className='h-4/5 w-full bg-white flex flex-col justify-end rounded-t-2xl p-5 gap-5'>
        </div>
    </div>
}