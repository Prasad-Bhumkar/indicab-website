import { createContext, useContext, useReducer } from 'react'

export interface BookingState {
  id?: string
  pickup: string
  destination: string
  startDate: Date
  endDate: Date
  vehicleType: string
  fare?: number
}

type BookingAction = 
  | { type: 'SET_BOOKING'; payload: Partial<BookingState> }
  | { type: 'RESET_BOOKING' }

const initialState: BookingState = {
  pickup: '',
  destination: '',
  startDate: new Date(),
  endDate: new Date(),
  vehicleType: '',
  fare: 0
}

const reducer = (state: BookingState, action: BookingAction): BookingState => {
  switch (action.type) {
    case 'SET_BOOKING':
      return { ...state, ...action.payload }
    case 'RESET_BOOKING':
      return initialState
    default:
      return state
  }
}

export const BookingContext = createContext<{
  state: BookingState
  dispatch: React.Dispatch<BookingAction>
}>({
  state: initialState,
  dispatch: () => null
})

export const BookingProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  )
}

export const useBookingContext = () => useContext(BookingContext)