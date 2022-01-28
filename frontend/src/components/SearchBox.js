import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap'
import{useNavigate} from 'react-router-dom'

const SearchBox = () => {
    const [keyword, setKeyword] = useState('')

    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword) {
            navigate(`/search/${keyword}`)
        } else {
            navigate('/')
        }
    }
    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control 
                type="text" 
                placeholder="Search products..." 
                value={keyword} 
                name='q'
                className='mr-sm-2 ml-sm-5'
                onChange={(e) => setKeyword(e.target.value)} />
            <Button 
                type="submit"  
                variant="outline-success"
                className='p-2'
                >
                    Search
                </Button>
        </Form>
    )

}

export default SearchBox