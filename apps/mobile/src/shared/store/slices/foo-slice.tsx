import { StateCreator } from 'zustand'
import type { AppState, setAppState } from '../type'

export type FooSlice = {
  text: string
  setText: (text: string) => void
  count: number
  setCount: (count: number) => void
}

export const createFooSlice: StateCreator<FooSlice> = (set: setAppState) => ({
  text: '',
  setText: (text: string) => {
    set({ text })
  },
  count: 0,
  setCount: (count: number) => {
    set({ count })
  }
})

export const fooSelectors = (state: AppState) => ({
  text: state.text,
  setText: state.setText,
  count: state.count,
  setCount: state.setCount
})
