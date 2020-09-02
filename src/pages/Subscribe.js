import React from "react";
import recipe from "../images/subscribeimg.jpg";
const subscribe = (props) => {
  return (
    <div>
      <div class="w3-container w3-light-grey" style={{ padding: "128px 16px" }}>
        <div class="w3-row-padding">
          <div class="w3-col m6">
            <h3>Become part of Food2Fitness</h3>
            <p>
              Through this website, you can add your own recipes and workouts.
              Even you can see and try different cusines and workouts. Moreover,
              it has many other functionalities like Gym locator, BMI Calculator
              and many more.
            </p>
            <p>
              <a href="/registration" class="w3-button w3-black">
                <i class="fa fa-th">&nbsp;</i> Join Us
              </a>
            </p>
          </div>
          <div class="w3-col m6">
            <img
              class="w3-image w3-round-large"
              src={recipe}
              alt="recipe"
              width="700"
              height="394"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default subscribe;
