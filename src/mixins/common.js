export default {
    methods: {
        keyPressAlphaNumeric(event) {
            var inp = String.fromCharCode(event.keyCode);
            if (event.keyCode != 13) {
                if (/[a-zA-Z0-9]/.test(inp)) {
                    return true;
                } else {
                    event.preventDefault();
                    return false;
                }
            }
        },
        formatDate(date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
        
            let hours = date.getHours();
            const ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // Handle midnight
            const minutes = String(date.getMinutes()).padStart(2, '0');
        
            return `${day}/${month}/${year}, ${hours}:${minutes} ${ampm}`;
        }
    },
}