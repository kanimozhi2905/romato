import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../utils/api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --bg: #0a0a0a;
    --surface: #111111;
    --card: #161616;
    --border: #2a2a2a;
    --accent: #ff4d00;
    --accent2: #ffb347;
    --text: #f5f5f0;
    --muted: #666;
    --success: #22c55e;
  }

  .signup-root {
    min-height: 100vh;
    background: var(--bg);
    font-family: 'DM Sans', sans-serif;
    display: flex;
    overflow: hidden;
  }

  /* LEFT PANEL */
  .signup-left {
    width: 45%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    overflow: hidden;
  }
  .signup-left::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 30% 50%, rgba(255,77,0,0.25) 0%, transparent 70%),
                radial-gradient(ellipse at 80% 20%, rgba(255,179,71,0.12) 0%, transparent 60%);
  }
  .signup-left-bg {
    position: absolute;
    inset: 0;
    background: #0d0d0d;
    z-index: -1;
  }
  .food-blobs {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    animation: floatBlob 6s ease-in-out infinite;
  }
  .blob-1 { width: 300px; height: 300px; background: rgba(255,77,0,0.15); top: 10%; left: -80px; animation-delay: 0s; }
  .blob-2 { width: 200px; height: 200px; background: rgba(255,179,71,0.1); bottom: 20%; right: 20px; animation-delay: 2s; }
  .blob-3 { width: 150px; height: 150px; background: rgba(255,77,0,0.08); top: 50%; left: 40%; animation-delay: 4s; }

  @keyframes floatBlob {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-20px) scale(1.05); }
  }

  .brand-badge {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 48px;
  }
  .brand-icon {
    width: 42px; height: 42px;
    background: var(--accent);
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
  }
  .brand-name {
    font-family: 'Syne', sans-serif;
    font-size: 22px;
    font-weight: 800;
    color: var(--text);
    letter-spacing: -0.5px;
  }

  .left-headline {
    position: relative;
    z-index: 2;
  }
  .left-headline h1 {
    font-family: 'Syne', sans-serif;
    font-size: 52px;
    font-weight: 800;
    color: var(--text);
    line-height: 1.05;
    letter-spacing: -2px;
    margin-bottom: 20px;
  }
  .left-headline h1 span {
    color: var(--accent);
  }
  .left-headline p {
    color: var(--muted);
    font-size: 15px;
    line-height: 1.7;
    max-width: 320px;
  }

  .food-cards {
    position: relative;
    z-index: 2;
    margin-top: 48px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .food-card-chip {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: rgba(255,255,255,0.05);
    border: 1px solid var(--border);
    border-radius: 50px;
    padding: 10px 18px;
    width: fit-content;
    animation: slideIn 0.6s ease forwards;
    opacity: 0;
  }
  .food-card-chip:nth-child(1) { animation-delay: 0.1s; }
  .food-card-chip:nth-child(2) { animation-delay: 0.25s; }
  .food-card-chip:nth-child(3) { animation-delay: 0.4s; }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  .chip-icon { font-size: 18px; }
  .chip-text { color: var(--text); font-size: 13px; font-weight: 500; }
  .chip-badge {
    background: var(--accent);
    color: white;
    font-size: 10px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 20px;
    margin-left: 4px;
  }

  /* RIGHT PANEL */
  .signup-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    background: var(--bg);
  }

  .signup-form-card {
    width: 100%;
    max-width: 460px;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 44px;
    animation: fadeUp 0.5s ease;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .form-header {
    margin-bottom: 32px;
  }
  .form-header h2 {
    font-family: 'Syne', sans-serif;
    font-size: 28px;
    font-weight: 800;
    color: var(--text);
    letter-spacing: -1px;
    margin-bottom: 6px;
  }
  .form-header p {
    color: var(--muted);
    font-size: 14px;
  }
  .form-header p a {
    color: var(--accent);
    text-decoration: none;
    font-weight: 500;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .field-group {
    margin-bottom: 16px;
  }
  .field-group label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: #888;
    letter-spacing: 0.5px;
    text-transform: uppercase;
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
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 13px 14px 13px 40px;
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .input-wrap input::placeholder { color: #444; }
  .input-wrap input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(255,77,0,0.1);
  }
  .input-wrap input.valid { border-color: var(--success); }
  .input-wrap input.error { border-color: #ef4444; }

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
    padding: 0;
  }
  .field-error {
    color: #ef4444;
    font-size: 11px;
    margin-top: 5px;
  }

  .strength-bar {
    margin-top: 8px;
    display: flex;
    gap: 4px;
  }
  .strength-seg {
    height: 3px;
    flex: 1;
    border-radius: 2px;
    background: var(--border);
    transition: background 0.3s;
  }
  .strength-seg.active-weak { background: #ef4444; }
  .strength-seg.active-fair { background: #f59e0b; }
  .strength-seg.active-strong { background: var(--success); }
  .strength-label { font-size: 11px; color: var(--muted); margin-top: 4px; }

  .terms-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin: 18px 0;
  }
  .custom-check {
    width: 18px; height: 18px;
    border: 2px solid var(--border);
    border-radius: 5px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
    transition: all 0.2s;
  }
  .custom-check.checked {
    background: var(--accent);
    border-color: var(--accent);
  }
  .terms-text { font-size: 12px; color: var(--muted); line-height: 1.5; }
  .terms-text a { color: var(--accent); text-decoration: none; }
  .link-button {
    background: none;
    border: none;
    padding: 0;
    color: var(--accent);
    cursor: pointer;
    font: inherit;
    text-decoration: none;
  }
  .link-button:hover {
    text-decoration: underline;
  }

  .submit-btn {
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
    letter-spacing: 0.3px;
    transition: all 0.2s;
    position: relative;
    overflow: hidden;
  }
  .submit-btn:hover { background: #e04500; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(255,77,0,0.35); }
  .submit-btn:active { transform: translateY(0); }
  .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  .divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 20px 0;
    color: var(--muted);
    font-size: 12px;
  }
  .divider::before, .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  .social-btns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .social-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 11px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  .social-btn:hover { border-color: #444; background: #1a1a1a; }

  .success-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    animation: fadeIn 0.3s ease;
  }
  .success-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 48px;
    text-align: center;
    max-width: 360px;
  }
  .success-icon {
    font-size: 56px;
    margin-bottom: 16px;
    animation: bounceIn 0.5s ease;
  }
  @keyframes bounceIn {
    0% { transform: scale(0); }
    60% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
  .success-card h3 {
    font-family: 'Syne', sans-serif;
    font-size: 24px;
    color: var(--text);
    margin-bottom: 8px;
  }
  .success-card p { color: var(--muted); font-size: 14px; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  @media (max-width: 900px) {
    .signup-left { display: none; }
    .signup-right { padding: 20px; }
    .signup-form-card { padding: 28px; }
    .form-row { grid-template-columns: 1fr; }
  }
`;

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirmPassword: "", phone: ""
  });
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState({ password: false, confirm: false });
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const getPasswordStrength = (p) => {
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };

  const strength = getPasswordStrength(form.password);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthClass = strength <= 1 ? "active-weak" : strength <= 2 ? "active-fair" : "active-strong";

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (form.password.length < 8) e.password = "Min 8 characters";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords don't match";
    if (!/^\+?[\d\s-]{10,}$/.test(form.phone)) e.phone = "Valid phone required";
    if (!terms) e.terms = "Please accept terms";
    return e;
  };

  const handleChange = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    setErrors(er => ({ ...er, [field]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    
    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/api/auth/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          password_confirm: form.confirmPassword,
          phone: form.phone
        })
      });
      
      const data = await response.json();
      console.log('Registration response:', data);
      
      if (response.ok && data.success) {
        // Registration successful, but no token returned - user needs to login
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        const newErrors = {};
        if (data.errors) {
          Object.keys(data.errors).forEach(key => {
            newErrors[key] = Array.isArray(data.errors[key]) ? data.errors[key][0] : data.errors[key];
          });
        }
        setErrors(newErrors);
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    navigate("/");
  };

  const inputClass = (field) => {
    if (errors[field]) return "error";
    if (form[field] && !errors[field]) return "valid";
    return "";
  };

  return (
    <>
      <style>{styles}</style>
      <div className="signup-root">
        {/* LEFT */}
        <div className="signup-left">
          <div className="signup-left-bg" />
          <div className="food-blobs">
            <div className="blob blob-1" />
            <div className="blob blob-2" />
            <div className="blob blob-3" />
          </div>
          <div className="brand-badge">
            <div className="brand-icon">🍔</div>
            <span className="brand-name">FeastRush</span>
          </div>
          <div className="left-headline">
            <h1>Hungry?<br />We've got<br /><span>you covered.</span></h1>
            <p>Join thousands who get fresh, hot meals delivered to their door in under 30 minutes.</p>
          </div>
          <div className="food-cards">
            <div className="food-card-chip">
              <span className="chip-icon">⚡</span>
              <span className="chip-text">30-min delivery guarantee</span>
              <span className="chip-badge">FREE</span>
            </div>
            <div className="food-card-chip">
              <span className="chip-icon">🍕</span>
              <span className="chip-text">500+ restaurants nearby</span>
            </div>
            <div className="food-card-chip">
              <span className="chip-icon">🎁</span>
              <span className="chip-text">First order 20% off</span>
              <span className="chip-badge">NEW</span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="signup-right">
          <div className="signup-form-card">
            <div className="form-header">
              <h2>Create account</h2>
              <p>Already have one? <a href="/login">Sign in →</a></p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="field-group">
                  <label>Full Name</label>
                  <div className="input-wrap">
                    <span className="input-icon">👤</span>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange("name")}
                      className={inputClass("name")}
                    />
                  </div>
                  {errors.name && <div className="field-error">{errors.name}</div>}
                </div>
                <div className="field-group">
                  <label>Phone</label>
                  <div className="input-wrap">
                    <span className="input-icon">📱</span>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={handleChange("phone")}
                      className={inputClass("phone")}
                    />
                  </div>
                  {errors.phone && <div className="field-error">{errors.phone}</div>}
                </div>
              </div>

              <div className="field-group">
                <label>Email Address</label>
                <div className="input-wrap">
                  <span className="input-icon">✉️</span>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange("email")}
                    className={inputClass("email")}
                  />
                </div>
                {errors.email && <div className="field-error">{errors.email}</div>}
              </div>

              <div className="field-group">
                <label>Password</label>
                <div className="input-wrap">
                  <span className="input-icon">🔒</span>
                  <input
                    type={show.password ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    value={form.password}
                    onChange={handleChange("password")}
                    className={inputClass("password")}
                  />
                  <button type="button" className="eye-btn" onClick={() => setShow(s => ({ ...s, password: !s.password }))}>
                    {show.password ? "🙈" : "👁"}
                  </button>
                </div>
                {form.password && (
                  <>
                    <div className="strength-bar">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className={`strength-seg ${i <= strength ? strengthClass : ""}`} />
                      ))}
                    </div>
                    <div className="strength-label">{strengthLabel}</div>
                  </>
                )}
                {errors.password && <div className="field-error">{errors.password}</div>}
              </div>

              <div className="field-group">
                <label>Confirm Password</label>
                <div className="input-wrap">
                  <span className="input-icon">🔐</span>
                  <input
                    type={show.confirm ? "text" : "password"}
                    placeholder="Repeat password"
                    value={form.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                    className={inputClass("confirmPassword")}
                  />
                  <button type="button" className="eye-btn" onClick={() => setShow(s => ({ ...s, confirm: !s.confirm }))}>
                    {show.confirm ? "🙈" : "👁"}
                  </button>
                </div>
                {errors.confirmPassword && <div className="field-error">{errors.confirmPassword}</div>}
              </div>

              <div className="terms-row">
                <div className={`custom-check ${terms ? "checked" : ""}`} onClick={() => setTerms(t => !t)}>
                  {terms && <span style={{ color: "white", fontSize: 12 }}>✓</span>}
                </div>
                <div className="terms-text">
                  I agree to FeastRush's <button type="button" className="link-button" onClick={() => window.open('/terms')}>Terms of Service</button> and <button type="button" className="link-button" onClick={() => window.open('/privacy')}>Privacy Policy</button>
                  {errors.terms && <div className="field-error">{errors.terms}</div>}
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Creating account..." : "Create Account →"}
              </button>

              <div className="divider">or continue with</div>
              <div className="social-btns">
                <button type="button" className="social-btn">
                  <span>G</span> Google
                </button>
                <button type="button" className="social-btn">
                  <span>f</span> Facebook
                </button>
              </div>
            </form>
          </div>
        </div>

        {success && (
          <div className="success-overlay">
            <div className="success-card">
              <div className="success-icon">🎉</div>
              <h3>Welcome to FeastRush!</h3>
              <p>Your account has been created. Let's find you something delicious.</p>
              <button 
                onClick={handleContinue}
                style={{
                  marginTop: "24px",
                  padding: "14px 32px",
                  background: "#ff4d00",
                  border: "none",
                  borderRadius: "12px",
                  color: "white",
                  fontFamily: "Syne, sans-serif",
                  fontSize: "16px",
                  fontWeight: "700",
                  cursor: "pointer",
                  letterSpacing: "0.3px"
                }}
              >
                Continue to Home →
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
