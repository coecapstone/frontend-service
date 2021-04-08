import styled from 'styled-components';

export const ContentWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 229px;
    right: 0;
    padding: 20px 30px 30px 30px;
    border-left: 1px solid grey;
`
export const TableWrapper = styled.div`
    height: 100%;
`

export const DirectText = styled.div`
    display: inline;
    color: #4183C4;
    cursor: pointer;
}
`

export const Nav = styled.div`
    position: absolute;
    top: 162px;
    width: 220px;
    height: 100%;
    margin: 0 auto;
    border-right: 1px solid grey;
    margin-left: 10px;
`

export const GroupHeader = styled.div`
    width: 220px;
    line-height: 40px;
    font-weight: 200;
    font-size: 1rem;
    padding-left: 15px;
    border-right: 1px solid grey;
    color: #95949c;
    cursor: default;
`

export const NavItem = styled.div`
    width: 220px;
    line-height: 40px;
    padding: 10px 0;
    color: #626262;
    font-weight: 400;
    font-size: 1.2rem;
    cursor: pointer;
    border-right: 1px solid grey;
    background-color: #f6f5ff;    
    &:hover {
        background-color: #d1ccff;
    }
`