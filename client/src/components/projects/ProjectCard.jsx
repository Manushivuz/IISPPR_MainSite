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
    height: 420px;
    background: #171717;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    box-shadow: 0px 0px 3px 1px #00000088;
    cursor: pointer;
    border-radius: 1rem;
  }

  .card .content {
    border-radius: 1rem;
    background: #171717;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    z-index: 1;
    padding: 0;
    color: white;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .image-container {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
  }

  .project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .card:hover .project-image {
    transform: scale(1.1);
  }

  .category-badge {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: rgba(255, 255, 255, 0.9);
    color: #171717;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 600;
    backdrop-filter: blur(4px);
  }

  .text-content {
    padding: 1.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    color: white;
  }

  .description {
    font-size: 0.875rem;
    color: #a3a3a3;
    margin-bottom: 1rem;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .location {
    display: flex;
    align-items: center;
    color: #a3a3a3;
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }

  .location-icon {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.5rem;
    color: #4ade80;
  }

  .learn-more {
    display: inline-flex;
    align-items: center;
    color: #4ade80;
    font-weight: 500;
    margin-top: auto;
    transition: color 0.3s ease;
  }

  .learn-more:hover {
    color: #22c55e;
  }

  .arrow-icon {
    width: 1.25rem;
    height: 1.25rem;
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
  }

  .learn-more:hover .arrow-icon {
    transform: translateX(4px);
  }

  .content::before {
    opacity: 0;
    transition: opacity 300ms;
    content: " ";
    display: block;
    background: white;
    width: 5px;
    height: 50px;
    position: absolute;
    filter: blur(50px);
    overflow: hidden;
  }

  .card:hover .content::before {
    opacity: 1;
  }

  .card::before {
    opacity: 0;
    content: " ";
    position: absolute;
    display: block;
    width: 80px;
    height: 360px;
    background: linear-gradient(#4ade80, #22c55e);
    transition: opacity 300ms;
    animation: rotation_9018 8000ms infinite linear;
    animation-play-state: paused;
  }

  .card:hover::before {
    opacity: 1;
    animation-play-state: running;
  }

  .card::after {
    position: absolute;
    content: " ";
    display: block;
    width: 250px;
    height: 360px;
    background: #17171733;
    backdrop-filter: blur(50px);
  }

  @keyframes rotation_9018 {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export default ProjectCard;
