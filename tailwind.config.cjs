/** @type {import('tailwindcss').Config}
 *  */
module.exports = {
     darkMode: 'dark',
     content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}",],
     theme: {
      extend: { 
         screens: {
             'sm': '640px',
             // => @media (min-width: 640px) { ... }
         }          
        }
    },
    plugins: [],
}

