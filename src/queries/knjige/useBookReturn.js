import libraryAPI from "../../utils/api";

export const returnBook = async (bookIds) => { 
  try {
    const token = sessionStorage.getItem("token");
    const response = await libraryAPI.post("/books/vrati", {
      toReturn: bookIds, 
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
