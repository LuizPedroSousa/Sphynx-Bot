export const assignDefinedObjectValues = (...invalidObject: any) => {
  const result: any = {};
  for (const source of invalidObject) {
    // if object has empty value, then return an empty object
    if (source) {
      for (const key of Object.keys(source)) {
        const value = source[key];
        if (value) {
          result[key] = value;
        }
      }
    }
  }

  return result;
};
