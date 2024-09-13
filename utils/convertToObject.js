export function convertToSerializableObject(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (typeof obj.toJSON === "function") {
    return obj.toJSON();
  }

  const serialized = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object" && value !== null) {
      serialized[key] = convertToSerializableObject(value);
    } else {
      serialized[key] = value;
    }
  }
  return serialized;
}
