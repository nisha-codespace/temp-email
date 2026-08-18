import { useState, useEffect } from "react";
import "./App.css";

function App(){

  const [email, setEmail] = useState("");
  const [Copied, setCopied] = useState(false);
  const [inbox, setInbox] = useState([]);
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((previousTIme) => {
        
        if(previousTime <= 1){
          clearInterval(timer);
          return 0;
        }

        return previousTime - 1;
      });
    },1000);

    return () => clearInterval(timer);

  },[]);

  // generate Random EMail
  const generateEmail = () => {
    const randomNumber = Math.floor(Math.random()*100000);
    const newEmail =`user${randomNumber}@tempemail.com`;
    setEmail(newEmail);
    setCopied(false);
  };

  //Copy email
  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);

    setTimeout(() =>{
      setCopied(false);
    },2000);
  };
   
  const minutes = Math.floor(timeLeft / 60);

  const seconds = timeLeft % 60;
  return (
    <div className="app">

      <header className="navbar">
        <h2>TempMail</h2>
        <nav>
          <a href="#">Home</a>
          <a href="#">About</a>
        </nav>
      </header>

      <main>

        <section className="hero">

          <h1>Your Temporary Email Address</h1>
          <p>Get a temporary email address to protect your privacy and avoid spam.</p>

          <div className="email-box">
            <span>{email || "click generate new email"}</span>
            <button 
              onClick={copyEmail}
              disabled = {!email}>
              {Copied ? "Copied!" : "Copy"}
            </button>
          </div>

          <button className="generate-btn" onClick={generateEmail}>
            Generate New Email
          </button>

          <p className="expiry">
            This email address will expire in{" "}
            {String(minutes).padStart(2,"0")}:
            {String(seconds).padStart(2,"0")}
          </p>
        </section>

        <section className="inbox">
          <h2>Inbox</h2>

          <div className="empty-inbox">
            <p>No emails yet.</p>
          </div>

        </section>

      </main>

    </div>
  );
}

export default App;