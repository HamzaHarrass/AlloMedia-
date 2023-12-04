const express = require('express');
const Menu = require('../models/Menu');
const Panier = require('../models/Panier');
const Article = require('../models/Article');
const { ObjectId } = require('mongoose').Types;






const addToPanier = async (req, res) => {
  try {
    const { menuId, quantity } = req.body;
    console.log(req.body);

    if (!menuId || !quantity) throw new Error("Missing parameters");

    console.log('sucees 1')

    const menuObjectId = ObjectId.createFromHexString(menuId);
    const menu = await Article.findById(menuObjectId);

    if (!menu) {
      return res.status(404).json({ error: 'Menu not found' });
    }

    console.log('suceess 2')

    //const userId = req.user;
    //console.log(userId);
    let userPanier = await Panier.findOne({ user: '655e20a7706f51dfae9ac681' });

    if (!userPanier) {
      userPanier = new Panier({ user: '655e20a7706f51dfae9ac681', client: '655e20a7706f51dfae9ac681', articles: [] });
    }

    const existingItem = userPanier.articles.find((item) => item.menu.toString() === menuId);

    if (existingItem) {
      existingItem.quantite += quantity; // Update the existing quantity
    } else {
      userPanier.articles.push({ menu: menuId, quantite: quantity, id: new ObjectId() });
    }

    await userPanier.save();

    res.json(userPanier);
    console.log(userPanier);
  } catch (error) {
    console.error('Error adding item to Panier:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPanier = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming req.user is an object with an id property
    // console.log(userId);

    const userPanier = await Panier.find({ client: userId }).populate({path:"articles._id",model:"Article", select :"Plat prix description"});
    console.log(userPanier);

    if (!userPanier) {
      return res.status(404).json({ error: 'Panier not found for this user' });
    }

    res.json(userPanier);
  } catch (error) {
    console.error('Error getting Panier:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { addToPanier, getPanier };