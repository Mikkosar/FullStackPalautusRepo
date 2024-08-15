const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  else if (message.includes('logged in')) {
    return (
      <div className="notification">
        {message}
      </div>
    );
  }

  else if (message.includes('logged out')) {
    return (
      <div className="notification">
        {message}
      </div>
    );
  }

  else if (message.includes('invalid username')) {
    return (
      <div className="errorNotification">
        {message}
      </div>
    );
  }

  else if (message.includes('blog added')) {
    return (
      <div className="notification">
        {message}
      </div>
    );
  }

  else if (message.includes('missing')) {
    return (
      <div className="errorNotification">
        {message}
      </div>
    );
  }

  else if (message.includes('liked')) {
    return (
      <div className="notification">
        {message}
      </div>
    );
  }

  else if (message.includes('like failed')) {
    return (
      <div className="errorNotification">
        {message}
      </div>
    );
  }

  else if (message.includes('was removed')) {
    return (
      <div className="notification">
        {message}
      </div>
    );
  }

  else if (message.includes('blog removal')) {
    return (
      <div className="errorNotification">
        {message}
      </div>
    );
  }
};

export default Notification;