import React, {useState,useEffect,useCallback} from 'react';
import {FormControl, InputGroup,   Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import { FaSearch } from 'react-icons/fa';

const SearchBox = () => {
    const [keyword, setKeyword] = useState('')

    const navigate = useNavigate()

    // if keyword is a string and not empty then navigate to search page, otherwise if the product is not found return a message to the user in a modal box
    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.length > 0){
            navigate(`/search/${keyword}`)
         } else {
           alert('Please, enter the product to search for')
         }
    }


    //handleChange 
    const handleChange = (e) => {
        setKeyword(e.target.value)
    } 


   
  

      return (
     <>
     
       <InputGroup className="mb-3 search-input" style={{marginLeft:'5%' }}>
         <FormControl
           type="search"
           placeholder="Search Products..."
           aria-label="searchProducts"
           aria-describedby="basic-addon2"
           value={keyword}
           onChange={handleChange}
         />
         <Button variant="secondary" id="button-addon2" onClick={submitHandler} >
           <FaSearch />
         </Button>
       </InputGroup>
     </>
   );
}

export default SearchBox


