// db is an argument to this function so
// that we can make db queries inside
export default function initRoutesController(db) {
  const index = (req, res) => {
    db.Route.findAll()
      .then((routes) => {
        const sortedRoutes = routes.sort((a, b) => ((a.order > b.order) ? 1 : -1));
        res.send({ sortedRoutes });
      })
      .catch((error) => console.log(error));
  };

  const create = async (request, response) => {
    try {
      const newRoute = await db.Route.create({
        name: request.body.newRoute,
        difficulty: request.body.newGrade,
        tripId: request.body.tripId,
        order: 0,
      });
      const routes = await db.Route.findAll({
        where: {
          tripId: request.body.tripId,
        },
      });
      response.send(routes);
    } catch (error) {
      console.log(error);
    }
  };

  const updateRoutes = async (req, res) => {
    try {
      const { tripId } = req.params;
      const newRoutesArray = req.body;
      for (let i = 0; i < newRoutesArray.length; i += 1) {
        const route = await db.Route.findByPk(newRoutesArray[i].id);
        route.order = i + 1;
        await route.save();
      }
      const updatedRoutes = await db.Route.findAll({
        where: {
          tripId,
        },
      });
      res.send(updatedRoutes);
    } catch (err) {
      console.log(err);
    }
  };

  // return all methods we define in an object
  // refer to the routes file above to see this used
  return {
    index,
    create,
    updateRoutes,
  };
}
