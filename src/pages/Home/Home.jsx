import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import hero_banner from '../../assets/hero-banner.jpg' 
import hero_title from '../../assets/hero_title.png' 
import play_icon from '../../assets/play_icon.png' 
import info_icon from '../../assets/info_icon.png' 
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'




const Home = () => {
  console.log("Home component rendering");
  return (
    <div className='home'>
      <Navbar/>
      <div className="hero">
        <img src={hero_banner} alt=""className='banner-image'/>
        <div className="hero-caption">
          <img src={hero_title} alt="" className='caption-img'/>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit quasi incidunt officia est quaerat perspiciatis, deleniti possimus vitae in culpa eos commodi. Atque dolores magnam non, inventore harum libero? Iure.</p>
          <div className="hero-btn">
            <button className='btn'><img src={play_icon} alt="" />Play</button>
           <button className='btn dark-btn'><img src={info_icon} alt="" />Read More</button> 
          </div>
          <TitleCards />
        </div>
      </div>
      <div className="more-cards">
        <TitleCards title={"BlockBuster Movies"} category={"top_rated"}/>
        <TitleCards title={"Only On Netflix"} category={"popular"}/>
        <TitleCards title={"Upcomming"} category={"upcoming"}/>
        <TitleCards title={"Anime"} category={"now_playing"}/>
        
      </div>

      <Footer />
    </div>
  )
}

export default Home
