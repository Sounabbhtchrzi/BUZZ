// import React from 'react';
import FeedbackForm from "./FeedbackForm";
// import { useState,useEffect } from "react";
import { MessageCircle} from "lucide-react";

const Feedbackbutton = () => {
    // const [isVisible, setIsVisible] = useState(true)

    // Show button when page is scrolled down 300px
    // const toggleVisibility = () => {
    //   if (window.scrollY > 0) {
    //     setIsVisible(true)
    //   } else {
    //     setIsVisible(false)
    //   }
    // }
    // useEffect(() => {
    //     window.addEventListener('scroll', toggleVisibility)
    
    //     return () => {
    //       window.removeEventListener('scroll', toggleVisibility)
    //     }
    //   }, [])

    return (
        <div className="fixed bottom-24 right-4 md:right-8">
              
            <button
                className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110"
                onClick={() => (document.getElementById("my_modal_2") as HTMLDialogElement).showModal()}
            >
                    <MessageCircle className=" w-6 h-6" />
            </button>
              
            <dialog id="my_modal_2" className="modal rounded-lg border-4 border-orange-400">
                <div className="modal-box rounded-lg">
                    <form method="dialog" className="">
                        <button className="btn btn-sm bg-orange-400 w-8 h-8 flex justify-center items-center text-white font-bold rounded-full  bg-btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    {/* <h3 className="font-bold text-lg">➦</h3> */}
                    {/* Use the ShareButton component and pass the post ID */}
                    <FeedbackForm/>
                </div>
            </dialog>
        </div>
    );
}

export default Feedbackbutton;
