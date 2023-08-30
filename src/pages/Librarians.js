import React from "react";
import classes from "./users.module.css";
import { Link } from "react-router-dom";
import UserActionsDropdown from "../components/UI/UserActionsDropdown";
import Table from "../components/UI/tables/Table";
import useFetchLibrarians from "../queries/useFetchLibrarians";

const Librarians = ({ userProfile }) => {
    const { librarians, setLibrarians } = useFetchLibrarians();

    const handleDeleteUser = (userId) => {
        const updatedLibrarians = librarians.filter((user) => user.id !== userId);
        setLibrarians(updatedLibrarians);
    };

    const tableHeaders = [
        "ID",
        "Name",
        "Email",
        "User Role",
        "Last Logged",
        "Actions",
    ];
    const tableData = librarians
        .filter((item) => item.role === "Bibliotekar")
        .map((librarian) => [
            librarian.id,
            `${librarian.name} ${librarian.surname}`,
            librarian.email,
            librarian.role,
            librarian.lastLoggedTime, <
            UserActionsDropdown
            user = { librarian }
            onDelete = {
                () => handleDeleteUser(librarian.id) }
            />,
        ]);

    return ( <
        div className = { classes.users } >
        <
        h2 className = { classes.h2 } > Librarians < /h2> <
        Link to = "/useraddform?role=Bibliotekar"
        className = { classes.addButton } >
        <
        h3 className = { classes.h3 } > (Click here to add a new one) < /h3> <
        /Link> <
        Table headers = { tableHeaders }
        data = { tableData }
        /> <
        /div>
    );
};

export default Librarians;