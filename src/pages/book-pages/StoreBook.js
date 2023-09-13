import React, { useState } from "react";
import Tab from "../../components/UI/tabs/Tab";
import Cancel from "../../components/UI/buttons/Cancel";
import Submit from "../../components/UI/buttons/Submit";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCreateBook } from "../../queries/useCreateBook";
import { useStoreBook } from "../../queries/useStoreBook";
import { useNavigate } from "react-router-dom";

const StoreBook = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nazivKnjiga: "",
    kratki_sadrzaj: "",
    knjigaKolicina: 200,
    authors: "",
    izdavac: "",
    godinaIzdavanja: 2020,
    categories: "",
    genres: "",
    jezik: "",
    brStrana: 200,
    isbn: 4517818931991,
    pismo: "",
    povez: "",
    format: "",
  });

  const handlePictureChange = (e) => {
    //
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const {
    categories: categoryOptions,
    genres: genreOptions,
    authors: authorOptions,
    publishers: publisherOptions,
    scripts: scriptOptions,
    languages: languageOptions,
    bookbinds: bookbindOptions,
    formats: formatOptions,
  } = useCreateBook();

  const { storeBook } = useStoreBook();

  const handleSubmit = (e) => {
    e.preventDefault();

  //   const requiredFields = [
  //     "title",
  //     "kratki_sadrzaj",
  //     "knjigaKolicina",
  //     "authors",
  //     "publisher_id",
  //     "godinaIzdavanja",
  //     "categories",
  //     "genres",
  //     "language_id",
  //     "brStrana",
  //     "isbn",
  //     "script_id",
  //     "bookbind_id",
  //     "format_id",
  //   ];

  //   const missingFields = requiredFields.filter((field) => !formData[field]);

  //   if (missingFields.length > 0) {
  //     console.error("Missing required fields:", missingFields);
  //     return;
  //   }

     const bookData = {
       "nazivKnjiga": formData.title,
       "kratki_sadrzaj": formData.kratki_sadrzaj,
       "knjigaKolicina": formData.knjigaKolicina,
       "authors": formData.authors,
       "izdavac": formData.publisher_id,
       "godinaIzdavanja": formData.godinaIzdavanja,
      "categories": formData.categories,
      "genres": formData.genres,
       "jezik": formData.language_id,
       "brStrana": formData.brStrana,
       "isbn": formData.isbn,
       "pismo": formData.script_id,
       "povez": formData.bookbind_id,
       "format": formData.format_id,
    };

     storeBook(bookData);
   };

  return (
    <div className="container mx-auto p-4 z-10 mt-24 ml-20">
      <h2>Nova Knjiga</h2>
      <form onSubmit={handleSubmit}>
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
                name="title"
                value={formData.title}
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
              <label className="block text-gray-600">Author:</label>
              <select
                name="authors"
                value={formData.authors}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              >
                <option value="">Select Author</option>
                {authorOptions.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-gray-600">Publisher:</label>
              <select
                name="publisher_id"
                value={formData.publisher_id}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              >
                <option value="">Select Publisher</option>
                {publisherOptions.map((publisher) => (
                  <option key={publisher.id} value={publisher.id}>
                    {publisher.name}
                  </option>
                ))}
              </select>
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
              <select
                name="categories"
                value={formData.categories}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              >
                <option value="">Select Category</option>
                {categoryOptions.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-gray-600">Genres:</label>
              <select
                name="genres"
                value={formData.genres}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              >
                <option value="">Select Genre</option>
                {genreOptions.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Specifications Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-gray-600">Language:</label>
              <select
                name="language_id"
                value={formData.language_id}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              >
                <option value="">Select Language</option>
                {languageOptions.map((language) => (
                  <option key={language.id} value={language.id}>
                    {language.name}
                  </option>
                ))}
              </select>
            </div>
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
              <select
                name="script_id"
                value={formData.script_id}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              >
                <option value="">Select Script</option>
                {scriptOptions.map((script) => (
                  <option key={script.id} value={script.id}>
                    {script.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-gray-600">Povez:</label>
              <select
                name="bookbind_id"
                value={formData.bookbind_id}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              >
                <option value="">Povez</option>
                {bookbindOptions.map((bookbind) => (
                  <option key={bookbind.id} value={bookbind.id}>
                    {bookbind.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-gray-600">Format:</label>
              <select
                name="format_id"
                value={formData.format_id}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              >
                <option value="">Select Format</option>
                {formatOptions.map((format) => (
                  <option key={format.id} value={format.id}>
                    {format.name}
                  </option>
                ))}
              </select>
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
        <div className="flex justify-end items-end mt-auto p-4 mb-8">
          <Submit type="submit" className="mr-2">
            Submit
          </Submit>
          <Cancel onClick={() => navigate("/books")}>Cancel</Cancel>
        </div>
      </form>
      {/* Display success or error message here */}
    </div>
  );
};

export default StoreBook;
