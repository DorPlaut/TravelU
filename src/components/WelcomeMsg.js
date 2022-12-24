import React from 'react';
// redux
import { useSelector } from 'react-redux';
// Components
import Login from './user-system/Login';

function WelcomeMsg() {
  // redux
  const isDarkMode = useSelector((state) => state.isDarkMode.value);

  return (
    <article className="welcome-article">
      <h1>Welcome to TravelU</h1>
      <h2>a Social network based on shareing travel locations</h2>
      <div className="welcome-img-container">
        <img
          src="https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <img
          src="https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <img
          src="https://images.pexels.com/photos/4356144/pexels-photo-4356144.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <img
          src="https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
      </div>
      <h3>Share your advantures and discover new travel locations</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores saepe
        iusto expedita amet beatae tempore magnam repellat eveniet,
        necessitatibus, in dolore culpa repellendus, sapiente mollitia nemo unde
        eos vero! Provident, totam assumenda! Similique repudiandae optio
        assumenda quos voluptas delectus sit, iste ipsa possimus esse obcaecati,
        quis, ipsam dolorem. Cumque est rem consectetur labore nemo quos
        eligendi neque ipsum eaque necessitatibus omnis laborum possimus,
        accusamus incidunt, impedit id voluptates vel voluptatibus sit voluptas,
        veritatis culpa aut dicta earum? Alias laborum quidem impedit sed
        repellat ipsa corrupti quaerat facere optio? Voluptate velit delectus
        voluptas quis culpa. Quaerat nostrum officia aut illo necessitatibus?
      </p>
      <h2>
        <Login /> to Start sharing your advantures and discover your next travel
        location
      </h2>
      <br />
      <div>
        <button className="btn">
          <Login />
        </button>
      </div>
      <div
        className={
          isDarkMode ? 'container-underline-dark' : 'container-underline-light'
        }
      ></div>
    </article>
  );
}

export default WelcomeMsg;
