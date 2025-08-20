import { useState, useEffect } from 'react';
import LinkForm from './components/LinkForm/LinkForm';
import LinkList from './components/LinkList/LinkList';
import './App.css';

export interface Link {
  id: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
}

function App() {
  const [links, setLinks] = useState<Link[]>(() => {
    const saved = localStorage.getItem('links-vault');
    return saved ? JSON.parse(saved) : [];
  });
  const [editingLink, setEditingLink] = useState<Link | null>(null);

  useEffect(() => {
    localStorage.setItem('links-vault', JSON.stringify(links));
  }, [links]);

  const addLink = (link: Link) => {
    setLinks([...links, link]);
  };

  const updateLink = (updatedLink: Link) => {
    setLinks(links.map(link => link.id === updatedLink.id ? updatedLink : link));
    setEditingLink(null);
  };

  const deleteLink = (id: string) => {
    if (window.confirm('Are you sure you want to delete this link?')) {
      setLinks(links.filter(link => link.id !== id));
    }
  };

  const totalTags = new Set(links.flatMap(link => link.tags)).size;

  return (
    <div className="app">
      <header className="header">
        <h1 className="app-title">LinkVault Pro</h1>
        <p className="app-subtitle">
          Your personal digital library for organizing, managing, and discovering your favorite web resources
        </p>
        
        <div className="app-description">
          <h2>🌟 Welcome to LinkVault Pro</h2>
          <p>
            Transform the way you save and organize your digital discoveries! LinkVault Pro is your 
            intelligent companion for curating web content, building knowledge bases, and never losing 
            track of those important resources again.
          </p>
          <p>
            Whether you're a researcher, developer, designer, or curious learner, LinkVault Pro helps 
            you create a personalized digital library that grows with your interests and projects.
          </p>
          
          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">🔗</span>
              <span className="feature-text">Smart Link Organization</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🏷️</span>
              <span className="feature-text">Flexible Tagging System</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔍</span>
              <span className="feature-text">Powerful Search Engine</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📱</span>
              <span className="feature-text">Fully Responsive Design</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <span className="feature-text">Lightning Fast Performance</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <span className="feature-text">Secure Local Storage</span>
            </div>
          </div>
        </div>
      </header>

      <div className="main-container">
        {/* Stats Section */}
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-number">{links.length}</div>
            <div className="stat-label">Saved Links</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{totalTags}</div>
            <div className="stat-label">Unique Tags</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{links.filter(link => link.description).length}</div>
            <div className="stat-label">With Descriptions</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {Math.round((links.filter(link => link.description).length / Math.max(links.length, 1)) * 100)}%
            </div>
            <div className="stat-label">Completion Rate</div>
          </div>
        </div>

        <LinkForm 
          addLink={addLink} 
          updateLink={updateLink} 
          editingLink={editingLink}
        />
        
        <LinkList 
          links={links} 
          deleteLink={deleteLink} 
          setEditingLink={setEditingLink}
        />
      </div>
    </div>
  );
}

export default App;