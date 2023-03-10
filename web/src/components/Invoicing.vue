<template>
    <b-container>
        <h1>Invoicing</h1>
    </b-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'invoicingPage',
    computed: {
        ...mapState(['currentUser', 'invoice'])
    },
    data() {
        return {
            invoiceSearchData: {
                id: null,
                start: null,
                end: null
            }
        }
    },
    methods: {
        // createInvoice() {
        //     this.$store.dispatch('loadInvoiceData', invoiceSearchData)
        // }
    },
    async mounted() {
        this.$store.dispatch('loadUsers');
    }
}
</script>

<style>
</style>