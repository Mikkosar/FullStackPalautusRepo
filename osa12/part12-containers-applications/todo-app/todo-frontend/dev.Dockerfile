FROM node:20

WORKDIR /usr/src/app

# Kopioi package.json ja package-lock.json
COPY package*.json ./

# Asenna riippuvuudet
RUN npm install

# Kopioi projektin tiedostot
COPY . .

# Komento, joka suoritetaan kun kontti käynnistyy
CMD ["npm", "run", "dev", "--", "--host"]