import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import CommentForm from './CommentForm';

const Comments = ({ blog }) => {
  return (
    <>
      <h2>Comments</h2>
      <CommentForm id={blog.id} />

      <TableContainer>
        <Table>
          <TableBody>
            {blog.comments.map((comment, index) => (
              <TableRow key={index}>
                <TableCell>{comment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Comments;
