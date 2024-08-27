"use client";

import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState
} from "react";
import { useRouter } from "next/navigation";
import type { JWTPayload } from "jose";

import { deleteSession } from "@/lib/session";

type AuthContextType = {
    isAuth: boolean;
    setIsAuth: Dispatch<SetStateAction<boolean>>;
    logout: () => void;
};
type Props = {
    session: JWTPayload | null | undefined;
};

export const AuthContext = createContext<AuthContextType>({
    isAuth: false,
    setIsAuth: () => {},
    logout: () => {}
});

export default function AuthProvider({
    session,
    children
}: Props & {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isAuth, setIsAuth] = useState<boolean>(!!session);

    useEffect(() => {
        setIsAuth(!!session);
    }, [session]);

    const logout = async () => {
        await deleteSession();
        setIsAuth(prev => false);
        router.push("/auth");
    };

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);