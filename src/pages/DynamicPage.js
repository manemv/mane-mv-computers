// src/pages/DynamicPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPageBySlug, fetchCourses } from '../services/api';
import CourseCard from '../components/CourseCard'; // Import CourseCard
import './Page.css';

const DynamicPage = () => {
  const [page, setPage] = useState(null);
  const [courses, setCourses] = useState([]); // State for courses
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { slug } = useParams();

  useEffect(() => {
    const getPageData = async () => {
      try {
        setLoading(true);
        // Special handling for the 'courses' page
        if (slug === 'courses') {
          const [pageResponse, coursesResponse] = await Promise.all([
            fetchPageBySlug(slug),
            fetchCourses(),
          ]);
          setPage(pageResponse.data);
          setCourses(coursesResponse.data);
        } else {
          const response = await fetchPageBySlug(slug);
          setPage(response.data);
        }
        setError('');
      } catch (err) {
        setError('Failed to load page content.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getPageData();
  }, [slug]);

  if (loading) return <div className="page-container"><h2>Loading...</h2></div>;
  if (error) return <div className="page-container"><h2>{error}</h2></div>;
  if (!page) return <div className="page-container"><h2>Page not found.</h2></div>;

  // If this is the courses page, render the course list
  if (slug === 'courses') {
    return (
      <div className="page-container">
        <h1>{page.title}</h1>
        <div className="page-content" dangerouslySetInnerHTML={{ __html: page.content }} />
        <div className="course-grid">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    );
  }

  // Default rendering for other pages
  return (
    <div className="page-container">
      <h1>{page.title}</h1>
      <div className="page-content" dangerouslySetInnerHTML={{ __html: page.content }} />
      {page.content_pages && page.content_pages.length > 0 && (
        <div className="content-list">
          <h2>Related Content</h2>
          {page.content_pages.map((contentItem) => (
            <div key={contentItem.id} className="content-card">
              <h3>{contentItem.title}</h3>
              <p>{contentItem.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DynamicPage;
