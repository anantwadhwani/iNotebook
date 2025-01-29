import React from 'react'

const Alert = (props) => {
    const { alert } = props;
    return (
        <div className={`alert alert-${alert.type}`} style={{height: '3.5rem'}} role="alert">
            {alert.message}
        </div>
    )
}

export default Alert
