import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { Ttable } from '../Type'

// const { persistAtom } = recoilPersist()

export const ContentData = atom<Ttable[]>({
  key: 'ContentData',
  default: [],
  // effects_UNSTABLE: [persistAtom],
})

export const orderData = atom<Ttable[]>({
  key: 'orderData',
  default: [],
  // effects_UNSTABLE: [persistAtom],
})

export const filterNameData = atom<Ttable[]>({
  key: 'filterNameData',
  default: [],
  // effects_UNSTABLE: [persistAtom],
})
