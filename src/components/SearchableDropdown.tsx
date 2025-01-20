import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface Option {
  id: string;
  name: string;
}

interface SearchableDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled: boolean;
}

export function SearchableDropdown({ options, value, onChange, placeholder, disabled }: SearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    const filtered = options.filter(option =>
      option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [searchTerm, options]);

  const selectedOption = options.find(option => option.id === value);

  return (
    <div className="relative">
      <div
        className="w-full p-2 border rounded-md flex items-center justify-between bg-white cursor-pointer"
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className="flex-1">
          {selectedOption ? selectedOption.name : placeholder}
        </span>
        <Search className="w-4 h-4 text-gray-400" />
      </div>

      {!disabled && isOpen && (
        <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10">
          <input
            type="text"
            className="w-full p-2 border-b"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="max-h-60 overflow-auto">
            {filteredOptions.map((option) => (
              <div
                key={option.id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onChange(option.id);
                  setIsOpen(false);
                  setSearchTerm('');
                }}
              >
                {option.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
