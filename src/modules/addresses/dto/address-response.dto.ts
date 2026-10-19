export interface AddressResponseDTO {
  id: number;
  place_name: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  zip_code: string;
  complement: string | null;
  maps_url: string;
}
