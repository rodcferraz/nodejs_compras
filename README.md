# nodejs_compras

Projeto node.js para cadastro de items e clientes em mongoDb. </br>

Para executar o projeto, abra o terminal com o caminha da pasta do projeto e execute npm run dev </br>
Após isso, os seguintes requests abaixo podem ser executados via Postmann</br>

Rotas para ITEM:

POST (localhost:3000)/item/cadastrar - Cadastro de item; Parâmetros para envio (nome, preco, quantidade, tipo, descrição)</br>
GET (localhost:3000)/item/todos - Listar todos os itens cadastrados</br>
GET (localhost:3000)/item/:tipo - Listar itens que possuam um determinado tipo</br>
POST (localhost:3000)/item/buscar - Listar itens por id ou nome</br>
PUT (locahost:3000)/item/atualizar - Atualizar item; Parâmetros para envio (id, nome, preco, quantidade, tipo, descricao)</br>
DELETE (localhost:3000)/item/deletar/:id - Deletar item</br>

Rotas para CLIENTE:</br>

Ao cadastrar items e clientes, é possível realizar compras </br>

POST (localhost:3000)/cliente/cadastrar - Cadastro de cliente; Parâmetros para envio (nome, dinheiro);</br>

Ao realizar a compra do item, o dinheiro do cliente será atualizado, o estoque do item irá diminuir, e o registro da compra será salvo em /historico/compras.json</br>
POST (localhost:3000)/cliente/comprar - Compra de item; Parâmetros para envio (idCliente, idProduto, quantidade)</br>

