// src/pages/DynamicPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPageBySlug } from '../services/api';
import './Page.css';

const DynamicPage = () => {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { slug } = useParams();

  useEffect(() => {
    const getPageData = async () => {
      try {
        setLoading(true);
        const response = await fetchPageBySlug(slug);
        setPage(response.data);
        setError('');
      } catch (err) {
        setError('Failed to load page content.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getPageData();
  }, [slug]); // Re-run effect when the slug changes

  if (loading) return <div className="page-container"><h2>Loading...</h2></div>;
  if (error) return <div className="page-container"><h2>{error}</h2></div>;
  if (!page) return <div className="page-container"><h2>Page not found.</h2></div>;

  return (
    <div className="page-container">
      <h1>{page.title}</h1>
      <div className="page-content" dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
};

export default DynamicPage;
