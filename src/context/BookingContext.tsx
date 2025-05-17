import { createContext, useContext, useReducer } from 'react'

export interface BookingState {
    id: string
    pickupLocation: string
    dropLocation: string
    pickupDate: string
    returnDate?: string
    vehicleType: string
    fare: number
    customerId: string
    status: 'pending' | 'confirmed' | 'cancelled'
}

type BookingAction =
    | { type: 'SET_BOOKING'; payload: Partial<BookingState> }
    | { type: 'RESET_BOOKING' }

const initialState: BookingState = {
    id: '',
    pickupLocation: '',
    dropLocation: '',
    pickupDate: '',
    returnDate: undefined,
    vehicleType: '',
    fare: 0,
    customerId: '',
    status: 'pending'
}

const _reducer = (state: BookingState, action: BookingAction): BookingState => {
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

export const BookingProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const [state, dispatch] = useReducer(_reducer, initialState)

    return (
        <BookingContext.Provider value={{ state, dispatch }}>
            {children}
        </BookingContext.Provider>
    )
}

export const useBookingContext = () => useContext(BookingContext)
