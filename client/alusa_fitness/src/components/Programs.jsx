import React, { useEffect, useState } from 'react'
import { getPrograms } from '../utils/api'

const Programs = () => {
    const [Programs, setPrograms] =useState([])

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const data = await getPrograms()
                setPrograms(data)
            } catch (error) {
                console.error('Failed to fetch programs:', error)
            }
            }
            fetchPrograms()
        }, [])
        return (
            <section id="programs">
                <h2>Our Programs</h2>
                <div className="program-grid">
                    {Programs.map(program => (
                        <div key={program.id} className="program-card">
                            <h3>{program.title}</h3>
                            <p>{program.description}</p>
                            <p>Price: ${program.price}</p>
                            <button>Add to Bag</button>
                        </div>
                    ))}
                </div>
            </section>
        )
}

export default Programs
