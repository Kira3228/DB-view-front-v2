export const formatDate = (date: string): string => {
  if (!date) {
    return ''
  }
  return date.split(`T`)[0]
}