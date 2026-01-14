import { useState, useEffect } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  totalResults?: number;
  isSearching?: boolean;
}

const SearchBar = ({ 
  searchTerm, 
  setSearchTerm, 
  totalResults = 0,
  isSearching = false 
}: SearchBarProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() && !recentSearches.includes(term.trim())) {
      const newRecentSearches = [term.trim(), ...recentSearches.slice(0, 4)];
      setRecentSearches(newRecentSearches);
      localStorage.setItem('recent-searches', JSON.stringify(newRecentSearches));
    }
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    if (recentSearches.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => setShowSuggestions(false), 150);
  };

  const popularTags = ['design', 'development', 'tools', 'tutorials', 'inspiration'];
  const hasResults = searchTerm.trim().length > 0;

  return (
    <div className="search-container">
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        
        <input
          type="text"
          className="search-input"
          placeholder="Search your links by title, URL, description, or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && searchTerm.trim()) {
              handleSearch(searchTerm);
            }
          }}
        />
        
        {isSearching && <div className="search-loading show"></div>}
        
        {searchTerm && (
          <button
            className="clear-button"
            onClick={clearSearch}
            title="Clear search"
          >
            ✕
          </button>
        )}
        
        {/* Search Suggestions */}
        {showSuggestions && (
          <div className="search-suggestions show">
            {recentSearches.length > 0 && (
              <>
                <div style={{ padding: 'var(--space-2) var(--space-6)', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Recent Searches
                </div>
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => handleSearch(search)}
                  >
                    <span className="suggestion-icon">🕐</span>
                    {search}
                  </div>
                ))}
              </>
            )}
            
            <div style={{ padding: 'var(--space-2) var(--space-6)', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Popular Tags
            </div>
            {popularTags.map((tag) => (
              <div
                key={tag}
                className="suggestion-item"
                onClick={() => handleSearch(tag)}
              >
                <span className="suggestion-icon">🏷️</span>
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search Results Info */}
      {hasResults && (
        <div className={`search-results ${hasResults ? 'show' : ''}`}>
          <div className="results-info">
            <span className="results-count">
              {totalResults} {totalResults === 1 ? 'result' : 'results'}
            </span>
            <span>found for "{searchTerm}"</span>
          </div>
          
          {searchTerm && (
            <button
              onClick={clearSearch}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: 'var(--text-sm)',
                padding: 'var(--space-1)',
                borderRadius: 'var(--radius)',
                transition: 'all var(--duration-fast)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'var(--neutral-200)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = 'var(--text-muted)';
              }}
            >
              Clear
            </button>
          )}
        </div>
      )}

      {/* Filter Chips */}
      {hasResults && (
        <div className={`filter-chips ${hasResults ? 'show' : ''}`}>
          {popularTags
            .filter(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            .slice(0, 3)
            .map((tag) => (
              <div
                key={tag}
                className="filter-chip"
                onClick={() => handleSearch(tag)}
              >
                {tag}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;