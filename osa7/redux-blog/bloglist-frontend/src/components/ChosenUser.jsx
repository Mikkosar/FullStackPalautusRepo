import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';

const ChosenUser = () => {
  const users = useSelector((state) => state.allUsers);
  const userById = (id) => users.find((u) => u.id === id);

  const match = useMatch('/users/:id');
  const chosenUser = match ? userById(match.params.id) : null;

  if (!chosenUser) {
    return <p>User not found</p>;
  }

  return (
    <>
      <h1>{chosenUser.name}</h1>
      <p>Blogs created:</p>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chosenUser.blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>{blog.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ChosenUser;
