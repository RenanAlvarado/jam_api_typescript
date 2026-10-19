interface GenerateMapsUrlParams {
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
}

// Gerar URL de pesquisa no Google Maps
const generateMapsUrl = ({
  street,
  number,
  district,
  city,
  state,
}: GenerateMapsUrlParams): string => {
  const query = [street, number, district, city, state]
    .filter(Boolean)
    .join(", ");

  const mapsUrl = new URL("https://www.google.com/maps/search/");

  mapsUrl.searchParams.set("api", "1");
  mapsUrl.searchParams.set("query", query);

  return mapsUrl.toString();
};

export default generateMapsUrl;
