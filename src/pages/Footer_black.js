/**
 * @author Sai Pavan Akuralapu <sp536952@dal.ca>
 */

import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import classes from './Footer_black.module.css';
const FooterPage = (props) => {
  return (
    <MDBFooter color="black" className={`font-small pt-4 mt-4  ${classes.Footer}`}>
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">Food to Fitness</h5>
            <p>
              Our website provides access to different workout routines for a fit boay with an option to apply preferences. Furthermore our website provides healthy recipes and nutrition breakdown of the ingredients to help the user to track calories intake. The website allows the user to add videos and host them in our website.
            </p>
          </MDBCol>
          <MDBCol className={classes.divImpo}>
              <div className="container-fluid "></div>
          </MDBCol>
          <MDBCol md="2" className={classes.borderImp}> 
            <h5 className="title">Company</h5>
            <ul className={classes.ul}>
              <li className="list-unstyled">
                <a href="/faq">FAQ</a>
              </li>
              <li className="list-unstyled">
                <a href="/contactus">Contact us</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="2">
            <h5 className="title">Social</h5>
            <ul className={classes.ul}>
              <li className="list-unstyled">
              <a href="#!"><i class="fa fa-facebook-square" aria-hidden="true"></i> Facebook</a>
              </li>
              <li className="list-unstyled">
                <a href="#!"><i class="fa fa-instagram" aria-hidden="true"></i> Instagram</a>
              </li>
              <li className="list-unstyled">
                <a href="#!"><i class="fa fa-twitter" aria-hidden="true"></i> Twitter</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href=""> Food2Fitness.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}


export default FooterPage;
