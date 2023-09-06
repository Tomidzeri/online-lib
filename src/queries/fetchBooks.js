import libraryAPI from "../utils/api";

export const fetchBooks = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await libraryAPI.get("/books/store", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

// import libraryAPI from "../utils/api";

// export const fetchBooks = async () => {
//   try {
//     const token = "34|9sD5pdHc7XPYGIsWTWitCPGcQY0scZovANzz1X2T"; // Replace with your actual token

//     const headers = new Headers({
//       "Content-Type": "application/json",
//       "Accept": "application/json; charset=utf-8",
//       "Authorization": `Bearer ${token}`,
//     });

//     const response = await fetch("https://tim2.petardev.live/api/books", {
//       method: 'GET',
//       headers: headers,
//       redirect: 'follow'
//     });

//     if (!response.ok) {
//       throw new Error(`Request failed with status ${response.status}`);
//     }

//     const data = await response.json();

//     console.log(data);
//     return data;
//   } catch (error) {
//     console.error("Error fetching books:", error);
//     throw error;
//   }
// };

// this type of body make and send in all fetching js files