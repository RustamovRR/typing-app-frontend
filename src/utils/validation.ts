export const clearObject = (object: object) => {
  return Object.fromEntries(
    Object.entries(object).filter(([_, value]) => {
      return (
        value !== '' &&
        value !== null &&
        value !== undefined &&
        !(Array.isArray(value) && value.every((item) => item === null))
      )
    }),
  )
}
