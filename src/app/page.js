import { fetchProfileAction } from "@/actions";
import HomePageButtonControl from "@/components/homepage-button-control";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Fragment } from "react";

async function Home() {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);
  if (user && !profileInfo?._id) redirect("/onboard");

  return (
    <Fragment>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .home-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #fffbf5;
          overflow: hidden;
          position: relative;
        }

        /* Blob background shapes */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.55;
          pointer-events: none;
          z-index: 0;
        }
        .blob-1 {
          width: 520px; height: 520px;
          background: #ffd166;
          top: -120px; left: -100px;
          animation: blobFloat 8s ease-in-out infinite;
        }
        .blob-2 {
          width: 420px; height: 420px;
          background: #06d6a0;
          top: 80px; right: -80px;
          animation: blobFloat 10s ease-in-out infinite reverse;
        }
        .blob-3 {
          width: 340px; height: 340px;
          background: #ef476f;
          bottom: 40px; left: 30%;
          animation: blobFloat 12s ease-in-out infinite 2s;
        }
        .blob-4 {
          width: 260px; height: 260px;
          background: #118ab2;
          bottom: -60px; right: 20%;
          animation: blobFloat 9s ease-in-out infinite 1s;
        }

        @keyframes blobFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }

        /* Dot grid pattern */
        .dot-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, #00000015 1.5px, transparent 1.5px);
          background-size: 28px 28px;
          z-index: 0;
        }

        .content-wrap {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        .container-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 32px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        @media (max-width: 768px) {
          .container-inner {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .img-side { display: none; }
          .badge-row { justify-content: center; }
        }

        /* Badge */
        .badge-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .badge {
          background: #ef476f;
          color: white;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 100px;
        }
        .badge-line {
          height: 2px;
          width: 40px;
          background: #ef476f;
          border-radius: 2px;
        }
        .badge-sub {
          font-size: 13px;
          color: #555;
          font-weight: 500;
        }

        /* Heading */
        .hero-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(42px, 6vw, 80px);
          font-weight: 800;
          line-height: 1.05;
          color: #1a1a2e;
          margin-bottom: 24px;
          letter-spacing: -2px;
        }
        .highlight-yellow {
          position: relative;
          display: inline-block;
          color: #1a1a2e;
        }
        .highlight-yellow::after {
          content: '';
          position: absolute;
          left: 0; bottom: 4px;
          width: 100%; height: 14px;
          background: #ffd166;
          z-index: -1;
          border-radius: 4px;
          transform: rotate(-1deg);
        }
        .highlight-green {
          color: #06d6a0;
        }

        /* Subtext */
        .hero-sub {
          font-size: 18px;
          color: #555;
          line-height: 1.7;
          margin-bottom: 36px;
          max-width: 460px;
          font-weight: 400;
        }

        /* Stats row */
        .stats-row {
          display: flex;
          gap: 28px;
          margin-top: 36px;
          flex-wrap: wrap;
        }
        .stat-item {
          display: flex;
          flex-direction: column;
        }
        .stat-num {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: #1a1a2e;
        }
        .stat-label {
          font-size: 12px;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 500;
        }
        .stat-divider {
          width: 1px;
          background: #e0e0e0;
          align-self: stretch;
        }

        /* Image side */
        .img-side {
          position: relative;
        }
        .img-card {
          border-radius: 32px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0,0,0,0.18);
          transform: rotate(2deg);
          transition: transform 0.4s ease;
          border: 4px solid white;
        }
        .img-card:hover {
          transform: rotate(0deg) scale(1.02);
        }
        .img-card img {
          width: 100%;
          height: 420px;
          object-fit: cover;
          display: block;
        }

        /* Floating tag chips */
        .chip {
          position: absolute;
          background: white;
          border-radius: 100px;
          padding: 10px 18px;
          font-size: 13px;
          font-weight: 600;
          color: #1a1a2e;
          box-shadow: 0 8px 32px rgba(0,0,0,0.14);
          display: flex;
          align-items: center;
          gap: 8px;
          animation: chipFloat 6s ease-in-out infinite;
          border: 2px solid white;
        }
        .chip-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .chip-1 { top: -20px; left: -30px; animation-delay: 0s; }
        .chip-2 { bottom: 40px; left: -40px; animation-delay: 2s; }
        .chip-3 { top: 30px; right: -30px; animation-delay: 4s; }

        @keyframes chipFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        /* Scroll indicator */
        .scroll-hint {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          z-index: 10;
          animation: fadeInUp 1s ease 1s both;
        }
        .scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, transparent, #aaa);
          animation: scrollPulse 2s ease infinite;
        }
        .scroll-text {
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #aaa;
          font-weight: 600;
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        /* Entry animations */
        .fade-up {
          animation: fadeInUp2 0.8s ease both;
        }
        .fade-up-1 { animation-delay: 0.1s; }
        .fade-up-2 { animation-delay: 0.25s; }
        .fade-up-3 { animation-delay: 0.4s; }
        .fade-up-4 { animation-delay: 0.55s; }
        .fade-up-5 { animation-delay: 0.7s; }

        @keyframes fadeInUp2 {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .img-fade {
          animation: imgReveal 0.9s ease 0.3s both;
        }
        @keyframes imgReveal {
          from { opacity: 0; transform: rotate(2deg) scale(0.95); }
          to { opacity: 1; transform: rotate(2deg) scale(1); }
        }
      `}</style>

      <div className="home-root">
      
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-4" />
        <div className="dot-grid" />

        <div className="content-wrap">
          <div className="container-inner">

        
            <div>
              <div className="badge-row fade-up fade-up-1">
                <span className="badge">✦ New</span>
                <span className="badge-line" />
                <span className="badge-sub">one stop solution to find jobs</span>
              </div>

              <h1 className="hero-heading fade-up fade-up-2">
                The <span className="highlight-yellow">Best</span> <br />
                Job <span className="highlight-green">Portal</span> <br />
                App
              </h1>

              <p className="hero-sub fade-up fade-up-3">
                Find top roles at product-based companies. Build your career
                with opportunities that actually excite you. 🚀
              </p>

              <div className="fade-up fade-up-4">
                <HomePageButtonControl
                  user={JSON.parse(JSON.stringify(user))}
                  profileInfo={profileInfo}
                />
              </div>

              <div className="stats-row fade-up fade-up-5">
                <div className="stat-item">
                  <span className="stat-num">12k+</span>
                  <span className="stat-label">Jobs Listed</span>
                </div>
                <div className="stat-divider" />
                <div className="stat-item">
                  <span className="stat-num">3.4k</span>
                  <span className="stat-label">Companies</span>
                </div>
                <div className="stat-divider" />
                <div className="stat-item">
                  <span className="stat-num">98%</span>
                  <span className="stat-label">Success Rate</span>
                </div>
              </div>
            </div>

       
            <div className="img-side">
              <div className="img-card img-fade">
                <img
                  src="https://cdn.pixabay.com/photo/2017/10/31/09/55/dream-job-2904780_640.jpg"
                  alt="Dream Job"
                />
              </div>

          
              <div className="chip chip-1">
                <span className="chip-dot" style={{background:'#06d6a0'}} />
                Remote Friendly
              </div>
              <div className="chip chip-2">
                <span className="chip-dot" style={{background:'#ef476f'}} />
                1200+ New Today
              </div>
              <div className="chip chip-3">
                <span className="chip-dot" style={{background:'#ffd166'}} />
                Top Companies
              </div>
            </div>

          </div>
        </div>

        <div className="scroll-hint">
          <span className="scroll-text">scroll</span>
          <div className="scroll-line" />
        </div>
      </div>
    </Fragment>
  );
}

export default Home;