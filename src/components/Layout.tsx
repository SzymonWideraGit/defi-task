import { FC } from 'react';
import styled from 'styled-components';
import { Header } from './Header';
import { Menu } from './Menu';
import { Outlet } from 'react-router';
import { Box } from '@mui/material';

const Wrapper = styled.div`
    width: 100%;
    overflow-X: hidden;
`

export const Layout:FC = () => {
  return (
    <>
        <Header/>
        <Box sx={{display: 'flex', flexDirection: {sm: 'row', xs: 'column'}, height: 'calc(100vh - 135px)'}}>
            <Menu />
            <Wrapper>
                <Outlet/>
            </Wrapper>
        </Box>
    </>
  );
}

