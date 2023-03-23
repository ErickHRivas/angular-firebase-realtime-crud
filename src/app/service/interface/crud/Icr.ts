import Icreate from './Icreate'
import Iread from './Iread'

export default interface Icr<T> extends Icreate<T>, Iread<T> {}
