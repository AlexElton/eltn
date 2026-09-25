# 1. Bruk en offisiell Node.js-avbildning som base
FROM node:20-alpine

# 2. Opprett en mappe for appen inne i containeren
WORKDIR /app

# 3. Kopier pakkefiler og installer avhengigheter
COPY package*.json ./
RUN npm ci

# 4. Kopier resten av kildekoden
COPY . .

# 5. Bygg appen (hvis det er Next.js/Vite/React)
RUN npm run build

# 6. Fortell Docker hvilken port appen lytter på inne i containeren (standard)
EXPOSE 3000

# 7. Standard startkommando (uten å tvinge ny port på innsiden)
CMD ["npm", "start"]