import React, { useEffect, useState } from 'react'
import { getWorkoutVideos } from '../utils/api'

const WorkoutVidoes = () => {
    const [videos, setVideos] = useState([]);
    const [difficulty, setdifficulty] = useState('beginner'); //example difficulty level

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const data = await getWorkoutVideos(difficulty);
                setVideos(data);
            } catch (error) {
                console.error('Failed to fetch videos:', error);
            }
        };
        fetchVideos();
    }, [difficulty])
    
    return (
        <section id="workouts">
            <h2>Workout Videos</h2>
            <div className="video-grid">
                {videos.map(video => (
                    <div key={video.id} className="video-card">
                        <h3>{video.title}</h3>
                        <video controls>
                            <source src={video.url} type='video/mp4' />
                        </video>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WorkoutVidoes;
