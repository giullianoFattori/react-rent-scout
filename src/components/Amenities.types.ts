export type AmenityCategory = {
  id: string;
  name: string;
  items: { key: string; label: string; available: boolean }[];
};

export type Policies = {
  checkin: string;
  checkout: string;
  smoking: boolean;
  parties: boolean;
  quietHours?: string;
  pets: 'permitidos' | 'sob consulta' | 'não permitidos';
  cancelation: string;
};
