import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
const List = () => {
  const [tasks, setTasks] = useState(() => []);
  //fetching Data 
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tasks/list');
        console.log(response.data.taskes);
        setTasks(response.data.taskes);
      } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error);
      }
    };
    fetchTasks();
  }, []);
  
/*const handleDeleteClick = (TaskId) => {
  setTaskToDelete(TaskId);
  setShowDeleteModal(true);
};
const handleDeleteContact = async (TaskId) => {
  try {
    // Make the API call to delete the contact
    await axios.delete(http://localhost:3001/tasks/supprimer/${TaskId});
    // Handle success, e.g., update your contact list
    console.log('Tache supprimeé ');
    window.location.reload(); // Reload the entire page
  } catch (error) {
    // Handle error, show an error message, etc.
    console.error('Error deleting task', error);
  }
};
const handleCloseDeleteModal = () => {
  setShowDeleteModal(false);
  setContactIdToDelete(null);
};*/
   //updating Data 
 /*  const updateTask = async (id) => {
    try {
      // Specify the updated task object based on your requirements
      const updatedTaskData = {
        title: 'Updated Title', // Replace with the new title
        status: 'Updated Status', // Replace with the new status
        description: 'Updated Description', // Replace with the new description
      };

      await axios.put(http://localhost:5000/tasks/modifier/${id}, updatedTaskData);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };*/
//deleting Data 

  return (
    <div>
      <Table  bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Status</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
        {tasks.map((task,index) => (
              <tr key={task.index}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.createdAt}</td>
                <td>{task.status}</td>
                <td>
                 <i class="bi bi-pencil" style={{marginRight : '2%', color :'blue'}}></i>
                <i class="bi bi-trash3" 
                style={{marginLeft : '10%', color :'grey'}}
                >
                </i>
               
                </td>  
              </tr>
      
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default List;