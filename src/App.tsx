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
    alert('Link added successfully!');
  };

  const updateLink = (updatedLink: Link) => {
    setLinks(links.map(link => link.id === updatedLink.id ? updatedLink : link));
    setEditingLink(null);
    alert('Link updated successfully!');
  };

  const deleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
    alert('Link deleted successfully!');
  };

  return (
    <div className="app">
      <h1>React Links Vault</h1>
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
  );
}

export default App;