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

  const resetForm = () => {
    setTitle('');
    setUrl('');
    setDescription('');
    setTags('');
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!url.trim()) {
      newErrors.url = 'URL is required';
    } else {
      // Basic URL validation
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      const testUrl = url.startsWith('http') ? url : `https://${url}`;
      if (!urlPattern.test(testUrl)) {
        newErrors.url = 'Please enter a valid URL';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const linkData = {
      id: editingLink ? editingLink.id : crypto.randomUUID(),
      title: title.trim(),
      url: url.startsWith('http') ? url : `https://${url}`,
      description: description.trim(),
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
      
      <InputField
        label="Title"
        required
        value={title}
        onChange={setTitle}
        placeholder="Enter title"
        error={errors.title}
      />
      
      <InputField
        label="URL"
        type="url"
        required
        value={url}
        onChange={setUrl}
        placeholder="Enter URL (e.g., example.com or https://example.com)"
        error={errors.url}
      />
      
      <TextAreaField
        label="Description"
        value={description}
        onChange={setDescription}
        placeholder="Enter description"
        rows={3}
      />
      
      <InputField
        label="Tags"
        value={tags}
        onChange={setTags}
        placeholder="tag1, tag2, tag3"
      />
      
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