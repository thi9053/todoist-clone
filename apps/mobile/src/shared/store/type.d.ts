import { StoreApi } from 'zustand'
import { FooSlice } from './slices/foo-slice'

export type AppState = {} & FooSlice

export type setAppState = StoreApi<AppState>['setState']
export type getAppState = StoreApi<AppState>['getState']
