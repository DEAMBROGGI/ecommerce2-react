import * as React from 'react';
import Grid from '@mui/material/Grid';
import FilterCard from './FilterCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import usePaginationFilter from "./PaginationFilter";
import { useState} from 'react';
import Box from '@mui/material/Box';
import {useStateValue} from '../StateProvider';

 const FilterPage = ({result})=>{
    const [{currentPage},dispatch] = useStateValue();
    let [page, setPage] = useState(1);
    const PER_PAGE = 6;
    const count = Math.ceil(result?.length / PER_PAGE);
    const _DATA =  usePaginationFilter({result}, PER_PAGE);

    const handleChange = (e, p) => { 
      setPage(p);
      _DATA.jump(p);
    
    };

     function FormFilterRow(){
    
      return(
          <React.Fragment>
              {  _DATA?.currentData().map((item)=>
                    
                    <Grid item xs={12} sm={6} md={6} lg={4}  width="100%" >
                        <FilterCard  key={item.id} productFiltered={item}/>
                    </Grid> 
                    )}
      </React.Fragment>
      );
       }

    return (
      
  <Stack  width="100%" >
      <Box sx={{ flexGrow: 1}}>
        <Grid container spacing={7} marginTop={1}  >

        <FormFilterRow/>          
  
        </Grid>
      </Box>
      
      <Pagination   sx={{display:"flex", justifyContent:"center", paddingY:4, hideNextButton:true,
      "& .MuiPaginationItem-root.Mui-selected": { backgroundColor:"white", color:"black", fontWeight:"bold", fontSize:27},
      "& .MuiPaginationItem-root.Mui-selected:hover": { backgroundColor:"white", color:"black", fontWeight:"bold", fontSize:27},
      "& .MuiButtonBase-root": { backgroundColor:"white", color:"gray", fontSize:27},
      "& .MuiPaginationItem-icon": { backgroundColor:"white", color:"black", fontWeight:"bold", fontSize:27},
      "& .MuiPaginationItem-root.Mui-disabled": { display:"none"},
    }}
            
            count={count}
            size="medium"
            page={currentPage}
            onChange={handleChange}
            
    />
      </Stack>
      
    );
    
  } 
  export default FilterPage;