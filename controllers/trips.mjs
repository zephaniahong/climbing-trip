// db is an argument to this function so
// that we can make db queries inside
export default function initTripsController(db) {
  const index = (request, response) => {
    db.Trip.findAll()
      .then((trips) => {
        response.send({ trips });
      })
      .catch((error) => console.log(error));
  };

  const create = async (request, response) => {
    try {
      console.log(request);
      db.Trip.create({ name: request.body });
      response.send(200);
    } catch (error) {
      console.log(error);
    }
  };

  // return all methods we define in an object
  // refer to the routes file above to see this used
  return {
    index,
    create,
  };
}
