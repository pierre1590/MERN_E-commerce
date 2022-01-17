import React from 'react'
import { Alert } from 'react-bootstrap'

const Messagge = ({variant, children}) => {
    return <Alert variant={variant}> {children}</Alert>  
}

Messagge.defaultProps = {
    variant: 'info',
}

export default Messagge
