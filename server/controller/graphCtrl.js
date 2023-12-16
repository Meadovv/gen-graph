function getRndInteger(min, max) {
   return Math.floor(Math.random() * (max - min) ) + min;
}

function shuffle(array) {
   let currentIndex = array.length,  randomIndex;
   while (currentIndex > 0) {
     randomIndex = Math.floor(Math.random() * currentIndex);
     currentIndex--;
     [array[currentIndex], array[randomIndex]] = [
       array[randomIndex], array[currentIndex]];
   }
   return array;
 }

const generate = (req, res) => {
   try {
      const numNode = req.body.numNode
      const numEdge = req.body.numEdge
      const weight = req.body.weight
      const graphMode = req.body.graphMode

      let fullEdge = []
      for(let i = 0; i < numNode; ++i) {
         for(let j = (graphMode === 'undirected' ? i + 1 : 0); j < numNode; ++j) {
            if(i !== j) {
               fullEdge.push({
                  source: i + 1,
                  target: j + 1,
                  weight: getRndInteger(weight[0], weight[1])
               })
            }
         }
      }
      fullEdge = shuffle(fullEdge)

      const graph = []
      for(let i = 0; i < numEdge; ++i) {
         graph.push(fullEdge[i])
      }
      graph.unshift({
         numNode: numNode,
         numEdge: numEdge,
         weight: weight,
         graphMode: graphMode
      })
      res.status(200).send({
         success: true,
         message: 'Success!',
         graph: graph
      })
   } catch (err) {
      console.log(err)
      res.status(500).send({
         success: false,
         message: err.message
      })
   }
}

const check = (req, res) => {
   res.status(200).send({
      success: true,
      message: 'API Work!'
   })
}

module.exports = {
   generate,
   check
}