# Cats-api-nodejs&nbsp;&nbsp;

Api em nodeJS que consome a [TheCatApi](https://thecatapi.com/) e a partir dela salva informações em um mongoDB proprio e lista essas informações.

* [Requisitos](#requisitos)
* [Installação](#installação)
* [API](#api)
* [Estrutura](#estrutura)
* [Manual](#manual)

## Requisitos

* Git
* nodejs v12.16.1
* npm 6.13.4
* key valida da [TheCatApi](https://thecatapi.com/)
* Url de conexão com mongoDB

## Installação

**Instalação sem docker**

Apenas rode o docker run alterando o valor da sua variavel (imagem public em [DockerHub](https://hub.docker.com/r/victorgfp5693/cats-api-victor))

```
sudo docker run -d --restart=unless-stopped -p 8090:80 \
--env="MONGO_URL=Seu Valor aqui" \
--env="ApiKey=Sua chave aqui" \
victorgfp5693/cats-api-victor:v1.0.0
```

A api já estará disponível localmente na porta `8090`

Para entender mais sobre a api vá para [API](#api)

**Instalação sem docker**

clone o projeto para a sua máquina

```
git clone https://github.com/VictorGabriel56/cats-api-victor.git
```

Primeiramente instale as dependências necessárias para que o projeto rode

```
npm install
```

Após instalar as dependencias precisamos alterar os valores das variáveis **MONGO_URL** e **ApiKey** ambos no caminho `.env` na raiz do projeto

```js
MONGO_URL= Url de conexão para o seu mongoDB (Ex: const mongo = 'mongodb+srv://User:Passwor@cluster0-nfulh.gcp.mongodb.net/NomeDaBase?retryWrites=true&w=majority')
ApiKey= Api Key válida para a TheCatApi
```

Agora com as variáveis com o valor correto já podemos rodar o código

```
npm start
```

Para entender mais sobre a api vá para [API](#api)

## API

* `/save`: Esta api bate na TheCatApi e armazena no mongoDB as informações de origem, temperamento e descrição de todos os gatos disponíveis

* `/save-categories-picture/sunglasses`: Esta api bate na TheCatApi e armazena no mongoDB 3 urls de fotos de gatos usando óculos

* `/save-categories-picture/hat`: Esta api bate na TheCatApi e armazena no mongoDB 3 urls de fotos de gatos usando chapéu

* `/list/all`: Esta api lista todos os dados armazenado pela api `/save`

* `/list/all/breeds`: Esta api lista todas as raças disponíveis na base

* `/list/breed/NomeDaRaça`: Esta api lista todas as informações da raça escolhida

```
Exemlo:/list/breed/abys
```

* `/list/temp/:infoTemp`: Esta api lista todas as raças de acordo com o temperamento escolhido

```
Exemlo:/list/breed/Affectionate
```

* `/list/origin/:infoOrigin`: Esta api lista todas as raças de acordo com a origem escolhida

```
Exemlo:/list/breed/Australia
```

* `/list/all/hat`: Esta api lista todas as fotos de gato usando chapéu disponivel na base

* `/list/all/sunglass`: Esta api lista todas as fotos de gato usando chapéu oculos na base



## Estrutura

A infraestrutura utilizada/recomendada para esse projeto consiste no uso das seguintes tecnologias em conjunto com a aplicação

**Gerenciador de containers**
* rancher

**Ferramenta de logging**
* Splunk

**Ferramenta de monitoração da aplicação**
* Splunk

**Ferramenta de infra**
* Grafana
* Prometheus
* Nedata

**Cloud**
* Azure

**Quantidade de máquinas**
* 3 máquinas

```
Máquina 1: Rancher Server
Máquina 2: Host onde roda os containers gerenciados pelo rancher
Máquina 3: Máquina para coleta de métricas
```

## Manual

Para refazer uma infra semelhante à sugerida siga os passos do [manual]
