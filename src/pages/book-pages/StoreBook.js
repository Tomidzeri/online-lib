import React, { useState } from "react";
import { storeBook } from "../../queries/useStoreBook";
import Tab from "../../components/UI/tabs/Tab";
import Cancel from "../../components/UI/buttons/Cancel";
import Submit from "../../components/UI/buttons/Submit";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const StoreBook = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const [formData, setFormData] = useState({
    nazivKnjiga: "",
    kratki_sadrzaj: "",
    knjigaKolicina: 0,
    authors: "",
    izdavac: "",
    godinaIzdavanja: 2020,
    categories: [],
    genres: [],
    brStrana: 0,
    isbn: 4517818931991,
    pismo: "",
    povez: "",
    format: "",
    picture: null,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  const handlePictureChange = (e) => {
    const pictureFile = e.target.files[0];
    setFormData({ ...formData, picture: pictureFile });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await storeBook(formData);
      console.log("Book stored successfully.");
    } catch (error) {
      console.error("Error storing book:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 z-10 mt-24 ml-20">
      <h2>Nova Knjiga</h2>
      <form>
        <Tab
          labels={["Basic Info", "Specifications", "Multimedia"]}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          className="mb-4"
        >
          {/* Basic Info Fields */}
          <div className="grid grid-cols-2 gap-4 mt-20">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-gray-600">Naziv Knjige:</label>
              <input
                type="text"
                name="nazivKnjiga"
                value={formData.nazivKnjiga}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-gray-600">Summary:</label>
              <ReactQuill
                name="kratki_sadrzaj"
                value={formData.kratki_sadrzaj}
                onChange={(value) =>
                  setFormData({ ...formData, kratki_sadrzaj: value })
                }
                className="border border-gray-300 w-full rounded-md"
                modules={{
                  toolbar: [
                    [{ header: "1" }, { header: "2" }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link"],
                    ["clean"],
                  ],
                }}
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-gray-600">Quantity:</label>
              <input
                type="number"
                name="knjigaKolicina"
                value={formData.knjigaKolicina}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-gray-600">Authors:</label>
              <input
                type="text"
                name="authors"
                value={formData.authors}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-gray-600">Publisher:</label>
              <input
                type="text"
                name="izdavac"
                value={formData.izdavac}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-gray-600">Publish Year:</label>
              <input
                type="number"
                name="godinaIzdavanja"
                value={formData.godinaIzdavanja}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-gray-600">Categories:</label>
              <input
                type="text"
                name="categories"
                value={formData.categories}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-gray-600">Genres:</label>
              <input
                type="text"
                name="genres"
                value={formData.genres}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>
          </div>
          {/* Specifications Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-gray-600">Number of Pages:</label>
              <input
                type="number"
                name="brStrana"
                value={formData.brStrana}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-gray-600">
                International Standard Book Number (ISBN):
              </label>
              <input
                type="number"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-gray-600">Pismo:</label>
              <input
                type="text"
                name="pismo"
                value={formData.pismo}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-gray-600">Povez:</label>
              <input
                type="text"
                name="povez"
                value={formData.povez}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-gray-600">Format:</label>
              <input
                type="text"
                name="format"
                value={formData.format}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>
          </div>
          {/* Multimedia Fields */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-gray-600">Upload Picture:</label>
            <input
              type="file"
              name="picture"
              onChange={handlePictureChange}
              className="mt-1"
            />
          </div>
        </Tab>
      </form>
      <div className="flex justify-end items-end mt-auto p-4 mb-8">
        <Submit type="submit" onClick={handleSubmit} className="mr-2">
          Submit
        </Submit>
        <Cancel onClick={() => navigate("/books")}>Cancel</Cancel>
      </div>
    </div>
  );
};

export default StoreBook;
