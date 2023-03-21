import { atom } from 'recoil'
import { Ttable } from '../Type'

export const ContentData = atom<Ttable[]>({
  key: 'ContentData',
  default: [],
})

export const productData = atom<Ttable[]>({
  key: 'productData',
  default: [],
})

export const NameData = atom<string>({
  key: 'NameData',
  default: '',
})
