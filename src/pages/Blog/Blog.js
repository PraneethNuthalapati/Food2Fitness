import React, {Component} from 'react';
import Header from '../../components/Header';
import Footer from '../Footer_black';
import BlogCard from './BlogCard/BlogCard';
import recipe1 from "../../images/recipe1.jpg";
import recipe2 from "../../images/recipe2.jpg";
import recipe3 from "../../images/recipe3.jpg";
import workout1 from "../../images/workout1.jpg";
import workout3 from "../../images/workout3.jpg";

class Blog extends Component{

    state={
        blogs:[
            {
                image:recipe1,
                title:"Chickpea Glow Bowl"
            },
            {
                image:recipe2,
                title: "Baked Sweet Potatoes",
            },
            {
                image:recipe3,
                title: "Green Shakshuka With Cheese",
            },
            {
                image:workout1,
                title: "Handstand",
            },
            {
                image:workout3,
                title: "Diamond Push Up",
            }
        ]
    }
    
    render () {
        const blogs=[...this.state.blogs]
        // console.log(blogs)
        const blogList= Object.keys(blogs)
                .map((bKey,i)=>{
                    
                    return [...Array(blogs[bKey])].map((j, i) => {
                        console.log(j);
                        return(<BlogCard key={j.title} title={j.title} image={j.image}/>);
                })
            })
                .reduce ((arr, ele) => {
                    return arr.concat(ele);
                },[]);
        // console.log(blogList)
        return(
            <div>
                <Header/>
                <div class="container-flex" style={{marginTop:"150px", marginBottom:"200px"}}>
                    <div class="row">
                        <div class="col-3">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item disabled"><h3 class="display-6">Welcomes to F2F Blogs</h3></li>
                                <li class="list-group-item"><button type="button" class="btn btn-info p-3"><h4>Create Blog</h4></button></li>
                            </ul>
                        </div>
                        <div class="col-8">
                            {blogList}
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Blog;