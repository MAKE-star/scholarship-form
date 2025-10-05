const { MongoClient } = require("mongodb");

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  let client;

  try {
    const data = JSON.parse(event.body);

    // Validate required fields
    if (!data.name) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Scholarship name is required" }),
      };
    }

    // Create MongoDB client with proper connection string format
    // The connection string should be in format: mongodb+srv://username:password@cluster.mongodb.net/
    const uri = process.env.MONGODB_URL;

    if (!uri) {
      throw new Error("MONGODB_URL environment variable is not set");
    }

    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Connect to MongoDB
    await client.connect();

    const db = client.db("test");
    const collection = db.collection("scholarships");

    // Prepare the scholarship document matching the schema
    const scholarshipDoc = {
      name: data.name,
      amount: data.amount || "",
      deadline: data.deadline ? new Date(data.deadline) : null,
      details: data.details || "",
      link: data.link || "",
      awardType: data.awardType || "Scholarship",
      university: data.university || "",
      gpa: data.gpa || "",
      gender: data.gender || "",
      companyName: data.companyName || "",
      organization: data.organization || "",
      religion: data.religion || [],
      race: data.race || [],
      location: data.location || ["No Geographic Restrictions"],
      majors: data.majors || ["All Majors Eligible"],
      stage: data.stage || ["no restrictions"],
      sports: data.sports || [],
      disability: data.disability || [],
      personalAttributes: data.personalAttributes || [],
      createdAt: new Date(),
      updatedAt: new Date(),
      lastChecked: new Date(),
      __v: 0,
    };

    // Insert the scholarship
    const result = await collection.insertOne(scholarshipDoc);

    return {
      statusCode: 201,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Scholarship created successfully",
        id: result.insertedId,
      }),
    };
  } catch (err) {
    console.error("Error creating scholarship:", err);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: err.message || "Internal server error",
      }),
    };
  } finally {
    // Always close the connection
    if (client) {
      await client.close();
    }
  }
};
