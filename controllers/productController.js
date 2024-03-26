const {Product, Category, Review} = require('../models')

module.exports = {

    async getCategory(req, res) {
        try {
          const categ = await Category.find();
          res.json(categ);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    async getSingleCategory(req, res) {
        try {
          const categ = await Category.findOne({ _id: req.params.categorytId })

    
          if (!categ) {
            return res.status(404).json({ message: 'No categ with that ID' });
          }
          res.json(categ);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    async createCategory(req, res) {
        try {
          const { title, sub } = req.body;
          const categ = await Product.create({ title, sub });
          res.json(categ);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },

    async getProductss(req, res) {
        try {
          const produc = await Product.find();
          res.json(produc);
        } catch (err) {
          res.status(500).json(err);
        }
      },
  
    async getSingleProduct(req, res) {
          try {
            const produc = await Product.findOne({ _id: req.params.productId })
  
      
            if (!produc) {
              return res.status(404).json({ message: 'No produc with that ID' });
            }
            res.json(produc);
          } catch (err) {
            res.status(500).json(err);
          }
        },

    async createProduct(req, res) {
            try {
              const { title, content, productPic, stock, category } = req.body;
              const produc = await Product.create({ title, content, productPic, stock, category });
              res.json(produc);
            } catch (err) {
              console.log(err);
              return res.status(500).json(err);
            }
          },
    
    async deleteProduct(req, res) {
            try {
              const produc = await Product.findOneAndDelete({ _id: req.params.productId });
        
              if (!produc) {
                res.status(404).json({ message: 'No produc with that ID' });
              }
        
              await Review.deleteMany({_id: {$in:produc.reviews}})
              res.json({ message: 'produc and reviews deleted!' });
            } catch (err) {
              res.status(500).json(err);
            }
          },

    async updateProduct(req, res) {
            try {
              const produc = await Product.findOneAndUpdate(
                { _id: req.params.productId },
                { $set: req.body },
                { runValidators: true, new: true }
              );
        
              if (!produc) {
                res.status(404).json({ message: 'No produc with this id!' });
              }
        
              res.json(produc);
            } catch (err) {
              res.status(500).json(err);
            }
          },

    async createReview(req, res){
            try {
              const produc = await Product.findOneAndUpdate(
                { _id: req.params.productId },
                { $addToSet: { reviews: req.body } },
                { runValidators: true, new: true }
              );
        
              if (!produc) {
                return res
                  .status(404)
                  .json({ message: 'No thought found with that ID :(' });
              }
        
              res.json(produc);
            } catch (err) {
              res.status(500).json(err);
            }
          },

    async removeReview(req, res) {
            try {
              const produc = await Product.findOneAndUpdate(
                { _id: req.params.productId },
                { $pull: { reviews: { reviewId: req.params.reviewId } } },
                { new: true }
              );
          
              if (!produc) {
                return res.status(404).json({ message: 'No thought found with that ID :(' });
              }
          
              res.json(produc);
            } catch (err) {
              res.status(500).json(err);
            }
          },
}