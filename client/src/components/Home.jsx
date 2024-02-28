import React from 'react'
import home from '../assets/images/home.png'
import design from '../assets/images/design.png'
import { NavLink } from 'react-router-dom'
import Analytics from './Analytics'

const Home = () => {
  return (
    <>
        <main>
            <section className="section-hero">
                <div className="container grid grid-two-cols">
                    <div className="hero-content">
                        <p>We are the World Best IT Company</p>
                        <h1>Welcome to Mern Page</h1>
                        <p>Are you ready to take your business to the next level with cutting-edge IT solution? Look no further! At Thapa Technical, we specialize in providing innvative IT servicess and solutions tailored to meet your uniqe needs. </p>
                        <div className="btn btn-group">
                            <NavLink to='/contact'> <button className='btn'>connect now</button> </NavLink>
                            <NavLink to='/service'> <button className='btn secondary-btn'>learn more</button> </NavLink>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src={home} alt="home" width='400' height='500' />
                    </div>
                </div>
            </section>
        </main>

        {/* Analytics Sction */}
        <Analytics />

        {/* 3rd Section */}

        <section className="section-hero">
                <div className="container grid grid-two-cols">
                    <div className="hero-image">
                        <img src={design} alt="design" width='400' height='500' />
                    </div>
                    <div className="hero-content">
                        <p>We are the World Best IT Company</p>
                        <h1>Welcome to Mern Page</h1>
                        <p>Are you ready to take your business to the next level with cutting-edge IT solution? Look no further! At Thapa Technical, we specialize in providing innvative IT servicess and solutions tailored to meet your uniqe needs. </p>
                        <div className="btn btn-group">
                            <NavLink to='/contact'> <button className='btn'>connect now</button> </NavLink>
                            <NavLink to='/service'> <button className='btn secondary-btn'>learn more</button> </NavLink>
                        </div>
                    </div>
                </div>
            </section>

    </>
  )
}

export default Home