import { useState,useEffect } from 'react';
import './App.css';

function App() {
  const [levelTitle, setLevelTitle] = useState("Press A Key to Start")
  const [level, setLevel] = useState(0);
  var start=false;
  const [userClickedPattern, setUserClickedPattern] = useState([]);
  const buttonColours = ["red", "blue", "green", "yellow"];
  const [gamePattern, setGamePattern] = useState([]);
  const [randomchoosenColor,setRandomchoosenColor]=useState();
 const [choosenColor,setChoosenColor]=useState();
 const [randomNumber, setRandomNumber] = useState(null);
const [previousNumber, setPreviousNumber] = useState(null);
  const [btnstyles, setBtnstyles] = useState({
    red: {
      backgroundColor: "red",
      margin: "25px",
      display: "inline-block",
      height: "200px",
      width: "200px",
      border: "10px solid black",
      borderRadius: "20%",
      cursor: "pointer",
    },

    blue: {
      backgroundColor: "blue",
      margin: "25px",
      display: "inline-block",
      height: "200px",
      width: "200px",
      border: "10px solid black",
      borderRadius: "20%",
      cursor: "pointer",
    },
    green: {
      backgroundColor: "green",
      margin: "25px",
      display: "inline-block",
      height: "200px",
      width: "200px",
      border: "10px solid black",
      borderRadius: "20%",
      cursor: "pointer",
    },
    yellow: {
      backgroundColor: "yellow",
      margin: "25px",
      display: "inline-block",
      height: "200px",
      width: "200px",
      border: "10px solid black",
      borderRadius: "20%",
      cursor: "pointer",
    }
  });

  useEffect(() => {
    document.addEventListener('keydown', handlekey);
    
  }, []);
  useEffect(() => {
    if(gamePattern!==null&&gamePattern!==undefined&&gamePattern.length>0){
      playsound(randomchoosenColor);
    }
     
  }, [gamePattern]);

  useEffect( () => {
    const dothis=async ()=>{
      if(userClickedPattern!==null&&userClickedPattern!==undefined&&userClickedPattern.length>0){
        console.log(choosenColor);
        await playsound(choosenColor);
        await animatePress(choosenColor);
        await checkAnswer();
      }
    }
    
     dothis();
  }, [userClickedPattern]);

  useEffect(()=>{
    
    if(choosenColor!==null&&choosenColor!==undefined){
      setUserClickedPattern((prevPattern) => [...prevPattern, choosenColor]);
    }
    
  },[choosenColor]);
  useEffect(()=>{
    if (randomchoosenColor !== null && randomchoosenColor !== undefined) {
      console.log(randomchoosenColor);
      setGamePattern((prevPattern) => [...prevPattern, randomchoosenColor]);
    }
    
  },[randomchoosenColor]);
  
  const handlekey =  async (event) => {
    if (start===false) {
      start=true;
      setLevelTitle(`Level: ${level}`);
      await nextfunction();
    }
    else{
      window.location.reload();
    }
  };
  const generateRandomNumber = () => {
    const newRandomNumber = Math.floor(Math.random() * 4);
    if (newRandomNumber !== previousNumber) {
      setRandomchoosenColor(buttonColours[newRandomNumber]);
      setPreviousNumber(newRandomNumber);
    } else {
      generateRandomNumber();
    }
  };
  const nextfunction = async () => {
    setLevel(level + 1);
    setLevelTitle(`Level: ${level}`);
    await generateRandomNumber();
    
  };
  const playsound = async (color) => {
   
    var audio = new Audio(`./sounds/${color}.mp3`);
    
    await audio.play();
    
  };
  const callThis =async (event) => {
    const getId = event.target.id;
    setChoosenColor("");
    setChoosenColor(getId);
  };
  const animatePress = async (currentColour) => {
    setBtnstyles((prevStyles) => {
      const updatedStyles = { ...prevStyles };
      updatedStyles[currentColour] = {
        ...prevStyles[currentColour],
        backgroundColor: "grey",
        boxShadow: "0 0 20px white",
      };
      return updatedStyles;
    });
  
    await setTimeout(() => {
      setBtnstyles((prevStyles) => {
        const updatedStyles = { ...prevStyles };
        updatedStyles[currentColour] = {
          ...prevStyles[currentColour],
          backgroundColor: `${currentColour}`,
          boxShadow: "none",
        };
        return updatedStyles;
      });
    }, 100);
  };
  const checkAnswer = () => {
    console.log(gamePattern,userClickedPattern);
    if (gamePattern[level-1] === userClickedPattern[level-1]) {
      
         nextfunction();
    }
    else {
       playsound("wrong");
      document.body.style.backgroundColor = "red";
      setLevelTitle("Game Over, Press Any Key to Restart");
      
    }
  };

  
  

  return (
    <div className="App">


      <h1 id="level-title">{levelTitle}</h1>
      <div className="container">
        <div className="row">

          <button style={btnstyles.green} id="green" onClick={callThis} className="btn green"></button>
          <button style={btnstyles.red} id="red" onClick={callThis} className="btn red"></button>
        </div>

        <div className="row">

          <button style={btnstyles.yellow} id="yellow" onClick={callThis} className="btn yellow"></button>
          <button style={btnstyles.blue} id="blue" onClick={callThis} className="btn blue"></button>

        </div>

      </div>

    </div>
  );
}

export default App;
