import { SignUp } from '@clerk/nextjs';

export default function Signup() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

        .auth-root {
          min-height: 100vh;
          background: #fffbf5;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        .a-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.5;
          pointer-events: none;
          animation: blobFloat 8s ease-in-out infinite;
        }
        .a-blob-1 { width: 450px; height: 450px; background: #06d6a0; top: -150px; right: -100px; animation-duration: 9s; }
        .a-blob-2 { width: 350px; height: 350px; background: #ffd166; bottom: -100px; left: -80px; animation-duration: 11s; animation-direction: reverse; }
        .a-blob-3 { width: 280px; height: 280px; background: #118ab2; top: 40%; left: 5%; animation-duration: 13s; animation-delay: 1s; }
        .a-blob-4 { width: 200px; height: 200px; background: #ef476f; bottom: 25%; right: 8%; animation-duration: 10s; animation-delay: 3s; }

        @keyframes blobFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-25px) scale(1.04); }
        }

        .a-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, #00000012 1.5px, transparent 1.5px);
          background-size: 28px 28px;
        }

        .auth-card-wrap {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
          animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) both;
        }

        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(40px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .auth-brand {
          font-family: 'Syne', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: #1a1a2e;
          letter-spacing: -1px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .auth-brand-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: #06d6a0;
          display: inline-block;
          animation: dotBounce 1.4s ease infinite;
        }
        @keyframes dotBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        .auth-tagline {
          font-size: 13px;
          color: #888;
          text-align: center;
          margin-top: -20px;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        .auth-chip {
          position: absolute;
          background: white;
          border-radius: 100px;
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 600;
          color: #1a1a2e;
          box-shadow: 0 8px 28px rgba(0,0,0,0.12);
          display: flex;
          align-items: center;
          gap: 7px;
          white-space: nowrap;
          animation: chipFloat 6s ease-in-out infinite;
          z-index: 5;
        }
        .auth-chip-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .auth-chip-1 { top: 12%; left: 5%; animation-delay: 0s; }
        .auth-chip-2 { top: 20%; right: 5%; animation-delay: 2s; }
        .auth-chip-3 { bottom: 18%; left: 6%; animation-delay: 4s; }
        .auth-chip-4 { bottom: 12%; right: 5%; animation-delay: 1.5s; }

        @keyframes chipFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @media (max-width: 600px) {
          .auth-chip { display: none; }
        }
      `}</style>

      <div className="auth-root">
        <div className="a-blob a-blob-1" />
        <div className="a-blob a-blob-2" />
        <div className="a-blob a-blob-3" />
        <div className="a-blob a-blob-4" />
        <div className="a-dots" />

     
        <div className="auth-chip auth-chip-1">
          <span className="auth-chip-dot" style={{background:'#ffd166'}} />
          3.4k+ Companies
        </div>
        <div className="auth-chip auth-chip-2">
          <span className="auth-chip-dot" style={{background:'#06d6a0'}} />
          Join for Free
        </div>
        <div className="auth-chip auth-chip-3">
          <span className="auth-chip-dot" style={{background:'#118ab2'}} />
          Build Your Career
        </div>
        <div className="auth-chip auth-chip-4">
          <span className="auth-chip-dot" style={{background:'#ef476f'}} />
          98% Success Rate
        </div>

        <div className="auth-card-wrap">
          <div className="auth-brand">
            JOBSCO <span className="auth-brand-dot" />
          </div>
          <p className="auth-tagline">Join thousands building their dream career 🚀</p>
          <SignUp />
        </div>
      </div>
    </>
  );
}