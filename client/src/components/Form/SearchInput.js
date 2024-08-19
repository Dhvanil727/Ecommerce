import React from 'react'
import { useSearch } from '../../context/Search'
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

const SearchInput = () => {
    const [values,setvalues]=useSearch();
    const navigate=useNavigate();
    const handlesubmit=async(e)=>{
        e.preventDefault();
try {
    const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/products/search/${values.keyword}`)
    setvalues({...values,results:data})
    navigate('/search');
} catch (error) {
    console.log(error);
}
    }
  return (
    <div>
        <form className="d-flex" role="search" onSubmit={handlesubmit}>
  <input 
  className="form-control me-2" 
  type="search"
   placeholder="Search" 
   aria-label="Search"
   value={values.keyword}
   onChange={(e)=>setvalues({...values,keyword:e.target.value})}
   />
  <button className="btn btn-outline-success" type="submit">Search</button>
</form>

    </div>
  )
}

export default SearchInput