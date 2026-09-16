import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [inbox, setInbox] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!isRunning) return undefined;

    const timer = setInterval(() => {
      setTimeLeft((previousTime) => {
        if (previousTime <= 1) {
          setIsRunning(false);
          setIsExpired(true);
          setEmail("");
          setInbox([]);
          return 0;
        }
        return previousTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  const generateEmail = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/mailboxes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to generate email");

      const data = await response.json();
      setEmail(data.email);
      setCopied(false);
      setInbox([]);
      setIsExpired(false);
      setTimeLeft(600);
      setIsRunning(true);
    } catch (error) {
      console.error("Error generating email:", error);
      alert("Could not generate email. Make sure the backend is running.");
    }
  };

  const copyEmail = async () => {
    if (!email || isExpired) return;
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <span>{isExpired ? "This email has expired" : email || "Click generate new email"}</span>
            <button onClick={copyEmail} disabled={!email || isExpired}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <button className="generate-btn" onClick={generateEmail}>
            Generate New Email
          </button>
          <p className="expiry">
            {isExpired ? "Email expired" : "This email address will expire in "}
            {!isExpired && <>{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}</>}
          </p>
        </section>

        <section className="inbox">
          <h2>Inbox</h2>
          <div className="empty-inbox">
            {inbox.length === 0 ? (
              <p>No emails yet.</p>
            ) : (
              inbox.map((mail, index) => (
                <div className="email-item" key={index}>
                  <h3>{mail.subject}</h3>
                  <p>From: {mail.from}</p>
                  <p>{mail.message}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
