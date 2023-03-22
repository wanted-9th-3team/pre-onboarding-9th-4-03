import { atom, selector } from 'recoil'
import { IData } from './Type'

export const allFetchedDataAtom = atom<IData[]>({
  key: 'allFetchedData',
  default: [],
})
export const todayDataSelector = selector({
  key: 'todayDataSelector',
  get: ({ get }) => {
    const fetchedData = get(allFetchedDataAtom)
    const today = fetchedData.filter(el => {
      if (el.transaction_time.includes('2023-03-08')) {
        return true
      }
      return false
    })
    return today
  },
})

export const tableSettingsAtom = atom({
  key: 'tableSettings',
  default: { searched: '', sortOption: '', statusFilter: false },
})
