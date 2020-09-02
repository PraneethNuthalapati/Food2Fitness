/**
 * @author Sai Pavan Akuralapu <sp536952@dal.ca>
 */

import React, { Component } from 'react';
import classes from './AboutUs.module.css';
import recipe from '../images/recipe1.jpg'
const aboutUs = (props) => {
    return (
        <div class="w3-row-padding w3-padding-64 w3-container">
            <div class="w3-content">
                <div class="w3-twothird">
                    <h1>Food to Fitness</h1>
                    <h5 class="w3-padding-32">Our website provides a common platfom that supports healthy food recipes and workout routines for healthy body.</h5>

                    <p class="w3-text-grey">Our website provides access to different workout routines for a fit boay with added preferences. Furthermore our website provides healthy recipes and nutrition breakdown of the ingredients to help the user to track calories intake. The website allows the user to add videos and host them in our website.</p>
                </div>

                <div class="w3-third w3-center">
                    {/* <i class="fa fa-anchor w3-padding-64 w3-text-red"></i> */}
                    <img class="w3-padding w3-image w3-round-large" src={recipe} alt="recipe" width="700" height="394"/> 
                </div>
            </div>
        </div>
    )
}
export default aboutUs;
