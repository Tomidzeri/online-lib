import React from "react";
import classes from "./users.module.css";
import { Link } from "react-router-dom";
import UserActionsDropdown from "../components/UI/UserActionsDropdown";
import Table from "../components/UI/tables/Table";
import useFetchStudents from "../queries/useFetchStudents";
const Students = ({ userProfile }) => {
    const { students, setStudents } = useFetchStudents();

    const handleDeleteUser = (userId) => {
        // Make an API call to delete the user
        // Update the state to remove the deleted user from the list
        const updatedStudents = students.filter((user) => user.id !== userId);
        setStudents(updatedStudents);
    };

    const tableHeaders = [
        "ID",
        "Name",
        "Email",
        "User Role",
        "Last Logged",
        "Actions",
    ];
    const tableData = students
        .filter((item) => item.role === "Učenik")
        .map((student) => [
            student.id,
            student.name,
            student.email,
            student.role,
            student.lastLoggedTime, <
            UserActionsDropdown
            user = { student }
            onDelete = {
                () => handleDeleteUser(student.id) }
            />,
        ]);

    return ( <
        div className = { classes.users } >
        <
        h2 className = { classes.h2 } > Students < /h2> <
        Link to = "/useraddform?role=Učenik"
        className = { classes.addButton } >
        <
        h3 className = { classes.h3 } > (Click here to add a new one) < /h3> <
        /Link>

        <
        Table headers = { tableHeaders }
        data = { tableData }
        /> <
        /div>
    );
};

export default Students;