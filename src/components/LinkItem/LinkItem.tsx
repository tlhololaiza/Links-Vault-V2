import './LinkItem.css';
import { FiLink } from 'react-icons/fi';
import type { Link } from '../../types';

interface LinkItemProps {
  link: Link;
  deleteLink: (id: string) => void;
  setEditingLink: (link: Link) => void;
}

const LinkItem = ({ link, deleteLink, setEditingLink }: LinkItemProps) => {
  return (
    <div className="link-item">
      <h3>
        <a href={link.url} target="_blank" rel="noopener noreferrer">
          <FiLink className="link-icon" />
          {link.title}
        </a>
      </h3>
      <p>{link.description}</p>
      <div className="tags">
        {link.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
      <div className="actions">
        <button onClick={() => setEditingLink(link)}>Edit</button>
        <button onClick={() => deleteLink(link.id)}>Delete</button>
      </div>
    </div>
  );
};

export default LinkItem;