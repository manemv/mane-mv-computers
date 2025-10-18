// Create new file: src/components/CourseCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './CourseCard.css';

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <div className="course-card-content">
        <h3 className="course-card-title">{course.title}</h3>
        <p className="course-card-description">{course.description}</p>
        <Link to={`/courses/${course.slug}`} className="course-card-link">
          View Course &rarr;
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
