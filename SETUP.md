# Como rodar o projeto

## Subir os containers

```bash
docker compose up -d
```

## Preparar o banco

```bash
docker compose exec backend npm run setup:db
```

## Rodar o frontend

```bash
cd frontend
npm run dev
```

## URLs

Frontend:

```txt
http://localhost:5173
```

Backend:

```txt
http://localhost:3000
```

## Usuário de teste

```txt
Email: joao@gmail.com
Senha: 123456
```