import { useDispatch, useSelector } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer';

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification);

  if (notification) {
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  return (
    <>
      {notification && (
        <div style={style}>
          {notification}
        </div>
      )}
    </>
  )
}

export default Notification