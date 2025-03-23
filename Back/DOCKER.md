Instruções para o docker, banco mysql e prisma

docker pull mysql:latest (versão do mysql para docker)

docker run --name db_mysql_marketplace -e MYSQL_ROOT_PASSWORD=senha_pi_marketplace -d -p 3306:3306 mysql:latest

--name db_mysql_marketplace: Define o nome do contêiner como meu-mysql.

-e MYSQL_ROOT_PASSWORD=senha_pi_marketplace: Define a senha do usuário root do MySQL. Substitua minha-senha-segura por uma senha segura.

-d: Executa o contêiner em segundo plano (modo "detached").

-p 3306:3306: Mapeia a porta 3306 do contêiner para a porta 3306 do host. Isso permite que você se conecte ao MySQL a partir do seu sistema host.

mysql:latest: Especifica a imagem do MySQL a ser usada.
