import { StoreApi, create } from 'zustand'
import { AppState, setAppState, getAppState } from './type'
import { createFooSlice } from './slices/foo-slice'

export const useAppStore = create<AppState>()((set: setAppState, get: getAppState, api: StoreApi<AppState>) => ({
  ...createFooSlice(set, get, api)
}))
