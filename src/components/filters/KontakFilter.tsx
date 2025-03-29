
import { useState, useEffect } from "react";
import { FilterOptions, KontakStatus, JenisKontak } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";

interface KontakFilterProps {
  onFilterChange: (options: FilterOptions) => void;
  initialFilter?: FilterOptions;
  showJenisFilter?: boolean;
}

const KontakFilter = ({
  onFilterChange,
  initialFilter,
  showJenisFilter = true,
}: KontakFilterProps) => {
  const [filters, setFilters] = useState<FilterOptions>(initialFilter || {});
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleJenisChange = (value: string | undefined) => {
    if (value) {
      setFilters({ ...filters, jenisKontak: value as JenisKontak });
    } else {
      const { jenisKontak, ...rest } = filters;
      setFilters(rest);
    }
  };

  const handleStatusChange = (value: string | undefined) => {
    if (value) {
      setFilters({ ...filters, status: value as KontakStatus });
    } else {
      const { status, ...rest } = filters;
      setFilters(rest);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      setFilters({ ...filters, pencarian: value });
    } else {
      const { pencarian, ...rest } = filters;
      setFilters(rest);
    }
  };

  const clearFilters = () => {
    setFilters({});
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <div className="space-y-4">
      {/* Search and toggle filters */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari nama, email, telepon..."
            className="pl-8 w-full"
            value={filters.pencarian || ""}
            onChange={handleSearchChange}
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleFilterVisibility}
          className={isFilterVisible ? "bg-muted" : ""}
        >
          <Filter className="h-4 w-4" />
        </Button>
        {Object.keys(filters).length > 0 && (
          <Button variant="ghost" size="icon" onClick={clearFilters}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Expanded filters */}
      {isFilterVisible && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {showJenisFilter && (
            <div>
              <Select
                value={filters.jenisKontak}
                onValueChange={handleJenisChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Semua Jenis Kontak" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nasabah">Nasabah</SelectItem>
                  <SelectItem value="Agen">Agen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <div>
            <Select 
              value={filters.status} 
              onValueChange={handleStatusChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Semua Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Prospek">Prospek</SelectItem>
                <SelectItem value="Aktif">Aktif</SelectItem>
                <SelectItem value="Tidak Aktif">Tidak Aktif</SelectItem>
                <SelectItem value="Perlu Tindak Lanjut">Perlu Tindak Lanjut</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
};

export default KontakFilter;
