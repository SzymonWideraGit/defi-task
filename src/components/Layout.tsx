import { FC } from 'react';
import styled from 'styled-components';
import { Header } from './Header';
import { Menu } from './Menu';
import { Outlet } from 'react-router';


const Wrapper = styled.div`
    width: 100%;
    overflow-X: hidden;
`
const Content = styled.div`
    display: flex;
    height: calc(100vh - 135px);
`;



export const Layout:FC = () => {
  return (
    <>
        <Header/>
        <Content>
            <Menu />
            <Wrapper>
                <Outlet/>
            </Wrapper>
        </Content>
    </>
  );
}

