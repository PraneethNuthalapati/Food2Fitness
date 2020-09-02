import React from 'react';
import classes from '../BlogCard/Blogcard.module.css';

const blogCard = (props)=>(
    <div >
        <div class="card mb-3" >
            <div class="row">
                <div class='col'><img class="card-img-right img-thumbnail rounded mx-auto d-block"  src={props.image} alt="Card image cap"/></div>
                <div class='col'>
                    <div class="card-body">
                        <h5 class="card-title">{props.title}</h5>
                        <p class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                    </div>
                </div>
            </div>
            
            
        </div>
        
    </div>
);

export default blogCard;