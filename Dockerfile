# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app

# Copia tudo para /app
COPY . .
RUN ls -lR /app
# Restaura as dependências (assumindo que o .csproj está na pasta ProjetoSiteProfNelson)
RUN dotnet restore ProjetoSiteProfNelson/ProjetoSiteProfNelson.csproj

# Compila e publica em modo Release para a pasta /app/out
RUN dotnet publish ProjetoSiteProfNelson/ProjetoSiteProfNelson.csproj -c Release -o out

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app

# Copia a aplicação publicada do stage build-env
COPY --from=build-env /app/out .

# Define o entrypoint para arrancar a aplicação
ENTRYPOINT ["dotnet", "ProjetoSiteProfNelson.dll"]

