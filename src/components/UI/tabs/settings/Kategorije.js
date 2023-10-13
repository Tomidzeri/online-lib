import React from "react";
import SettTable from "../../tables/SettingsTable";

const KategorijeTab = () => {
  const tableHeader = ["Naziv kategorije", "Opis"];
  const dataTable = [
    ["Hrana i pice", "Lorem ipsum dolor sit amet consectetur adipisicing elit"],
    ["Djecije knjige", "Lorem ipsum dolor sit amet consectetur adipisicing elit"],
    ["Istorija", "Lorem ipsum dolor sit amet consectetur adipisicing elit"],
    ["Skolske knjige", "Lorem ipsum dolor sit amet consectetur adipisicing elit"],
    ["Nauka, priroda i matematika", "Lorem ipsum dolor sit amet consectetur adipisicing elit"],
    ["Pravo", "Lorem ipsum dolor sit amet consectetur adipisicing elit"],
    ["Hrana i pice", "Lorem ipsum dolor sit amet consectetur adipisicing elit"],
  ];

  return (
    <div>
      <SettTable tableHeader={tableHeader} dataTable={dataTable} />
    </div>
  );
};

export default KategorijeTab;
