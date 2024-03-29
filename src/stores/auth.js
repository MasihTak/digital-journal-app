import {defineStore} from "pinia";
import {ref, computed} from "vue";
import supabaseClient from "@/lib/supabaseClient";

export const useAuthStore = defineStore("auth", () => {
        const user = ref(null);
        const session = ref(null)
        const error = ref(null);

        const handleError = (err) => {
            error.value = err.message;
        };

        const setUser = (userData) => {
            user.value = userData;
        };

        const isAuthenticated = computed(() => session.value !== null)

        /**
         * Returns the current user.
         * @returns object
         */
        const getUser = () => {
            return user.value
        };

        /**
         * Signs up a new user.
         * @param email
         * @param password
         * @param name
         * @param family
         * @returns {Promise<void>}
         * @throws {Error}
         */
        const signUp = async (email, password, name, family) => {
            try {
                const {data, error: signUpError} = await supabaseClient.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {name, family},
                    },
                });

                if (signUpError) {
                    handleError(signUpError);
                } else {
                    setUser(data.user);
                    session.value = data.session
                }
            } catch (err) {
                handleError(err);
            }
        };

        /**
         * Signs in an existing user.
         * @param email
         * @param password
         * @returns {Promise<void>}
         * @throws {Error}
         */
        const signIn = async (email, password) => {
            try {
                const {data, error: signInError} = await supabaseClient.auth.signInWithPassword({
                    email,
                    password,
                });

                if (signInError) {
                    handleError(signInError);
                } else {
                    setUser(data.user);
                    session.value = data.session
                }
            } catch (err) {
                handleError(err);
            }
        };

        /**
         * Signs out the current user.
         * @returns {Promise<void>}
         * @throws {Error}
         */
        const signOut = async () => {
            try {
                await supabaseClient.auth.signOut();
                setUser(null);
                session.value = null;
            } catch (err) {
                handleError(err);
            }
        };

        return {
            user,
            session,
            error,
            isAuthenticated,
            getUser,
            signUp,
            signIn,
            signOut,
        };
    },
    {
        persist: {
            storage: sessionStorage,
            paths: ['user', 'session'],
        }
    }
);
