import { useState } from 'react';
import LinkItem from '../LinkItem/LinkItem';
import './LinkList.css';
import type { Link } from '../../types';
import SearchBar from '../SearchBar/SeacrhBar';

interface LinkListProps {
  links: Link[];
  deleteLink: (id: string) => void;
  setEditingLink: (link: Link) => void;
}

const LinkList = ({ links, deleteLink, setEditingLink }: LinkListProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLinks = links.filter(link => {
    const term = searchTerm.toLowerCase();
    return (
      link.title.toLowerCase().includes(term) ||
      link.url.toLowerCase().includes(term) ||
      link.description.toLowerCase().includes(term) ||
      link.tags.some(tag => tag.toLowerCase().includes(term))
    );
  });

  return (
    <div className="link-list">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {filteredLinks.length === 0 ? (
        <p>No links found. Add a new link to get started!</p>
      ) : (
        <div className="links-grid">
          {filteredLinks.map(link => (
            <LinkItem 
              key={link.id} 
              link={link} 
              deleteLink={deleteLink} 
              setEditingLink={setEditingLink}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LinkList;