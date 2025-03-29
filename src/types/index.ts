
export type KontakStatus = 'Prospek' | 'Aktif' | 'Tidak Aktif' | 'Perlu Tindak Lanjut';

export type JenisKontak = 'Nasabah' | 'Agen';

export interface Kontak {
  id: string;
  nama: string;
  jenisKontak: JenisKontak;
  telepon: string;
  email: string;
  alamat: string;
  status: KontakStatus;
  tanggalLahir?: string;
  tanggalBergabung?: string;
  catatan?: string;
  polisTerkait?: string[];
  aktivitasTerakhir?: Aktivitas[];
  tanggalModifikasi: Date;
  tanggalDibuat: Date;
}

export interface Aktivitas {
  id: string;
  kontakId: string;
  tipe: 'Telepon' | 'Email' | 'Kunjungan' | 'Janji Temu' | 'Lainnya';
  tanggal: Date;
  deskripsi: string;
  hasilTindakan?: string;
  tindakLanjut?: boolean;
  tanggalTindakLanjut?: Date;
}

export interface FilterOptions {
  jenisKontak?: JenisKontak;
  status?: KontakStatus;
  pencarian?: string;
}

// Demo data for initial state
export const demoKontak: Kontak[] = [
  {
    id: '1',
    nama: 'Budi Santoso',
    jenisKontak: 'Nasabah',
    telepon: '081234567890',
    email: 'budi.santoso@email.com',
    alamat: 'Jl. Jendral Sudirman No. 123, Jakarta',
    status: 'Aktif',
    tanggalLahir: '1980-05-15',
    tanggalBergabung: '2021-03-10',
    catatan: 'Nasabah yang loyal, memiliki beberapa polis asuransi',
    polisTerkait: ['Asuransi Jiwa', 'Asuransi Kesehatan'],
    tanggalModifikasi: new Date('2023-10-15'),
    tanggalDibuat: new Date('2021-03-10'),
  },
  {
    id: '2',
    nama: 'Siti Rahayu',
    jenisKontak: 'Nasabah',
    telepon: '081345678901',
    email: 'siti.rahayu@email.com',
    alamat: 'Jl. Gatot Subroto No. 45, Jakarta',
    status: 'Prospek',
    catatan: 'Tertarik dengan produk asuransi pendidikan',
    tanggalModifikasi: new Date('2023-11-05'),
    tanggalDibuat: new Date('2023-11-01'),
  },
  {
    id: '3',
    nama: 'Ahmad Hidayat',
    jenisKontak: 'Agen',
    telepon: '081456789012',
    email: 'ahmad.hidayat@asuransi.com',
    alamat: 'Jl. Pahlawan No. 78, Bandung',
    status: 'Aktif',
    tanggalBergabung: '2020-01-15',
    catatan: 'Agen berprestasi dengan pencapaian target yang konsisten',
    tanggalModifikasi: new Date('2023-09-20'),
    tanggalDibuat: new Date('2020-01-15'),
  },
  {
    id: '4',
    nama: 'Maya Indriani',
    jenisKontak: 'Nasabah',
    telepon: '081567890123',
    email: 'maya.indriani@email.com',
    alamat: 'Jl. Ahmad Yani No. 56, Surabaya',
    status: 'Tidak Aktif',
    tanggalLahir: '1975-08-22',
    tanggalBergabung: '2019-05-20',
    catatan: 'Polis tidak diperpanjang pada periode lalu',
    polisTerkait: ['Asuransi Kendaraan'],
    tanggalModifikasi: new Date('2023-06-10'),
    tanggalDibuat: new Date('2019-05-20'),
  },
  {
    id: '5',
    nama: 'Rudi Hartono',
    jenisKontak: 'Agen',
    telepon: '081678901234',
    email: 'rudi.hartono@asuransi.com',
    alamat: 'Jl. Diponegoro No. 89, Yogyakarta',
    status: 'Prospek',
    catatan: 'Kandidat agen dengan pengalaman di bidang finansial',
    tanggalModifikasi: new Date('2023-11-10'),
    tanggalDibuat: new Date('2023-11-10'),
  },
  {
    id: '6',
    nama: 'Dewi Lestari',
    jenisKontak: 'Nasabah',
    telepon: '081789012345',
    email: 'dewi.lestari@email.com',
    alamat: 'Jl. Imam Bonjol No. 34, Semarang',
    status: 'Perlu Tindak Lanjut',
    tanggalLahir: '1990-12-03',
    tanggalBergabung: '2022-07-15',
    catatan: 'Menanyakan tentang perluasan manfaat polis',
    polisTerkait: ['Asuransi Jiwa'],
    tanggalModifikasi: new Date('2023-11-12'),
    tanggalDibuat: new Date('2022-07-15'),
  },
];

export const demoAktivitas: Aktivitas[] = [
  {
    id: '1',
    kontakId: '1',
    tipe: 'Telepon',
    tanggal: new Date('2023-11-10'),
    deskripsi: 'Mengingatkan tentang pembayaran premi',
    hasilTindakan: 'Nasabah akan membayar dalam 2 hari',
  },
  {
    id: '2',
    kontakId: '2',
    tipe: 'Kunjungan',
    tanggal: new Date('2023-11-08'),
    deskripsi: 'Presentasi produk asuransi pendidikan',
    hasilTindakan: 'Prospek tertarik, akan pertimbangkan',
    tindakLanjut: true,
    tanggalTindakLanjut: new Date('2023-11-15'),
  },
  {
    id: '3',
    kontakId: '3',
    tipe: 'Janji Temu',
    tanggal: new Date('2023-11-12'),
    deskripsi: 'Diskusi pencapaian target bulanan',
    hasilTindakan: 'Menentukan strategi untuk mencapai target',
  },
  {
    id: '4',
    kontakId: '6',
    tipe: 'Email',
    tanggal: new Date('2023-11-09'),
    deskripsi: 'Informasi tentang perluasan manfaat polis',
    tindakLanjut: true,
    tanggalTindakLanjut: new Date('2023-11-16'),
  },
];
