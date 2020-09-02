/**
 * @author Sai Pavan Akuralapu <sp536952@dal.ca>
 */

import React from "react";

const aboutF2F = (props) => {
  return (
    <div class="w3-container" style={{ padding: "128px 16px" }} id="about">
      <h3 class="w3-center">About Food2Fitness</h3>
      <p class="w3-center w3-large">Key features</p>
      <div class="w3-row-padding w3-center" style={{ "margin-top": "64px" }}>
        <div class="w3-half">
          <i class="fa fa-cutlery fa-5x w3-margin-bottom w3-jumbo w3-center"></i>
          <p class="w3-large">Food</p>
          <p>
            Delicious and healthy repcipes available here.
            <br />
            Additional nutrition breakdown
          </p>
        </div>
        <div class="w3-half">
          <i class="fas fa-running fa-5x w3-margin-bottom w3-jumbo"></i>
          <p class="w3-large">Fitness</p>
          <p>
            Our website provides access to different workout
            <br /> routines for a fit boay with added preferences.
          </p>
        </div>
      </div>
    </div>
  );
};
export default aboutF2F;
