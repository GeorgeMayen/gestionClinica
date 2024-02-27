/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      margin: {
        '25': '25px',  
        '50': '50px', 
        '100': '100px',
        '140': '140px',  
        '150': '150px',  
        '200': '200px',
        '225': '225px',  
        '250': '250px', 
        '300': '300px', 
        '400': '400px', 
        '500': '500px', 
      },
      padding:{
        '25': '25px',  
        '50': '50px', 
        '100': '100px',
        '140': '140px',  
        '150': '150px',  
        '200': '200px',
      },
      width: {
        '25': '25px',  
        '50': '50px', 
        '100': '100px',  
        '200': '200px',
        '400': '400px', 
        '600': '600px', 
        '700': '700px', 
        '800': '800px', 
        '900': '900px', 
        '1000': '1000px', 
        '1500': '1500px', 
        '2000': '2000px', 
      },
      height: {
        '25': '25px',  
        '50': '50px', 
        '100': '100px',  
        '200': '200px', 
        '400': '400px', 
        '450': '450px',
        '500': '500px',  
        '600': '600px', 
        '700': '700px', 
        '800': '800px', 
      }
    },
  },
  plugins: [],
}

