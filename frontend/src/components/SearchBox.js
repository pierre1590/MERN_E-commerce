import React, {useState} from 'react';
import {Form,  Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import { FaSearch } from 'react-icons/fa';

const SearchBox = () => {
    const [keyword, setKeyword] = useState('')

    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            navigate(`/search/${keyword}`)
        } else {
            navigate('/')
        }
    }
      
   return (
       <>
         {/*Text and button on the same line */}
            <Form inline onSubmit={submitHandler}>
                <Form.Control 
                    type="text" 
                    placeholder="Search products..." 
                    className="mr-sm-2"
                    value={keyword} 
                    onChange={(e) => setKeyword(e.target.value)}/>
                <Button variant="success" type='submit'>
                    <FaSearch />
                </Button>
            </Form>
       </>
   )
}

export default SearchBox