import clientPromise from "@/app/lib/mongodb";

export async function POST(req) {
  const {
    typeOfIncident,
    descriptionOfIncident,
    incidentLocation,
    personalInformation,
    dateOfIncident,
    timeOfIncident,
    city,
    state,
    pincode,
    uploadedDocPath,
    userName,
    reportid,
    status,
  } = await req.json();

  const client = await clientPromise;
  try {
    const db = await client.db("GuardianLine");
      const collection = db.collection("ReportsData");

    await collection.insertOne({
      typeOfIncident: typeOfIncident,
      descriptionOfIncident: descriptionOfIncident,
      incidentLocation: incidentLocation,
      personalInformation: personalInformation,
      dateOfIncident: dateOfIncident,
      timeOfIncident: timeOfIncident,
      city: city,
      state: state,
      pincode: pincode,
      uploadedDocPath: uploadedDocPath,
      userName: userName,
      reportid: reportid,
      status: status,
      }); 
    // In the incident Location we will have longitude and latitude using that we find the nearest volunteer from ActiveVolunteers collection that are near 1 km from the longitute and latitude of the incident location
    const collectionActive = await db.collection("ActiveVolunteers");
    const volunteers = await collectionActive.find({}).toArray();
    const volunteerNearby = volunteers
      .map((volunteer) => {
        const distance = getDistance(
          volunteer.latitude,
          volunteer.longitude,
          incidentLocation.latitude,
          incidentLocation.longitude
        );
        return { userName: volunteer.userName, distance: distance};
      })
      .filter((volunteer) => volunteer.distance <= 1);

    // Store VolunteersNearby in VolunteersAround collection
    const collection2 = await db.collection("VolunteersAround");
    await collection2.insertOne({
      userName: userName,
      incidentLocation,
      volunteers: volunteerNearby,
    });

    // Update ActiveVolunteers collection with activeCrimes
    const collection3 = await db.collection("ActiveVolunteers");
    volunteerNearby.forEach(async (volunteer) => {
      await collection3.updateOne(
        { userName: volunteer.userName },
        {
          $push: {
            activeCrimes: {
              userName,
              incidentLocation,
              distance: volunteer.distance,
              typeOfIncident,
              descriptionOfIncident,
              timeOfIncident,
              personalInformation,
              status,
            },
          },
        }
      );
    });
    // const result = await fetch("http://127.0.0.1:5000/")
    // console.log(await result.json())
    console.log("Crime registered successfully");
    return new Response("Volunteer registered successfully", { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Error", { status: 500 });
  }
  finally {
    //  client.close();
  }
}

function getDistance(lat1, lon1, lat2, lon2) {
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const R = 6371; // Radius of the earth in kilometers
  const dLat = deg2rad(lat2 - lat1); // Convert degrees to radians
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}
