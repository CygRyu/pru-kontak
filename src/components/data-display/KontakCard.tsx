
import { Kontak, KontakStatus } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateToIndonesian } from "@/lib/date-utils";
import { Phone, Mail, Home, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface KontakCardProps {
  kontak: Kontak;
  onClick?: () => void;
}

const statusStyle = (status: KontakStatus) => {
  switch (status) {
    case "Prospek":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    case "Aktif":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "Tidak Aktif":
      return "bg-red-100 text-red-800 hover:bg-red-200";
    case "Perlu Tindak Lanjut":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

const KontakCard = ({ kontak, onClick }: KontakCardProps) => {
  return (
    <Card 
      className="h-full transition-all hover:shadow-md cursor-pointer" 
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-lg">{kontak.nama}</h3>
          <Badge variant="outline" className={statusStyle(kontak.status)}>
            {kontak.status}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground mt-1">
          {kontak.jenisKontak}
        </p>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm">
            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{kontak.telepon}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{kontak.email}</span>
          </div>
          
          <div className="flex items-start text-sm">
            <Home className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
            <span className="line-clamp-2">{kontak.alamat}</span>
          </div>
          
          {kontak.tanggalBergabung && (
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Bergabung: {formatDateToIndonesian(new Date(kontak.tanggalBergabung))}</span>
            </div>
          )}
        </div>
        
        {kontak.catatan && (
          <div className="mt-4 p-2 bg-muted rounded-sm">
            <p className="text-xs">{kontak.catatan}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KontakCard;
