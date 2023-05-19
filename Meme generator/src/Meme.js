import React from "react";
import memesdata from "./memesdata";


export default function Meme(){


    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
       
    }, [])


    function getMemeImage(){
        const memesArray=memesdata.data.memes
        const randomNumber= Math.floor(Math.random()*memesArray.length)
        const url=memesArray[randomNumber].url 
        setMeme(prevMeme=>({
            ...prevMeme,
            randomImage:url
        }))
    }


    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    const [meme,setMeme]=React.useState({
        topText:"",
        bottomText:"",
        randomImage:"https://i.imgflip.com/1ur9b0.jpg"

        }
    )
    const [allMemes, setAllMemes] = React.useState([])
    
    const [allMemeImges, setAllMemeImages]=React.useState(memesdata)

    return(
        <main>
            <div className="form">
                
                <input className="input" type="text" placeholder="top-text" name="topText"
                    value={meme.topText}
                    onChange={handleChange}/>

                <input className="input" type="text" placeholder="bottom-text" name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}/>
        
                <button className="button" onClick={getMemeImage}>
                    Get a new meme image
                </button>
            </div>
            <div className="meme">

                <img src={meme.randomImage} className="memeImage"/>
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>

            </div>   
        </main>




    )


}