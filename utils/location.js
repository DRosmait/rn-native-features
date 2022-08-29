const api_key = process.env.GOOGLE_API_KEY;

export function getMapPreview({ lat, lng }) {
  const url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${api_key}`;
  return url;
}

export async function getAddress({ lat, lng }) {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${api_key}`
  );

  if (!res.ok) throw new Error("Faild to fetch address");

  const data = await res.json();
  const address = data.results[0].formatted_address;

  return address;
}
