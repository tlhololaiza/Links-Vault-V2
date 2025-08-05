import { useState, useEffect } from 'react';
import './LinkForm.css';
import type { Link } from '../../types';

interface LinkFormProps {
  addLink: (link: Link) => void;
  updateLink: (link: Link) => void;
  editingLink: Link | null;
}

const LinkForm = ({ addLink, updateLink, editingLink }: LinkFormProps) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (editingLink) {
      setTitle(editingLink.title);
      setUrl(editingLink.url);
      setDescription(editingLink.description);
      setTags(editingLink.tags.join(', '));
    } else {
      resetForm();
    }
  }, [editingLink]);

  const resetForm = () => {
    setTitle('');
    setUrl('');
    setDescription('');
    setTags('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !url) {
      alert('Title and URL are required!');
      return;
    }

    const linkData = {
      id: editingLink ? editingLink.id : crypto.randomUUID(),
      title,
      url: url.startsWith('http') ? url : `https://${url}`,
      description,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    };

    if (editingLink) {
      updateLink(linkData);
    } else {
      addLink(linkData);
    }
    
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="link-form">
      <h2>{editingLink ? 'Edit Link' : 'Add New Link'}</h2>
      <div className="form-group">
        <label>Title*</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Enter title"
        />
      </div>
      <div className="form-group">
        <label>URL*</label>
        <input 
          type="text" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
          placeholder="Enter URL"
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Enter description"
        />
      </div>
      <div className="form-group">
        <label>Tags (comma separated)</label>
        <input 
          type="text" 
          value={tags} 
          onChange={(e) => setTags(e.target.value)} 
          placeholder="tag1, tag2, tag3"
        />
      </div>
      <div className="form-actions">
        <button type="submit">{editingLink ? 'Update' : 'Save'}</button>
        {editingLink && (
          <button type="button" onClick={resetForm}>Cancel</button>
        )}
      </div>
    </form>
  );
};

export default LinkForm;