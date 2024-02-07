export const getInstagramTemplate = async (id: string) => {
  const db = global.mongo.conn?.db;
  if (!db) {
    throw new Error("Database connection failed");
  }

  const collection = db.collection("instagram-templates");
  const instagramTemplate = await collection.findOne({ id });

  return instagramTemplate;
};
