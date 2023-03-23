export default interface Iupdate<T> {
  updateData: (data: T, key: string) => void
}
