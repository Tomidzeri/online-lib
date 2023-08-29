import React from "react";
import classes from "./users.module.css";
import { Link } from "react-router-dom";
import UserActionsDropdown from "../components/UI/UserActionsDropdown";
<<<<<<< HEAD
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
      student.lastLoggedTime,
      <UserActionsDropdown
        user={student}
        onDelete={() => handleDeleteUser(student.id)}
      />,
    ]);

  return (
    <div className={classes.users}>
      <h2>Students</h2>
      <Link to="/useraddform?role=Učenik" className={classes.addButton}>
        Novi Učenik
      </Link>

      <Table headers={tableHeaders} data={tableData} />
    </div>
  );
=======

const Students = ({ userProfile }) => {
    const [students, setStudents] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchStudents = async() => {
            try {
                const token = localStorage.getItem("token");
                const response = await libraryAPI.get("/users", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        role: "Učenik",
                    },
                });

                const studentList = response.data.data;
                setStudents(studentList);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };

        fetchStudents();
    }, [selectedUser]);

    const handleDeleteUser = (userId) => {
        const updatedStudents = students.filter((user) => user.id !== userId);
        setStudents(updatedStudents);
        setSelectedUser(null);
    };

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
        table >
        <
        thead >
        <
        tr >
        <
        th > ID < /th> <
        th > Name < /th> <
        th > Email < /th> <
        th > User Role < /th> <
        th > Last Logged < /th> <
        th > Actions < /th> <
        /tr> <
        /thead> <
        tbody > {
            students
            .filter((item) => item.role === "Učenik")
            .map((student) => ( <
                tr key = { student.id } >
                <
                td > { student.id } < /td> <
                td > { student.name } < /td> <
                td > { student.email } < /td> <
                td > { student.role } < /td> <
                td > { student.lastLoggedTime } < /td> <
                td > { /* Actions */ } <
                UserActionsDropdown user = { student }
                onDelete = {
                    () => handleDeleteUser(student.id) }
                /> <
                /td> <
                /tr>
            ))
        } <
        /tbody> <
        /table> <
        /div>
    );
>>>>>>> 022d0703b8ff49cc20f4229c0b2d601a7592e3ec
};

export default Students;