import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import activityClock from "../assets/icons/activity-clock.svg";
import activityLock from "../assets/icons/activity-lock.svg";
import "./Activity.css";

function Activity() {
  return (
    <div className="activity-layout">
      {/* SIDEBAR */}
      <Sidebar />

      <div className="activity-main">
        {/* NAVBAR */}
        <Navbar />

        <main className="activity-content">
          {/* HEADER */}
          <section className="activity-header">
            <h1>Aktivitas</h1>
          </section>

          {/* ACTIVITY CARD */}
          <section className="activity-card">
            <div className="activity-timeline">
              {/* DATE */}
              <div className="activity-date">
                <div className="date-line"></div>
                <h2>07 Juli 2025</h2>
              </div>

              {/* LOGIN */}
              <div className="activity-item">
                <div className="activity-icon">
                  <img src={activityLock} alt="" />
                </div>

                <div className="activity-detail">
                  <div className="activity-top">
                    <span className="activity-time">5 Menit yang lalu</span>

                    <span className="activity-dot"></span>

                    <span className="activity-type">Login</span>
                  </div>

                  <p>
                    Login ke sistem dengan akun admindigi@gmail.com email dan IP
                    Address 115.10.46.195
                  </p>
                </div>
              </div>

              {/* POST */}
              <div className="activity-item">
                <div className="activity-icon">
                  <img src={activityClock} alt="" />
                </div>

                <div className="activity-detail">
                  <div className="activity-top">
                    <span className="activity-time">5 Menit yang lalu</span>

                    <span className="activity-dot"></span>

                    <span className="activity-type">Post</span>
                  </div>

                  <p>Post Blog ABC dengan akun admindigi@gmail.com</p>
                </div>
              </div>

              {/* DIVIDER */}
              <div className="activity-divider"></div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Activity;
