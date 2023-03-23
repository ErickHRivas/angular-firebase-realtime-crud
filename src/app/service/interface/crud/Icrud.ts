import Icreate from './Icreate'
import Idelete from './Idelete'
import Iread from './Iread'
import Iupdate from './Iupdate'

export default interface Icrud<T> extends Icreate<T>, Iread<T>, Idelete, Iupdate<T> {}
