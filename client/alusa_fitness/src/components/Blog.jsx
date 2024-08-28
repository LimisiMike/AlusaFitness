import React, { useEffect, useState } from 'react'
import { getBlogPosts } from '../utils/api'

const Blog = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getBlogPosts()
                setPosts(data)
            } catch (error) {
                console.error('Failed to fetch blog posts', error)
            }
        }
        fetchPosts()
    }, [])
    return (
        <section id="blog">
            <h2>Blog</h2>
            <div className="blog-list">
                {posts.map(post => (
                    <div key={post.id} className="blog-post">
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Blog
