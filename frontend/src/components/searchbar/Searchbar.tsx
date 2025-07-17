import { FC } from "react";
import { Search } from "lucide-react"; // ícono de lupa

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
}

const SearchBar: FC<SearchBarProps> = ({ value, onChange, onSubmit, placeholder = "Buscar..." }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.();
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="flex items-center w-80% max-w-xs sm:max-w-sm md:max-w-md bg-white border border-[#C4BFAB] rounded-lg px-4 py-2 shadow-sm mx-auto"
>
  <Search className="text-[#C4BFAB] mr-2" size={20} />
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="flex-1 bg-transparent outline-none text-gray-800"
  />
</form>
  );
};

export default SearchBar;
