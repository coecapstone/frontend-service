import styled from 'styled-components';
import logoPic from '../../statics/favicon.png';

export const HeaderWrapper = styled.div`
    position: absolute;
    float: left;
    height: 100%;
    left: 0;
    top: 0;
    width: 230px;
`
export const Logo = styled.a`
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 222px;
    height: 60px;
    background: url(${logoPic});
    background-size: contain;
    border-right: 1px solid grey;
    margin-left: 8px;
`

export const Nav = styled.div`
    position: absolute;
    top: 60px;
    width: 220px;
    height: 100%;
    margin: 0 auto;
    border-right: 1px solid grey;
    margin-left: 10px;
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