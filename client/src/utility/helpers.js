export const staticMap = ([lng, lat]) =>
  `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=800x150&key=${"AIzaSyAddwFzEu83xzv_3kQjwLOrK3d35bmiOKg"}&markers=${lat},${lng}&scale=2`;
