const { response } = require('express');
const { verifyLogged } = require('../helpers/auth.js');
const { Phone } = require('../models');
const _ = require('lodash');

const verifySomeFieldIsEmpty = (object) => {
  let responseVerify = undefined;
  const labelsMandatory = ['name', 'brand', 'model', 'price', 'color'];
  let labelsObject = [];
  if (object.typeProduct === 'simple') {
    labelsObject = Object.keys(object.product)
    for (const key in object.product) {
      if (_.isEmpty(object.product[key]?.toString())) {
        return `O campo "${ key }" é obrigatório`;
      }
    }
    labelsMandatory.forEach((label) => {
      if (!labelsObject.includes(label)) {
        responseVerify = `O campo "${ label }" é obrigatório`
      }
    });
    return responseVerify;
  }
  object.product.forEach((elem) => {
    labelsObject.push(Object.keys(elem));
    for (const key in elem) {
      if (_.isEmpty(elem[key]?.toString())) {
        responseVerify = `O campo "${ key }" é obrigatório`
      }
    }
  })
  labelsMandatory.forEach((label) => {
    labelsObject.forEach((labelObj) => {
      if (!labelObj.includes(label)) {
        responseVerify = `O campo "${ label }" é obrigatório`
      }
    })
  })
  return responseVerify;
}

const verifyAndConvertStructure = (product) => {
  if (Array.isArray(product)) {
    const arrayConvertedProducts = [];

    product.forEach((elem) => {
      elem.data.forEach((vari) => {
        const convertedProduct = {
          name: elem.name,
          brand: elem.brand,
          model: elem.model,
          price: vari.price,
          color: vari.color
        }
        arrayConvertedProducts.push(convertedProduct);
      })
    });

    const responseProduct = {
      typeProduct: 'variable',
      product: arrayConvertedProducts
    }
    return responseProduct

  } else if (product.details) {
    const responseProduct = {
      typeProduct: 'simple',
      product: {
        name: product.name,
        brand: product.details.brand,
        model: product.details.model,
        price: product.price,
        color: product.details.color
      }
    }
    return responseProduct
  }
  return { typeProduct: 'simple', product };
}

const createProduct = async (token, data) => {
  const userLogged = await verifyLogged(token);
  if (userLogged) {
    const productsForDb = verifyAndConvertStructure(data);
    const verifyIsEmpty = verifySomeFieldIsEmpty(productsForDb);
    if (verifyIsEmpty) {
      return { empty: verifyIsEmpty }
    } else if (productsForDb.typeProduct === 'simple') {
      await Phone.create(productsForDb.product);
    } else {
      productsForDb.product.forEach( async (prod) => {
        await Phone.create(prod);
      });
    }
    return true;
  }
  return false;
}

const getProduct = async (token) => {
  const userLogged = await verifyLogged(token);
  if (userLogged) {
    const phonesDb = await Phone.findAll();
    return phonesDb;
  }
  return false;
}

const updateProduct = async (token, data) => {
  const userLogged = await verifyLogged(token);
  if (userLogged) {
    await Phone.update(data, { where: { id: data.id } });
    return true;
  }
  return false;
}

const deleteProduct = async (token, id) => {
  const userLogged = await verifyLogged(token);
  if (userLogged) {
    await Phone.destroy({ where: { id } });
    return true;
  }
  return false;
}

module.exports = { createProduct, getProduct, updateProduct, deleteProduct }
