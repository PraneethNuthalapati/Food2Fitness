/**
 * @author Punarva Vyas <pn605302@dal.ca>
 */

import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "./Footer_black";


class FAQ extends Component{
    render() {
        return (
       <div style={{ marginBottom: "12vh", marginTop: "20vh" }}>
          
            <Header />
            <div className="container" style={{ marginBottom: "8vh" }}>
              <form onSubmit={this.handleSubmit}>
                <div className="row" style={{ justifyContent: "center" }}>
                  <div
                    className="col-sm-6 col-md-6 col-lg-6 mx-auto"
                    style={{
                      padding: "20px",
                      border: "1px solid black",
                      backgroundColor: "white",
                      borderRadius: "10px",
                      boxShadow: "1px 4px 6px grey",
                    }}
                  >
                    <h1 className="text-primary" style={{ textAlign: "center" }}>
                      <strong>FAQ</strong>
                    </h1>
                    <ol style={{ textAlign: "left" }}>
                    
                            <li><b>Muscle weighs more than fat. True or False?</b>
                                 <br></br>False. A pound is a pound regardless of whether the pound is fat or muscle. 
                               </li>
                               <li><b>Maintaining physical fitness requires major lifestyle changes. True or False?</b>
                                 <br></br>False. Fitness can be achieved through small changes in what you eat and your level of activity.
                               </li>
                               <li><b>You should warm up before exercising. True or False?</b>
                                 <br></br>True. Each workout should begin with a warm-up.
                               </li>

                               <li><b>Older adults are least likely to benefit from physical activity. True or False?</b>
                                 <br></br>False. The best thing about regular physical activity is that everyone can benefit from it.
                               </li>

                               <li><b>Crunches and sit-ups are the best way to lose belly fat. True or False?</b>
                                 <br></br>False. Forget doing hundreds of crunches and sit-ups in an effort to lose belly fat. 
                               </li>



                            
                       
                       

                    </ol>
                
                  
                  </div>
                </div>
              </form>
            </div>
            <Footer />
          </div>
        );
      }
    }
    
    
export default FAQ;




