import { useState, useEffect } from 'react';
import axios from 'axios';

function Projects() {
  const [projects, setProjects] = useState([]); // ← Empty array default rakha
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://portfolio-backend-987s.onrender.com/api/projects');
        console.log('API Response:', response.data); // ← Ye add kar debug ke liye
        setProjects(response.data.data || response.data); // ← Dono case handle
        setLoading(false);
      } catch (err) {
        setError('Projects load nahi ho paye');
        setLoading(false);
        console.log(err);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <h2 style={{textAlign: 'center', padding: '50px', color: 'white'}}>Loading projects...</h2>;
  if (error) return <h2 style={{textAlign: 'center', padding: '50px', color: 'red'}}>{error}</h2>;

  return (
    <section className="projects-section" id="projects">
      <h2>My Projects</h2>
      <div className="projects-grid">
        {projects && projects.length > 0 ? ( // ← Null check add kiya
          projects.map((project) => (
            <div key={project._id} className="project-card">
              <img 
               src={project.image}
               alt="" 
               onError={(e) => e.target.style.display = 'none'}
              />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              
              <div className="tech-stack">
                {project.technologies && project.technologies.map((tech, index) => ( // ← Null check
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
              
              <div className="project-links">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer">GitHub</a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">Live Demo</a>
                )}
              </div>
            </div>
          ))
        ) : (
          <p style={{textAlign: 'center', color: '#aaa'}}>No projects found</p>
        )}
      </div>
    </section>
  );
}

export default Projects;