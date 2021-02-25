# nodejs_compras

Projeto node.js para cadastro de items e clientes em mongoDb. 

Rotas para ITEM:

GET (localhost)/item/todos - Listar todos os itens cadastrados</br>
POST (localhost)/item/cadastrar - Cadastro de item; Parâmetros para envio (nome, preco, quantidade, tipo, descrição)</br>
GET (locahost)/item/:tipo - Listar itens que possuam um determinado tipo</br>
POST (localhost)/item/buscar - Listar itens por id ou nome</br>
PUT (locahost)/item/atualizar - Atualizar item; Parâmetros para envio (id, nome, preco, quantidade, tipo, descricao)</br>
DELETE (localhost)/item/deletar/:id - Deletar item</br>

Rotas para CLIENTE:</br>

Ao cadastrar items e clientes, é possível realizar compras </br>

POST (localhost)/cliente/cadastrar - Cadastro de cliente; Parâmetros para envio (nome, dinheiro);</br>

Ao realizar a compra do item, o dinheiro do cliente será atualizado, o estoque do item irá diminuir, e o registro da compra será salvo em /historico/compras.json</br>
POST (localhost)/cliente/comprar - Compra de item; Parâmetros para envio (idCliente, idProduto, quantidade)</br>

