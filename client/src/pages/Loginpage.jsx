import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import API_URL from "../utils/api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --bg: #faf7f2;
    --card: #ffffff;
    --accent: #ff4d00;
    --accent2: #ffb347;
    --text: #1a1a1a;
    --muted: #888;
    --border: #e8e2d9;
    --surface: #f4f0ea;
  }

  .login-root {
    min-height: 100vh;
    background: var(--bg);
    font-family: 'DM Sans', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  /* BG PATTERN */
  .login-bg-pattern {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }
  .bg-circle {
    position: absolute;
    border-radius: 50%;
    animation: drift 8s ease-in-out infinite;
  }
  .bg-circle-1 {
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(255,77,0,0.08) 0%, transparent 70%);
    top: -150px; right: -150px;
    animation-delay: 0s;
  }
  .bg-circle-2 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(255,179,71,0.1) 0%, transparent 70%);
    bottom: -100px; left: -100px;
    animation-delay: 3s;
  }
  .bg-circle-3 {
    width: 200px; height: 200px;
    background: radial-gradient(circle, rgba(255,77,0,0.05) 0%, transparent 70%);
    top: 50%; left: 20%;
    animation-delay: 5s;
  }
  @keyframes drift {
    0%, 100% { transform: translate(0, 0); }
    33% { transform: translate(15px, -20px); }
    66% { transform: translate(-10px, 10px); }
  }

  /* FLOATING FOOD */
  .float-foods {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }
  .food-float {
    position: absolute;
    font-size: 28px;
    opacity: 0.18;
    animation: floatFood linear infinite;
  }
  @keyframes floatFood {
    0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
    10% { opacity: 0.18; }
    90% { opacity: 0.18; }
    100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
  }

  /* MAIN CARD */
  .login-card {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 440px;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 28px;
    padding: 48px;
    box-shadow: 0 24px 80px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04);
    animation: cardIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  @keyframes cardIn {
    from { opacity: 0; transform: translateY(30px) scale(0.96); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* LOGO */
  .login-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 36px;
  }
  .logo-mark {
    width: 44px; height: 44px;
    background: var(--accent);
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
    box-shadow: 0 4px 16px rgba(255,77,0,0.35);
  }
  .logo-text {
    font-family: 'Syne', sans-serif;
    font-size: 22px;
    font-weight: 800;
    color: var(--text);
    letter-spacing: -0.5px;
  }

  .login-headline h2 {
    font-family: 'Syne', sans-serif;
    font-size: 30px;
    font-weight: 800;
    color: var(--text);
    letter-spacing: -1px;
    margin-bottom: 6px;
  }
  .login-headline p {
    color: var(--muted);
    font-size: 14px;
    margin-bottom: 32px;
  }
  .login-headline p a {
    color: var(--accent);
    text-decoration: none;
    font-weight: 500;
  }

  .field-group {
    margin-bottom: 18px;
  }
  .field-group label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: #999;
    margin-bottom: 8px;
  }
  .input-wrap {
    position: relative;
  }
  .input-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    pointer-events: none;
  }
  .input-wrap input {
    width: 100%;
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: 12px;
    padding: 13px 14px 13px 42px;
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    outline: none;
    transition: all 0.2s;
  }
  .input-wrap input::placeholder { color: #bbb; }
  .input-wrap input:focus {
    border-color: var(--accent);
    background: white;
    box-shadow: 0 0 0 3px rgba(255,77,0,0.08);
  }
  .eye-btn {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: var(--muted);
    font-size: 16px;
  }

  .login-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }
  .remember-row {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }
  .custom-check {
    width: 18px; height: 18px;
    border: 2px solid var(--border);
    border-radius: 5px;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
    background: white;
  }
  .custom-check.checked { background: var(--accent); border-color: var(--accent); }
  .remember-label { font-size: 13px; color: var(--text); font-weight: 500; }
  .forgot-link { font-size: 13px; color: var(--accent); text-decoration: none; font-weight: 500; }

  .login-btn {
    width: 100%;
    padding: 15px;
    background: var(--accent);
    border: none;
    border-radius: 12px;
    color: white;
    font-family: 'Syne', sans-serif;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-shadow: 0 4px 20px rgba(255,77,0,0.3);
  }
  .login-btn:hover { background: #e04500; transform: translateY(-1px); box-shadow: 0 8px 28px rgba(255,77,0,0.4); }
  .login-btn:active { transform: translateY(0); }
  .login-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  .btn-arrow {
    transition: transform 0.2s;
  }
  .login-btn:hover .btn-arrow { transform: translateX(4px); }

  .divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 24px 0;
    color: #ccc;
    font-size: 12px;
    letter-spacing: 0.5px;
  }
  .divider::before, .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  .social-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .social-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px;
    background: white;
    border: 1.5px solid var(--border);
    border-radius: 10px;
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  .social-btn:hover { border-color: #ccc; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }

  /* ORDER REMINDER CHIP */
  .order-chip {
    position: absolute;
    top: -18px;
    right: 24px;
    background: white;
    border: 1.5px solid var(--border);
    border-radius: 50px;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
    animation: chipIn 0.5s 0.3s ease both;
  }
  @keyframes chipIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .chip-dot {
    width: 8px; height: 8px;
    background: var(--success, #22c55e);
    border-radius: 50%;
    animation: pulse 1.5s infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.2); }
  }
  .chip-txt { font-size: 12px; font-weight: 600; color: var(--text); }

  .error-toast {
    background: #fff5f5;
    border: 1px solid #fecaca;
    border-radius: 10px;
    padding: 12px 16px;
    color: #dc2626;
    font-size: 13px;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
    animation: toastIn 0.3s ease;
  }
  @keyframes toastIn {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 500px) {
    .login-card { padding: 28px; border-radius: 20px; margin: 16px; }
  }
`;

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { loadCartFromBackend } = useContext(CartContext);

  const floatingFoods = [
    { emoji: "🍕", left: "10%", duration: "12s", delay: "0s" },
    { emoji: "🍔", left: "25%", duration: "15s", delay: "3s" },
    { emoji: "🌮", left: "45%", duration: "10s", delay: "1s" },
    { emoji: "🍜", left: "65%", duration: "14s", delay: "5s" },
    { emoji: "🍣", left: "80%", duration: "11s", delay: "2s" },
    { emoji: "🥗", left: "90%", duration: "16s", delay: "4s" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) { 
      setError("Please fill in all fields."); 
      return; 
    }
    
    setLoading(true);
    
    try {
      console.log('Attempting login to /api/auth/login/');
      
      const response = await fetch(`${API_URL}/api/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Login response:', data);
      
      if (data.success) {
        // Store token and user from data.data
        localStorage.setItem('token', data.data.access);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        
        // Load cart from backend
        if (loadCartFromBackend) {
          await loadCartFromBackend();
        }
        
        // Navigate to home page
        navigate("/");
      } else {
        setError(data.error || data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Unable to connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="login-root">
        <div className="login-bg-pattern">
          <div className="bg-circle bg-circle-1" />
          <div className="bg-circle bg-circle-2" />
          <div className="bg-circle bg-circle-3" />
        </div>
        <div className="float-foods">
          {floatingFoods.map((f, i) => (
            <div
              key={i}
              className="food-float"
              style={{
                left: f.left,
                animationDuration: f.duration,
                animationDelay: f.delay,
              }}
            >
              {f.emoji}
            </div>
          ))}
        </div>

        <div className="login-card">
          <div className="order-chip">
            <div className="chip-dot" />
            <span className="chip-txt">🏍 Your last order is on the way!</span>
          </div>

          <div className="login-logo">
            <div className="logo-mark">🍔</div>
            <span className="logo-text">FeastRush</span>
          </div>

          <div className="login-headline">
            <h2>Welcome back 👋</h2>
            <p>New here? <a href="/signup">Create a free account →</a></p>
          </div>

          {error && (
            <div className="error-toast">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="field-group">
              <label>Email Address</label>
              <div className="input-wrap">
                <span className="input-icon">✉️</span>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="field-group">
              <label>Password</label>
              <div className="input-wrap">
                <span className="input-icon">🔒</span>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button type="button" className="eye-btn" onClick={() => setShowPass(s => !s)}>
                  {showPass ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            <div className="login-options">
              <div className="remember-row" onClick={() => setRemember(r => !r)}>
                <div className={`custom-check ${remember ? "checked" : ""}`}>
                  {remember && <span style={{ color: "white", fontSize: 11 }}>✓</span>}
                </div>
                <span className="remember-label">Remember me</span>
              </div>
              <a href="/forgot" className="forgot-link">Forgot password?</a>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Signing in..." : (
                <>Sign In <span className="btn-arrow">→</span></>
              )}
            </button>

            <div className="divider">OR</div>

            <div className="social-grid">
              <button type="button" className="social-btn">
                🌐 Google
              </button>
              <button type="button" className="social-btn">
                📘 Facebook
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
