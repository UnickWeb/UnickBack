
class productService {

   paginatedResults(model) {
      return async (req, res, next) => {
         const page = parseInt(req.query.page)
         const limit = parseInt(req.query.limit)


         const startIndex = (page - 1) * limit
         const endIndex = page * limit

         const results = {}

         if (endIndex < model.length) {
            results.next = {
               page: page + 1,
               limit: limit
            }
         }

         if (startIndex > 0) {
            results.previus = {
               page: page - 1,
               limit: limit
            }
         }

         try {
            //results.results = model.slice(startIndex, endIndex)
            //implementaion de la consulta a  la base de datos 
            results.results = await model.find().limit(limit).skip(startIndex).exec()
            res.paginatedResults = results
            next()

         } catch (e) {
            res.status(500).json({ message: e.message })
         }
      }
   }


}

module.exports = productService;
