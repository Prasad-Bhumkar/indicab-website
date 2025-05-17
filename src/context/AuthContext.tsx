import { createContext, useContext, useState, useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

type AuthContextType = {
    user: {
        id: string
        email?: string
        name?: string
        image?: string
    } | null
    status: 'loading' | 'authenticated' | 'unauthenticated'
    signIn: () => Promise<void>
    signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    status: 'unauthenticated',
    signIn: async () => { },
    signOut: async () => { }
})

export function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
    const { data: session, status } = useSession()
    const [user, setUser] = useState<AuthContextType['user']>(null)

    useEffect(() => {
        if (status === 'authenticated' && session?.user) {
            setUser({
                id: session.user.id,
                name: session.user.name || undefined,
                email: session.user.email || undefined,
                image: session.user.image || undefined
            })
        } else {
            setUser(null)
        }
    }, [status, session])

    const _handleSignIn = async () => {
        await signIn('google')
    }

    const _handleSignOut = async () => {
        await signOut({ redirect: false })
    }

    return (
        <AuthContext.Provider value={{
            user,
            status,
            signIn: _handleSignIn,
            signOut: _handleSignOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)
