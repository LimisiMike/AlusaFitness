import React from 'react'
import { Link } from 'react-router-dom';
import './styles.css'

const Navigation = () => {
  return (
    <nav className='navbar'>
        <div className="logo">
            <Link to="/">Alusa Fitness</Link>
        </div>
        <ul className='nav-links'>
            <li>
                <a href="#Workouts">Workouts</a>
            </li>
            <li className='dropdown'>
                <a href="#">Programs</a>
                <div className="dropdown-content">
                    <Link to="Programs/workouts">Workout Plans</Link>
                    <Link to="Programs/meals">Meal Plans</Link>
                </div>
            </li>
            <li>
                <Link to="/articles">Healthy Living</Link>
            </li>
            <li>
                <Link to="/blog">Blog</Link>
            </li>
            <li>
                <Link to="/register">Join Us</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    </nav>
  );
};

export default Navigation;
