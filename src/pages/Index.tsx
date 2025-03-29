
import MainLayout from "@/components/layout/MainLayout";
import { useKontak } from "@/context/KontakContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import KontakList from "@/components/data-display/KontakList";
import KontakFilter from "@/components/filters/KontakFilter";
import { useState } from "react";
import { FilterOptions } from "@/types";
import { PlusCircle, UserPlus, Phone, Clipboard, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { kontakList, aktivitasList, filterOptions, setFilterOptions } = useKontak();
  const [localFilter, setLocalFilter] = useState<FilterOptions>({});

  // Calculate statistics
  const totalNasabah = kontakList.filter((k) => k.jenisKontak === "Nasabah").length;
  const totalAgen = kontakList.filter((k) => k.jenisKontak === "Agen").length;
  const totalProspek = kontakList.filter((k) => k.status === "Prospek").length;
  const recentActivities = [...aktivitasList].sort(
    (a, b) => b.tanggal.getTime() - a.tanggal.getTime()
  ).slice(0, 5);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setLocalFilter(newFilters);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold">Dasbor</h1>
          <div className="flex gap-2">
            <Button asChild>
              <Link to="/nasabah/tambah">
                <PlusCircle className="mr-2 h-4 w-4" />
                Tambah Nasabah
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/agen/tambah">
                <UserPlus className="mr-2 h-4 w-4" />
                Tambah Agen
              </Link>
            </Button>
          </div>
        </div>

        {/* Statistics cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Kontak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kontakList.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Dari semua kategori
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Nasabah
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalNasabah}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Prospek dan nasabah aktif
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Agen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAgen}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Prospek dan agen aktif
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Prospek Baru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProspek}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Menunggu tindak lanjut
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Contacts */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Kontak Terbaru</CardTitle>
                <CardDescription>
                  Daftar kontak yang baru ditambahkan atau diperbarui
                </CardDescription>
              </CardHeader>
              <CardContent>
                <KontakFilter
                  onFilterChange={handleFilterChange}
                  initialFilter={filterOptions}
                />
                <div className="mt-4">
                  <KontakList
                    kontakList={[...kontakList].sort(
                      (a, b) =>
                        b.tanggalModifikasi.getTime() - a.tanggalModifikasi.getTime()
                    ).slice(0, 6)}
                    filterOptions={localFilter}
                  />
                </div>
                <div className="mt-4 text-center">
                  <Button asChild variant="outline">
                    <Link to="/nasabah">Lihat Semua Kontak</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Aktivitas Terbaru</CardTitle>
                <CardDescription>
                  Aktivitas dan interaksi terbaru dengan kontak
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.length > 0 ? (
                    recentActivities.map((aktivitas) => {
                      const kontak = kontakList.find(
                        (k) => k.id === aktivitas.kontakId
                      );
                      return (
                        <div
                          key={aktivitas.id}
                          className="flex items-start p-3 rounded-md bg-muted/50"
                        >
                          <div className="mr-3 mt-0.5">
                            {aktivitas.tipe === "Telepon" ? (
                              <Phone className="h-5 w-5 text-insurance-500" />
                            ) : aktivitas.tipe === "Janji Temu" ? (
                              <Clock className="h-5 w-5 text-insurance-500" />
                            ) : (
                              <Clipboard className="h-5 w-5 text-insurance-500" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-sm">
                              {aktivitas.tipe} - {kontak?.nama}
                            </div>
                            <p className="line-clamp-2 text-xs text-muted-foreground">
                              {aktivitas.deskripsi}
                            </p>
                            <div className="text-xs text-muted-foreground mt-1">
                              {new Date(aktivitas.tanggal).toLocaleDateString("id-ID")}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center text-muted-foreground py-6">
                      Belum ada aktivitas terbaru
                    </div>
                  )}
                </div>
                <div className="mt-4 text-center">
                  <Button asChild variant="outline">
                    <Link to="/aktivitas">Lihat Semua Aktivitas</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
