import React, { useState, useEffect } from "react";
import Tab from "../tabs/Tab";
import Cancel from "../buttons/Cancel";
import Submit from "../buttons/Submit";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBookData } from "../../../queries/fetchBookData";
import updateBookData from "../../../queries/useUpdateBookData";
import { useCreateBook } from "../../../queries/useCreateBook";

const EditBook = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const [formData, setFormData] = useState({
    nazivKnjiga: "",
    kratki_sadrzaj: "",
    knjigaKolicina: 0,
    authors: "",
    izdavac: "",
    godinaIzdavanja: 0,
    categories: "",
    genres: "",
    jezik: "",
    brStrana: 0,
    isbn: 0,
    pismo: "",
    povez: "",
    format: "",
    photo: null,
  });

console.log(formData);

  useEffect(() => {
    const fetchAndSetBookData = async () => {
      try {
        console.log(bookId);
        const fetchedBookData = await fetchBookData(bookId);
        console.log(fetchedBookData);
        setFormData({
          nazivKnjiga: fetchedBookData.title,
          kratki_sadrzaj: fetchedBookData.description,
          knjigaKolicina: fetchedBookData.samples,
          authors: fetchedBookData.authors[0].id,
          izdavac: fetchedBookData.publisher.id,
          godinaIzdavanja: fetchedBookData.pDate,
          categories: fetchedBookData.categories.map((category) => category.id),
          genres: fetchedBookData.genres.map((genre) => genre.id),
          jezik: fetchedBookData.language.id,
          brStrana: fetchedBookData.pages,
          isbn: fetchedBookData.isbn,
          pismo: fetchedBookData.script.id,
          povez: fetchedBookData.bookbind.id,
          format: fetchedBookData.format.id,
          photo: fetchedBookData.photo,
        });
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchAndSetBookData();
  }, [bookId]);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        photo: file,
      });
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBookData = {
      nazivKnjiga: formData.nazivKnjiga,
      kratki_sadrzaj: formData.kratki_sadrzaj,
      knjigaKolicina: formData.knjigaKolicina,
      authors: formData.authors,
      izdavac: formData.izdavac,
      godinaIzdavanja: formData.godinaIzdavanja,
      categories: formData.categories,
      genres: formData.genres,
      jezik: formData.jezik,
      brStrana: formData.brStrana,
      isbn: formData.isbn,
      pismo: formData.pismo,
      povez: formData.povez,
      format: formData.format,
      photo: formData.photo,
    };

    updateBookData(bookId, updatedBookData)
      .then((response) => {
        console.log("Book updated successfully:", response);
        navigate(`/books/${bookId}`);
      })
      .catch((error) => {
        console.error("Error updating book:", error);
      });
  };

  return (
    <div className="main-content  mt-24 ml-20 mr-5 flex flex-col">
      <div className="w-full">
        <h2 className="text-3xl font-semibold mb-4">Edit Book</h2>
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
                  name="izdavac"
                  value={formData.izdavac}
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
                  name="jezik"
                  value={formData.jezik}
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
                  name="pismo"
                  value={formData.pismo}
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
                  name="povez"
                  value={formData.povez}
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
                  name="format"
                  value={formData.format}
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
            <div>
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
              <div className="col-span-2 md:col-span-1 p-4 flex justify-center items-center">
                {formData.photo && (
                  <img
                    src="https://tim2.petardev.live/img/book-cover-placeholder.png"
                    alt="Selected"
                    className="mt-2 max-w-sm"
                  />
                )}
              </div>
            </div>
          </Tab>
        </form>
      </div>
      <div className="flex justify-end items-end mt-auto p-4 mb-8">
        <Submit type="submit" className="mr-2">
          Update
        </Submit>
        <Cancel onClick={() => navigate(`/books`)}>Cancel</Cancel>
      </div>
    </div>
  );
};

export default EditBook;
