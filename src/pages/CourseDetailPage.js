// This file is not in the context, so I am providing the full updated code.
// You should replace the content of your existing src/pages/CourseDetailPage.js with this.

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCourseBySlug } from '../services/api';
import './CourseDetailPage.css';

const CourseDetailPage = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    const getCourse = async () => {
      try {
        setLoading(true);
        const res = await fetchCourseBySlug(slug);
        setCourse(res.data);
      } catch (error) {
        console.error("Failed to fetch course details", error);
      } finally {
        setLoading(false);
      }
    };
    getCourse();
  }, [slug]);

  if (loading) return <div className="page-container"><h2>Loading Course...</h2></div>;
  if (!course) return <div className="page-container"><h2>Course not found.</h2></div>;

  return (
    <div className="course-detail-container">
      <header className="course-header">
        <h1>{course.title}</h1>
        <p>{course.description}</p>
      </header>
      <div className="course-curriculum">
        {course.modules.map(module => (
          <div key={module.id} className="module-section">
            <h2>{module.title}</h2>
            {module.topics.map(topic => (
              <div key={topic.id} className="topic-section">
                <h3>{topic.title}</h3>
                {/* We now map directly over topic.content_items */}
                <div className="content-items-container">
                  {topic.content_items.map(item => (
                    <div key={item.id} className="content-item">
                      {item.text_content && <p dangerouslySetInnerHTML={{ __html: item.text_content }} />}
                      {item.image && <img src={`http://127.0.0.1:8000${item.image}`} alt="Course content" />}
                      {item.video_embed_url && (
                        <div className="video-responsive">
                          <iframe
                            src={item.video_embed_url.replace("watch?v=", "embed/")}
                            title="Embedded Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetailPage;
