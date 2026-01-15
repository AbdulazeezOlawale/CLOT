// import { create } from "zustand";

// type userState = {
//     email: string | null;
//     uid: string | null;
// }

// type AuthState = {
//   user: userState | null;
//   logout: () => void;
//   setUser: (user: userState) => void;
// };

// export const useAuthStore = create<AuthState>((Set) => ({
//     user: {email: null, uid: null},
//     logout: () => Set({user: null}),
//     setUser: (user) => Set({user})
// }));
