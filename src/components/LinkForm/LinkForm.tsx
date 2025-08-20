import { useState, useEffect } from 'react';
import './LinkForm.css';
import { InputField, TextAreaField } from '../FormField/FormField';
import type { Link } from '../../types';

interface LinkFormProps {
  addLink: (link: Link) => void;
  updateLink: (link: Link) => void;
  editingLink: Link | null;
}

interface FormErrors {
  title?: string;
  url?: string;
}

const LinkForm = ({ addLink, updateLink, editingLink }: LinkFormProps) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    if (editingLink) {
      setTitle(editingLink.title);
      setUrl(editingLink.url);
      setDescription(editingLink.description);
      setTags(editingLink.tags.join(', '));
      setErrors({});
    } else {
      resetForm();
    }
  }, [editingLink]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const resetForm = () => {
    setTitle('');
    setUrl('');
    setDescription('');
    setTags('');
    setErrors({});
    setMessage(null);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!url.trim()) {
      newErrors.url = 'URL is required';
    } else {
      const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
      const testUrl = url.startsWith('http') ? url : `https://${url}`;
      if (!urlPattern.test(testUrl)) {
        newErrors.url = 'Please enter a valid URL';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setMessage({ type: 'error', text: 'Please fix the errors above' });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 800));

    const linkData = {
      id: editingLink ? editingLink.id : crypto.randomUUID(),
      title: title.trim(),
      url: url.startsWith('http') ? url : `https://${url}`,
      description: description.trim(),
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    };

    try {
      if (editingLink) {
        updateLink(linkData);
        setMessage({ type: 'success', text: 'Link updated successfully! ✨' });
      } else {
        addLink(linkData);
        setMessage({ type: 'success', text: 'Link added successfully! 🎉' });
      }
      
      resetForm();
    } catch (error) {
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="link-form">
      <div className="form-progress">
        <div className={`form-progress-bar ${isSubmitting ? 'show' : ''}`}></div>
      </div>
      
      <div className="form-header">
        <h2 className="form-title">
          {editingLink ? 'Edit Link' : 'Add New Link'}
        </h2>
        <p className="form-subtitle">
          {editingLink 
            ? 'Update your link details below' 
            : 'Save and organize your favorite web resources'
          }
        </p>
      </div>

      {message && (
        <div className={`form-message form-message--${message.type}`}>
          <span>{message.type === 'success' ? '✓' : '⚠️'}</span>
          {message.text}
        </div>
      )}
      
      <div className="form-grid">
        <InputField
          label="Title"
          required
          value={title}
          onChange={setTitle}
          placeholder="Enter a descriptive title"
          error={errors.title}
        />
        
        <InputField
          label="URL"
          type="url"
          required
          value={url}
          onChange={setUrl}
          placeholder="https://example.com"
          error={errors.url}
        />
        
        <TextAreaField
          label="Description"
          value={description}
          onChange={setDescription}
          placeholder="What makes this link special? Add context, notes, or a summary..."
          rows={4}
        />
        
        <InputField
          label="Tags"
          value={tags}
          onChange={setTags}
          placeholder="web-design, tutorial, inspiration, tools"
        />
      </div>
      
      <div className="form-actions">
        <button 
          type="submit" 
          className="form-button form-button--primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : (editingLink ? 'Update Link' : 'Save Link')}
        </button>
        
        {editingLink && (
          <button 
            type="button" 
            className="form-button form-button--secondary"
            onClick={resetForm}
            disabled={isSubmitting}
          >
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
};

export default LinkForm;