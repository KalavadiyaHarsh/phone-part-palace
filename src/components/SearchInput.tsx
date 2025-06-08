
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearch } from '@/contexts/SearchContext';
import { useNavigate } from 'react-router-dom';

interface SearchInputProps {
  className?: string;
  placeholder?: string;
  onMobileSearch?: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ 
  className = "", 
  placeholder = "Search products...",
  onMobileSearch 
}) => {
  const { searchTerm, setSearchTerm } = useSearch();
  const [localTerm, setLocalTerm] = useState(searchTerm);
  const navigate = useNavigate();

  const handleSearch = () => {
    setSearchTerm(localTerm);
    if (localTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(localTerm.trim())}`);
    }
    onMobileSearch?.();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setLocalTerm('');
    setSearchTerm('');
  };

  return (
    <div className={`relative ${className}`}>
      <Input
        type="search"
        placeholder={placeholder}
        value={localTerm}
        onChange={(e) => setLocalTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        className="w-full pr-20"
      />
      <div className="absolute right-0 top-0 h-full flex items-center">
        {localTerm && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="h-full text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSearch}
          className="h-full text-gray-400 hover:text-brand-orange"
        >
          <Search size={20} />
        </Button>
      </div>
    </div>
  );
};

export default SearchInput;
