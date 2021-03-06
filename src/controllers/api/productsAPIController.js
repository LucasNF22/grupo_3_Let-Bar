const db = require('../../database/models');
const { Sequelize } = require('sequelize');

const productsAPIController = {

    list: (req, res) => {
        let pedidoProductos = db.Product.findAll({
            include: ["categories"]
        });
        let pedidoCategorias = db.Product_category.findAll();
        let cats = [];

        Promise.all([pedidoProductos, pedidoCategorias])
            .then(([productosDb, categoriasDb]) => {

                let productosArray = [];
                let categoriaInfo = {};

                categoriasDb.forEach(categoria => {
                    categoriaInfo = {
                        id: categoria.id,
                        name: categoria.name,
                        category: categoria.category,
                        productCount: 0
                    }

                    productosDb.forEach(producto => {
                        if (producto.category_id == categoria.id) {
                            categoriaInfo.productCount++
                        }
                    })

                    cats.push(categoriaInfo);
                })

                productosDb.forEach(producto => {

                    let urlImageProducto = "http://localhost:3001/img/products/" + producto.dataValues.image
                    let data = {
                        id: producto.id,
                        name: producto.name,
                        image: urlImageProducto,
                        description: producto.description,
                        relations: {
                            category: producto.categories
                        },
                        stock: producto.stock,
                        detail: "/api/products/detail/" + producto.id

                    }
                    productosArray.push(data)
                })

                let respuesta = {
                    meta: {
                        status: 200,
                        url: "api/products"
                    },
                    count: productosDb.length,
                    countByCategory: cats,
                    data: productosArray
                }
                res.json(respuesta);
            })
    },
    detail: (req, res) => {
        db.Product.findByPk(req.params.id, {
            include: ["categories"]


        })
            .then(producto => {
                //delete user.dataValues.password
                let urlImageProducto = "http://localhost:3001/img/products/" + producto.image
                let categoria = producto.categories
                delete producto.dataValues.categories

                let prod = producto.dataValues
                let respuesta = {
                    meta: {
                        status: 200,
                        url: "http://localhost:3001/api/products/detail/" + producto.id

                    },
                    relations: {
                        category: categoria
                    },

                    data: { urlImageProducto, ...prod }
                }



                res.json(respuesta);
            })

    },

    last: (req, res) => {
        db.Product.findAll({ 
            order: [["id", 'DESC']]
        })
        .then(productosDB => {
            //delete user.dataValues.password
            
           let producto = productosDB[0] 
            
            let urlImageProducto = "http://localhost:3001/img/products/" + producto.image
            let categoria = producto.categories
            delete producto.dataValues.categories

            let prod = producto.dataValues
            let respuesta = {
                meta: {
                    status: 200,
                    url: "http://localhost:3001/api/products/detail/" + producto.id

                },
                relations: {
                    category: categoria
                },

                data: { urlImageProducto, ...prod }
            }



            res.json(respuesta);
        })
        
    }



}

module.exports = productsAPIController;