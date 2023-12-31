import {defineStore} from "pinia";
import {ref} from "vue";
import supabaseClient from "@/lib/supabaseClient";

export const useAuthStore = defineStore("auth", () => {
    const user = ref(null);
    const error = ref(null);

    const handleError = (err) => {
        error.value = err.message;
    };

    const getUser = async () => {
        try {
            user.value = await supabaseClient.auth.getUser();
        } catch (err) {
            handleError(err);
        }
    };

    const signUp = async (email, password, name, family) => {
        const {error} = await supabaseClient.auth.signUp(
            {
                email, password,
                options: {
                    data: {
                        name,
                        family
                    }
                }
            },
        );

        if (error) {
            handleError(error);
        }
    };

    const signIn = async (email, password) => {
        const {data, error} = await supabaseClient.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            handleError(error);
        } else {
            user.value = data;
        }
    };

    const signOut = async () => {
        try {
            await supabaseClient.auth.signOut();
            user.value = null;
        } catch (err) {
            handleError(err);
        }
    };

    return {
        user,
        error,
        getUser,
        signUp,
        signIn,
        signOut,
    };
});
