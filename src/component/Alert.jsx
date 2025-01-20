import React from 'react'

const Alert = (props) => {
    const { message } = props;
    return (
        <div className="alert alert-primary" role="alert">
           Check this {message} out!
        </div>
    )
}

export default Alert
