
import { KontakStatus } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: KontakStatus;
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusStyle = (status: KontakStatus) => {
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

  return (
    <Badge 
      variant="outline" 
      className={cn(getStatusStyle(status), className)}
    >
      {status}
    </Badge>
  );
};

export default StatusBadge;
