import { useMemo } from 'react'
import { createStore } from 'redux'

let store

export const initialState = {
  cart: [],
}

const removeAtIndex = (arr, index) => arr.filter((val, i) => i != index)

function reducer(state = {}, action) {
  switch (action.type) {
    case 'payment-success':
      return {
        ...state,
        payment: action.payload
      }
    case 'add-to-cart':
      return {
        ...state,
        cart: [
          ...state.cart,
          action.payload,
        ]
      }
    case 'remove-from-cart':
      return {
        ...state,
        cart: removeAtIndex(state.cart, action.payload)
      }
    case 'clear-cart':
      return {
        ...state,
        cart: []
      }
    case 'request-made':
      return {
        ...state,
        loading: true
      }
    case 'request-resolved':
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState,
  )
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}