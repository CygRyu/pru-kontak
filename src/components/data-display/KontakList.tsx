
import { Kontak, FilterOptions } from "@/types";
import KontakCard from "./KontakCard";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SearchX } from "lucide-react";

interface KontakListProps {
  kontakList: Kontak[];
  filterOptions: FilterOptions;
}

const KontakList = ({ kontakList, filterOptions }: KontakListProps) => {
  const navigate = useNavigate();

  const filteredList = kontakList.filter((kontak) => {
    // Filter berdasarkan jenis kontak jika ditentukan
    if (filterOptions.jenisKontak && kontak.jenisKontak !== filterOptions.jenisKontak) {
      return false;
    }

    // Filter berdasarkan status jika ditentukan
    if (filterOptions.status && kontak.status !== filterOptions.status) {
      return false;
    }

    // Filter berdasarkan pencarian jika ditentukan
    if (filterOptions.pencarian) {
      const searchLower = filterOptions.pencarian.toLowerCase();
      return (
        kontak.nama.toLowerCase().includes(searchLower) ||
        kontak.email.toLowerCase().includes(searchLower) ||
        kontak.telepon.includes(filterOptions.pencarian) ||
        kontak.alamat.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  const handleKontakClick = (id: string) => {
    const jenisPath = 
      kontakList.find(k => k.id === id)?.jenisKontak === 'Nasabah' 
        ? 'nasabah' 
        : 'agen';
    navigate(`/${jenisPath}/${id}`);
  };

  if (filteredList.length === 0) {
    return (
      <Alert className="bg-muted/50">
        <SearchX className="h-5 w-5 mr-2" />
        <AlertDescription>
          Tidak ada kontak yang ditemukan untuk filter yang dipilih.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredList.map((kontak) => (
        <KontakCard 
          key={kontak.id} 
          kontak={kontak} 
          onClick={() => handleKontakClick(kontak.id)}
        />
      ))}
    </div>
  );
};

export default KontakList;
