import {defineStore} from "pinia";
import {ref} from "vue";
import supabaseClient from "@/lib/supabaseClient";

export const useJournalStore = defineStore("journal", () => {
    const journals = ref([]);
    const error = ref(null);

    const handleError = (err) => {
        error.value = err.message;
    };


    /**
     * Fetches all journals from the server.
     * @returns {Promise<void>}
     * @throws {Error}
     */
    const fetchJournals = async () => {
        try {
            const {data, error: fetchError} = await supabaseClient
                .from("journals")
                .select("*");
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
     * Creates a new journal.
     * @param title
     * @param content
     * @param user_id
     * @returns {Promise<void>}
     * @throws {Error}
     */
    const createJournal = async (title, content, user_id) => {
        try {
            const {data, error: createError} = await supabaseClient
                .from("journals")
                .insert([{title, content, user_id}]);
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
     * Updates a journal.
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
                .eq("id", id);
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
     * Deletes a journal.
     * @param id
     * @returns {Promise<void>}
     * @throws {Error}
     */
    const deleteJournal = async (id) => {
        try {
            const {error: deleteError} = await supabaseClient
                .from("journals")
                .delete()
                .eq("id", id);

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
