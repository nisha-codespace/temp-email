import "./App.css";

function App(){
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
            <span>email@tempemail.com</span>
            <button>Copy</button>
          </div>

          <button className="generate-btn">
            Generate New Email
          </button>

          <p className="expiry">
            This email address will expire in 10 minutes. 
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