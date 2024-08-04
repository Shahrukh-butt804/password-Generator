import { useEffect, useState, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


function Passgen() {

    const [length, setLength] = useState(8);
    const [isNum, setNum] = useState(false);
    const [isChar, setChar] = useState(false);
    const [readyPass, setReadyPass] = useState("")
    let passref = useRef(null)


    let passwordGenerator = () => {
        let generatedPass = "";
        let randomNum;
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        if (isNum) str += "01234565789"
        if (isChar) str += "!@#$%^&*()_<>{}[]';:,."

        for (let i = 1; i <= length; i++) {
            randomNum = Math.floor(Math.random() * str.length + 1)
            generatedPass += str.charAt(randomNum);
        }
        setReadyPass(generatedPass);
    }


    useEffect(() => {
        passwordGenerator();
    }, [length, isNum, isChar])




    let copy = () => {

        // useRef is use show some effect to user and also to control the range or something
        passref.current?.select();
        passref.current?.setSelectionRange(0, length); //=> ths how we can define a range to copy the number of character


        // Thats how wo copy the password to clip board  
        window.navigator.clipboard.writeText(readyPass);

    }







    return (
        <>
            <div className="text-center mt-5">

                <div><h1 style={{fontWeight:700}} className="text-white mt-5">The Password Generator</h1></div>



                <div className="p-4 mt-3 ">
                    <div className="">
                        <input
                        style={{fontSize:"24px",fontWeight:700}}
                            className="p-2 w-50 me-3 rounded text-white mb-3"
                            type="text"
                            value={readyPass}
                            placeholder="Password"
                            readOnly
                            ref={passref}
                        />
                        <button className="btn btn-primary outline p-2 rounded mb-1 p-2 pe-3 ps-3" onClick={copy}>Copy</button>
                    </div>

                    <div className=" text-white mt-4 d-flex flex-wrap align-item-center justify-content-evenly  ">


                        <div className=" d-flex">
                            <input type="range"
                                value={length}
                                min={2}
                                max={30}
                                onChange={(e) => setLength(e.target.value)}
                                className="p-1 me-2"
                            />
                            <label htmlFor="pass">length : {length}</label>
                        </div>

                        <div className="div">
                            <input type="checkbox"
                                defaultChecked={isNum}
                                onChange={() => setNum(!isNum)}
                                className="p-1 me-2"
                            />
                            <label htmlFor="number">Number</label>
                        </div>


                        <div className="div">
                            <input type="checkbox"
                                defaultChecked={isChar}
                                onChange={() => setChar(!isChar)}
                                className="p-1 me-2"
                            />
                            <label htmlFor="Char">Character</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Passgen;