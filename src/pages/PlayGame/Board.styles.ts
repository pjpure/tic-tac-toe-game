import styled from 'styled-components';
interface Props {
  size: number
  isTurn: boolean
}

export const Wrapper = styled.div<Props>`
  width: 100%;
  .header{
    display: flex;
    justify-content: space-between;
  }

  .logo{
  display: flex;
  align-items: start;
  justify-content: start;
  font-size:40px ;
  font-weight:500 ;
  height: 30px;
  }

  .turn{
  display: flex;
  justify-content: center;
  align-items: start;
  background-color: #1f3540;
  color: #a8bec9;
  font-size:20px ;
  font-weight:500 ;
  border-radius: 5px;
  padding: 10px;
  height:30px;
  width: 100px;
  }

  .reset{
  display: flex;
  justify-content: center;
  align-items: start;
  background-color: #a8bec9;
  color:#1f3540;
  font-size:30px ;
  border-radius: 5px;
  padding:10px ;
  height: 30px;
  cursor: pointer;
  }

  .board {
  margin-top:20px ;
  display: grid;
  grid-template-columns: repeat(${props => props.size}, 1fr);
  grid-gap: ${props => 20 * 4 / props.size}px;
}

.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1f3540;
  border-radius: 5px;
  padding: 10px;
  font-size: 50px;
  font-weight: 700;
  aspect-ratio: 1;
  cursor: ${props => props.isTurn ? 'pointer' : 'default'};
}

.cell:hover{
  background-color: ${props => props.isTurn ? '#304955' : '#1f3540'};
}

.footer{
  margin-top: 20px;
  display: flex;
  column-gap: 100px;
  justify-content: space-between;
  grid-gap: ${props => 20 * 4 / props.size}px;
}

.footer div{
  display: flex;
  justify-content: center;
  background-color: #1f3540;
  width: 30%;
  color: #a8bec9;
  font-size:20px ;
  font-weight:500 ;
  border-radius: 5px;
  padding: 10px;
  column-gap: 10px;
}

`;

