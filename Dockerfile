# Usa uma imagem do docker hub com a versão carbon do Node.js
FROM node

# Define qual diretório será usado para nossa aplicação dentro do container
WORKDIR /usr/src/app

# limpar log sempre que iniciar img
RUN rm -rf /logs
RUN mkdir /logs

# Copia todos os arquivos que começam com package e tem extensão .json para o diretório definido acima
COPY package*.json ./

# Instala todas as dependências declaradas no package.json
RUN npm install

# Copia todos os arquivos da raiz da nossa aplicação para a pasta deinida no WORKDIR
COPY . .

# Expõe a porta 3000 do container
EXPOSE 80

# Roda o comando 'npm start'
CMD [ "npm", "start" ]
