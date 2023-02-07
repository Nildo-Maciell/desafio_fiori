sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("googleimagens.controller.Inicial", {
            onInit: function () {
                //Colcehetes indica tabela interna do abap.
                //VAMOS FAZER UM TABLE TYPE DENTRO DE UMA ESTRUTURA DO ABAP
                let imageList = {
                    Imagens: [
                        {
                            url: "http://cdn.shopify.com/s/files/1/0265/3893/4330/products/coca-cola-110591_1200x1200.jpg?v=1590528264",
                            thumbnail: "https://rapidapi.usearch.com/api/thumbnail/get?value=158279291306047240",
                            title: "Coca-cola White Lily Diner",
                            provider: {
                                name: "shopify",
                            }
                        },
                        {
                            url: "http://cdn.shopify.com/s/files/1/0445/5858/1921/products/diet_coke_400x400_80d4f97c-0844-4c38-84d0-5fa6fc01260a.png?v=1631917880",
                            thumbnail: "https://rapidapi.usearch.com/api/thumbnail/get?value=6486852065862083098",
                            title: "Coca-Cola Diet Coke Mundii",
                            provider: {
                                name: "shopify",
                            }
                        },
                        {
                            url: "https://www.benekeith.com/images/food/Pepsi_-_Food_Product_interior_image_copy.jpg",
                            thumbnail: "https://rapidapi.usearch.com/api/thumbnail/get?value=418336025855244464",
                            title: "Pepsi | Ben E. Keith - Food Product & Alcoholic Beverage Distributor",
                            provider: {
                                name: "benekeith",
                            }
                        }
                    ]
                };

                //Criação do modelo para exibir dados na tela
                let imageModel = new JSONModel(imageList);
                let view = this.getView();

                view.setModel(imageModel, "ModeloImagem");

            },
            onPressBuscar: function () {
                //instancia objeto na variavel
                let inputBusca = this.byId("inpBusca");
                //Coleta o valor digitado no input
                let query = inputBusca.getValue();
                //exibe na tela
                //alert(query);

                const settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q="
                        + query
                        + "&pageNumber=1&pageSize=10&autoCorrect=true",
                    "method": "GET",
                    "headers": {
                        "X-RapidAPI-Key": "df53026c7bmsh3f1b2baa3406bb0p149a2bjsn9bb2d8713a0b",
                        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
                    }
                };
                //parenteses servem para passar parametros
                //calback é uuma função chamada no final de outra função
                $.ajax(settings).done(function (response) {
                    console.log(response);
                    //Instanciar o modelo
                    let oImageModel = this.getView().getModel("ModeloImagem");
                    let oDadosImage = oImageModel.getData();
                    //Limpar tabela interna = array
                    oDadosImage.Imagens = [];
                    //loop que adiciona dados de uma tabelaem outra
                    let listaResultados = response.value;
                    let newItem;
                    //fazendo loops
                    for (var i = 0; i < listaResultados.length; i++) {
                        //lendo a tabela pelo indice
                        newItem = listaResultados[i];
                        //appende dos dados na nova tabela
                        oDadosImage.Imagens.push(newItem);
                    }

                    oImageModel.refresh();

                }.bind(this)
                );
            }
        });
    });
