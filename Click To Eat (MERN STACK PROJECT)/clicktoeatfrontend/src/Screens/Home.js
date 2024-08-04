import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Card from '../Components/Card'
//import Carousel from '../Components/Carousel'
import axios from 'axios'


const Home = () => {
   
  const[foodItems, setFoodItems]= useState([])
  const[foodCat, setFoodCat]= useState([])
  const[search, setSearch]= useState('')

  const fetchFoodData= async()=>{
    try{
    const response= await axios.get('http://localhost:8001/api/fooddata');

    const foodData = response.data

    setFoodItems(foodData[0])
    setFoodCat(foodData[1])

    }catch(err){
      console.log('error in fetching data',err)
    }
  }

  useEffect(()=>{

       fetchFoodData()
        
    },[])


  const handleChange=(e)=>{
      setSearch(e.target.value)
  }

  return (
    <div >
        <div><Navbar></Navbar></div>

        {/* <div><Carousel></Carousel></div> */}

       {/* --------------------carousel------------------- */}
        <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade"  style={{objectFit:"contain !important"}}>
            <div className="carousel-inner" style={{maxHeight:"500px"}}>
                <div className="carousel-caption" style={{zIndex:5}} >
                    <div className=" d-flex justify-content-center" role="search" >
                      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={handleChange}/>
                      {/* <button className="btn btn-outline-success bg-success text-white " type="submit">Search</button> */}
                    </div>
                </div>
                
                <div className="carousel-item active"  >
                    <img src="/carouselimage/meal1.jpg" className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item">
                    <img src="/carouselimage/main course.jpg" className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item">
                    <img src="/carouselimage/meal2.jpg" className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item">
                    <img src="/carouselimage/fastfood.jpg" className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item">
                    <img src="/carouselimage/ice.jpg" className="d-block w-100" alt="..."/>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
            </button>
           
        </div>
    </div>



{/* --------------------------------card part------------------------------------- */}

        <div className='container mb-2'>
            {
            foodCat.length>0 ? foodCat.map((data)=>{
              return (
                <div className='row mb-3'>

                    <div key={data._id} className='fs-3 m-3 '> 
                      {data.CategoryName} 
                    </div>

                    <hr></hr>

                   
                          { foodItems.length>0 ? foodItems.filter((item)=>{
                            return ((item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())) )
                          }).map((item)=>{
                            return (
                              <div key={item._id} className='fs-3 m-3 col-12 col-md-6 col-lg-3'> 
                                <Card name={item.name} img={item.img} description={item.description} options={item.options[0]} item={item} ></Card>
                              </div>
                            )
                          }) :  <div>''''</div>
                      
                        }
                   
                </div>
                )


            }): <div>''''</div>
            }
        </div>

       
  
        <div className='ms-4 me-4 mb-0'><Footer></Footer></div>
    </div>
  )
}

export default Home