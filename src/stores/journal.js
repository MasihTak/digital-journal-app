import {defineStore} from "pinia";
import {ref} from "vue";
import {useAuthStore} from "@/stores/auth";
import supabaseClient from "@/lib/supabaseClient";

export const useJournalStore = defineStore("journal", () => {
    const journals = ref([]);
    const error = ref(null);
    const userId = useAuthStore().getUser().id;

    const handleError = (err) => {
        error.value = err.message;
    };

    /**
     * Fetches all journals for the current user from the server.
     * @returns {Promise<void>}
     * @throws {Error}
     */
    const fetchJournals = async () => {
        try {
            const {data, error: fetchError} = await supabaseClient
                .from("journals")
                .select("*")
                .eq("user_id", userId);

            if (fetchError) {
                handleError(fetchError);
            } else {
                journals.value = data;
            }
        } catch (err) {
            handleError(err);
        }
    };

    /**
     * Creates a new journal for the current user.
     * @param title
     * @param content
     * @returns {Promise<void>}
     * @throws {Error}
     */
    const createJournal = async (title, content) => {
        try {
            const {data, error: createError} = await supabaseClient
                .from("journals")
                .insert([{title, content, user_id: userId}]);

            if (createError) {
                handleError(createError);
            } else {
                journals.value.push(data[0]);
            }
        } catch (err) {
            handleError(err);
        }
    };

    /**
     * Updates a journal for the current user.
     * @param id
     * @param title
     * @param content
     * @returns {Promise<void>}
     * @throws {Error}
     */
    const updateJournal = async (id, title, content) => {
        try {
            const {data, error: updateError} = await supabaseClient
                .from("journals")
                .update({title, content})
                .eq("id", id)
                .eq("user_id", userId);

            if (updateError) {
                handleError(updateError);
            } else {
                const index = journals.value.findIndex((journal) => journal.id === id);
                journals.value[index] = data[0];
            }
        } catch (err) {
            handleError(err);
        }
    };

    /**
     * Deletes a journal for the current user.
     * @param id
     * @returns {Promise<void>}
     * @throws {Error}
     */
    const deleteJournal = async (id) => {
        try {
            const {error: deleteError} = await supabaseClient
                .from("journals")
                .delete()
                .eq("id", id)
                .eq("user_id", userId);

            if (deleteError) {
                handleError(deleteError);
            } else {
                journals.value = journals.value.filter((journal) => journal.id !== id);
            }
        } catch (err) {
            handleError(err);
        }
    };

    return {
        journals,
        error,
        fetchJournals,
        createJournal,
        updateJournal,
        deleteJournal,
    };
});
