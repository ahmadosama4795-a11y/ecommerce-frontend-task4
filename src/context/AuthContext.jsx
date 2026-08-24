import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const AuthContext = createContext(null);

const USERS_STORAGE_KEY = "ecommerce_users";
const CURRENT_USER_KEY = "ecommerce_current_user";

const DEFAULT_USERS = [
    {
        id: 1,
        fullName: "Demo Customer",
        email: "customer@example.com",
        password: "Customer123!",
        phone: "0790000000",
        role: "customer",
    },
    {
        id: 2,
        fullName: "Demo Admin",
        email: "admin@example.com",
        password: "Admin123!",
        phone: "0791111111",
        role: "admin",
    },
];

export function AuthProvider({ children }) {
    const [users, setUsers] = useState(() => {
        try {
            const savedUsers = localStorage.getItem(
                USERS_STORAGE_KEY
            );

            if (savedUsers) {
                return JSON.parse(savedUsers);
            }

            localStorage.setItem(
                USERS_STORAGE_KEY,
                JSON.stringify(DEFAULT_USERS)
            );

            return DEFAULT_USERS;
        } catch {
            return DEFAULT_USERS;
        }
    });

    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem(
            CURRENT_USER_KEY
        );

        if (savedUser) {
            try {
                setCurrentUser(JSON.parse(savedUser));
            } catch {
                localStorage.removeItem(CURRENT_USER_KEY);
            }
        }

        setLoading(false);
    }, []);

    useEffect(() => {
        localStorage.setItem(
            USERS_STORAGE_KEY,
            JSON.stringify(users)
        );
    }, [users]);

    const login = async (email, password) => {
        const user = users.find(
            (item) =>
                item.email.toLowerCase() ===
                email.trim().toLowerCase() &&
                item.password === password
        );

        if (!user) {
            return {
                success: false,
                message: "Invalid email or password.",
            };
        }

        const safeUser = { ...user };
        delete safeUser.password;

        setCurrentUser(safeUser);

        localStorage.setItem(
            CURRENT_USER_KEY,
            JSON.stringify(safeUser)
        );

        return {
            success: true,
            user: safeUser,
        };
    };

    const register = async ({
        fullName,
        email,
        password,
        phone,
    }) => {
        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = users.find(
            (item) =>
                item.email.toLowerCase() === normalizedEmail
        );

        if (existingUser) {
            return {
                success: false,
                message: "An account with this email already exists.",
            };
        }

        const newUser = {
            id: Date.now(),
            fullName: fullName.trim(),
            email: normalizedEmail,
            password,
            phone: phone.trim(),
            role: "customer",
        };

        setUsers((currentUsers) => [
            ...currentUsers,
            newUser,
        ]);

        return {
            success: true,
            user: {
                id: newUser.id,
                fullName: newUser.fullName,
                email: newUser.email,
                phone: newUser.phone,
                role: newUser.role,
            },
        };
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem(CURRENT_USER_KEY);
    };

    const updateProfile = (updates) => {
        if (!currentUser) {
            return;
        }

        const updatedUser = {
            ...currentUser,
            ...updates,
        };

        setCurrentUser(updatedUser);

        localStorage.setItem(
            CURRENT_USER_KEY,
            JSON.stringify(updatedUser)
        );

        setUsers((currentUsers) =>
            currentUsers.map((user) =>
                user.id === currentUser.id
                    ? {
                        ...user,
                        ...updates,
                    }
                    : user
            )
        );
    };

    const changePassword = (currentPassword, newPassword) => {
        const account = users.find((user) => user.id === currentUser?.id);
        if (!account || account.password !== currentPassword) {
            return { success: false, message: "Current password is incorrect." };
        }
        if (newPassword.length < 8) {
            return { success: false, message: "New password must be at least 8 characters." };
        }
        setUsers((items) => items.map((user) => user.id === account.id ? { ...user, password: newPassword } : user));
        return { success: true, message: "Password updated successfully." };
    };

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                loading,
                users,
                login,
                register,
                logout,
                updateProfile,
                changePassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
