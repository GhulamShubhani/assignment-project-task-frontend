import logo from './logo.svg';
import './App.css';


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Component/Layout';

import SignIn from './Page/SignIn';
import SignUp from './Page/SignUp';
import Home from './Page/Home';
import ProjectDetailsPage from './Page/ProjectDetailsPage';
import EditProject from './Component/Project/EditProject';
import Task from './Page/Task';
import TaskDetailsPage from './Component/Task/TaskDetailsPage';
import EditTask from './Component/Task/EditTask';


function App() {
  return (
    <BrowserRouter>
      <Routes>
       
          <Route path="/" element={<Layout children={<Home />}  />} />
          <Route path="/projectdetailspage" element={<Layout children={<ProjectDetailsPage />}  />} />
          <Route path="/taskdetailspage" element={<Layout children={<TaskDetailsPage />}  />} />
          <Route path="/edit-project" element={<Layout children={<EditProject />}  />} />
          <Route path="//edit-task" element={<Layout children={<EditTask/>}  />} />
          <Route path="/task" element={<Layout children={<Task />}  />} />
          <Route path="/signin" element={<SignIn />}  />
          <Route path="/signup" element={<SignUp />} />
          
          {/* <Route path="/project-page" element={<ProjectsPage />} /> */}
          {/* <Route path="*" element={<NoPage />} /> */}
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
