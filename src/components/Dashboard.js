import AdminDashboard from './AdminDashboard'
import LibrarianDashboard from './LibrarianDashboard'
import StudentsDashboard from './StudentsDashboard'
function Dashboard({ userRole }) {
  return (
    <div>
      <h1>Dashboard</h1>
      {userRole === 1 && <AdminDashboard />}
      {userRole === 2 && <StudentsDashboard />}
      {userRole === 3 && <LibrarianDashboard />}
    </div>
  );
}

export default Dashboard;


