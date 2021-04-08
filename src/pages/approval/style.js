import styled from 'styled-components';

export const ApprovalWrapper = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 230px;
    right: 0;
    background: #eee;
`

export const DivideBox = styled.div`
    width: 500px;
    height: 350px;
    margin: 100px auto;
    background: #f6f5ff;
    padding-top: 20px;
    font-weight: 400;
    font-size: 1.2rem;
    box-shadow: 0 0 8px rgba(0, 0, 0, .1);
`
export const ChooseTitle = styled.div`
    margin-left: 95px;
    margin-top: 30px;
    height: 200px;
    line-height: 50px;
    font-weight: 400;
    font-size: 1.6rem;
    color: #626262;
`

export const ChoooseDropdown = styled.div`
    margin-left: 0;
    margin-top: 0px;
    height: 50px;
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

export const DirectText = styled.div`
    display: inline;
    color: #4183C4;
}
`