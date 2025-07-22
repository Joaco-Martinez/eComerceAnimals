import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

const Pagination = ({ currentPage, totalPages, onPrev, onNext }: PaginationProps) => {
  return (
    <div className="flex justify-center items-center gap-4  text-gray-800">
      {/* Flecha izquierda */}
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="disabled:opacity-30"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Página actual */}
      <span className="text-sm font-medium">
        {currentPage} / {totalPages}
      </span>

      {/* Flecha derecha */}
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="disabled:opacity-30"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
