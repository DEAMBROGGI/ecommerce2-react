import * as React from 'react';
import Grid from '@mui/material/Grid';
import FilterCard from './FilterCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import usePaginationFilter from "./PaginationFilter";
import { useState} from 'react';
import Box from '@mui/material/Box';

 const FilterPage = ({result})=>{

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
                    
                    <Grid item xs={12} sm={6} md={6} lg={4} width="100%" position="relative" >
                        <FilterCard  key={item.id} productFiltered={item}/>
                    </Grid> 
                    )}
      </React.Fragment>
      );
       }

    return (
      
  <Stack  width="100%" >
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} marginTop={1}  >

        <FormFilterRow/>          
  
        </Grid>
      </Box>
      
      <Pagination   sx={{display:"flex", justifyContent:"center" }}
            color="primary"
            count={count}
            size="large"
            page={page}
            onChange={handleChange}
    
    />
      </Stack>
      
    );
    
  } 
  export default FilterPage;