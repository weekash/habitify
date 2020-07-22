import React from "react";
const Banner = () => {
  return (
    <>
      <div id="banner">
        <img src="./habit.svg" />
        <div id="banner-content">
          <h1>Start Building New Habits</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat
            eligendi inventore beatae nulla alias dolores ratione aperiam itaque
            quam ab placeat, earum dicta a cum unde, hic nihil totam nemo
            dignissimos deserunt reprehenderit possimus voluptate. Voluptatum
            blanditiis illum magni! Fuga quidem exercitationem eius facilis
            nostrum laudantium ipsum sunt nam ullam!
          </p>
          <a href="/login">
            <button className="btn banner-btn">Start Now</button>
          </a>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="wave"
      >
        <path
          fill="#6c63ff"
          fill-opacity="1"
          d="M0,288L40,245.3C80,203,160,117,240,106.7C320,96,400,160,480,197.3C560,235,640,245,720,213.3C800,181,880,107,960,85.3C1040,64,1120,96,1200,122.7C1280,149,1360,171,1400,181.3L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </svg>
      <div id="features">
        <h1>Habitify's awesome features</h1>
        <div>
          <div className="feature">
            <i className="fas fa-calendar-alt" />
            <div>
              <h1>Daily CheckIN's</h1>
              <p>
                You never going to miss a single day , without checking a habit
                you made. It records your progress everyday till the duration
                you have specified.
              </p>
            </div>
          </div>

          <div className="feature">
            <div>
              <h1>Amazing Rewards</h1>
              <p>
                Learning/Practising becomes more exciting when you get rewards.
                Yupp!!! we reward you everytime you successfully finish a task.
              </p>
            </div>
            <i className="fas fa-gifts" />
          </div>

          <div className="feature">
            <i className="fas fa-tasks" />
            <div>
              <h1>Share Progress</h1>
              <p>
                Share your progress with your friends and family . This feature
                get's automaticallly enabled when you have finished a task in
                given time.
              </p>
            </div>
          </div>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="wave"
      >
        <path
          fill="#0099ff"
          fill-opacity="1"
          d="M0,160L48,165.3C96,171,192,181,288,160C384,139,480,85,576,69.3C672,53,768,75,864,117.3C960,160,1056,224,1152,250.7C1248,277,1344,267,1392,261.3L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
      <div id="footer">
        <h1>
          Built with
          <i className="fab fa-react"></i>
        </h1>
        <a href="">
          <button className="btn">
            <i className="fab fa-github"></i>Source Code on Github
          </button>
        </a>
      </div>
    </>
  );
};

export default Banner;
