import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ProjectCard = ({ project }) => {
  const { id, title, description, image, category, location } = project;

  return (
    <StyledWrapper>
      <div className="card">
        <div className="content">
          {/* Image Container */}
          <div className="image-container">
            <img src={image} alt={title} className="project-image" />
            <div className="category-badge">{category}</div>
          </div>

          {/* Content */}
          <div className="text-content">
            <h3 className="title">{title}</h3>
            <p className="description">{description}</p>
            
            <div className="location">
              <svg
                className="location-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{location}</span>
            </div>

            <Link to={`/projects/${id}`} className="learn-more">
              Learn More
              <svg
                className="arrow-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 100%;
    height: auto;
    background: #fafafa;
    border: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    border-radius: 0.75rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.1);
  }

  .image-container {
    width: 100%;
    height: 180px;
    overflow: hidden;
  }

  .project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .card:hover .project-image {
    transform: scale(1.05);
  }

  .category-badge {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: #f97316; 
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .text-content {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .title {
    font-size: 1.125rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #0f172a;
  }

  .description {
    font-size: 0.875rem;
    color: #475569;
    margin-bottom: 1rem;
    line-height: 1.5;
  }

  .location {
    display: flex;
    align-items: center;
    color: #64748b;
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }

  .location-icon {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
    color: #94a3b8;
  }

  .learn-more {
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    background: #0f172a;
    color: white;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    transition: background 0.3s ease;
    text-decoration: none;
  }

  .learn-more:hover {
    background: #1e293b;
  }

  .arrow-icon {
    width: 1rem;
    height: 1rem;
    margin-left: 0.5rem;
  }
`;

export default ProjectCard;
