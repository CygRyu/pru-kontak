
import { createContext, useContext, useState, ReactNode } from "react";
import { Kontak, Aktivitas, FilterOptions, demoKontak, demoAktivitas } from "@/types";
import { useToast } from "@/components/ui/use-toast";

interface KontakContextType {
  kontakList: Kontak[];
  aktivitasList: Aktivitas[];
  addKontak: (kontak: Omit<Kontak, "id" | "tanggalModifikasi" | "tanggalDibuat">) => void;
  updateKontak: (id: string, updatedData: Partial<Kontak>) => void;
  deleteKontak: (id: string) => void;
  addAktivitas: (aktivitas: Omit<Aktivitas, "id">) => void;
  updateAktivitas: (id: string, updatedData: Partial<Aktivitas>) => void;
  deleteAktivitas: (id: string) => void;
  getKontakById: (id: string) => Kontak | undefined;
  getAktivitasByKontakId: (kontakId: string) => Aktivitas[];
  filterOptions: FilterOptions;
  setFilterOptions: (options: FilterOptions) => void;
}

const KontakContext = createContext<KontakContextType | undefined>(undefined);

export const KontakProvider = ({ children }: { children: ReactNode }) => {
  const [kontakList, setKontakList] = useState<Kontak[]>(demoKontak);
  const [aktivitasList, setAktivitasList] = useState<Aktivitas[]>(demoAktivitas);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});
  const { toast } = useToast();

  const addKontak = (kontak: Omit<Kontak, "id" | "tanggalModifikasi" | "tanggalDibuat">) => {
    const newKontak: Kontak = {
      ...kontak,
      id: crypto.randomUUID(),
      tanggalModifikasi: new Date(),
      tanggalDibuat: new Date(),
    };
    setKontakList([...kontakList, newKontak]);
    toast({
      title: "Kontak ditambahkan",
      description: `${kontak.nama} berhasil ditambahkan ke daftar.`,
    });
  };

  const updateKontak = (id: string, updatedData: Partial<Kontak>) => {
    setKontakList(
      kontakList.map((kontak) =>
        kontak.id === id
          ? { ...kontak, ...updatedData, tanggalModifikasi: new Date() }
          : kontak
      )
    );
    toast({
      title: "Kontak diperbarui",
      description: "Informasi kontak berhasil diperbarui.",
    });
  };

  const deleteKontak = (id: string) => {
    const kontakToDelete = kontakList.find(k => k.id === id);
    if (kontakToDelete) {
      setKontakList(kontakList.filter((kontak) => kontak.id !== id));
      // Juga hapus semua aktivitas terkait
      setAktivitasList(aktivitasList.filter((aktivitas) => aktivitas.kontakId !== id));
      toast({
        title: "Kontak dihapus",
        description: `${kontakToDelete.nama} berhasil dihapus dari daftar.`,
        variant: "destructive",
      });
    }
  };

  const addAktivitas = (aktivitas: Omit<Aktivitas, "id">) => {
    const newAktivitas: Aktivitas = {
      ...aktivitas,
      id: crypto.randomUUID(),
    };
    setAktivitasList([...aktivitasList, newAktivitas]);
    toast({
      title: "Aktivitas ditambahkan",
      description: "Aktivitas baru berhasil dicatat.",
    });
  };

  const updateAktivitas = (id: string, updatedData: Partial<Aktivitas>) => {
    setAktivitasList(
      aktivitasList.map((aktivitas) =>
        aktivitas.id === id
          ? { ...aktivitas, ...updatedData }
          : aktivitas
      )
    );
    toast({
      title: "Aktivitas diperbarui",
      description: "Informasi aktivitas berhasil diperbarui.",
    });
  };

  const deleteAktivitas = (id: string) => {
    setAktivitasList(aktivitasList.filter((aktivitas) => aktivitas.id !== id));
    toast({
      title: "Aktivitas dihapus",
      description: "Aktivitas berhasil dihapus dari daftar.",
      variant: "destructive",
    });
  };

  const getKontakById = (id: string) => {
    return kontakList.find((kontak) => kontak.id === id);
  };

  const getAktivitasByKontakId = (kontakId: string) => {
    return aktivitasList.filter((aktivitas) => aktivitas.kontakId === kontakId);
  };

  return (
    <KontakContext.Provider
      value={{
        kontakList,
        aktivitasList,
        addKontak,
        updateKontak,
        deleteKontak,
        addAktivitas,
        updateAktivitas,
        deleteAktivitas,
        getKontakById,
        getAktivitasByKontakId,
        filterOptions,
        setFilterOptions,
      }}
    >
      {children}
    </KontakContext.Provider>
  );
};

export const useKontak = () => {
  const context = useContext(KontakContext);
  if (context === undefined) {
    throw new Error("useKontak must be used within a KontakProvider");
  }
  return context;
};
