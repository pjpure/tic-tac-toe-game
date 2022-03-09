import styled from 'styled-components';
interface Props {
  size: number
  side: number;
}

export const BoardWrapper = styled.div<Props>`
  .board {
  display: grid;
  grid-template-columns: repeat(${props => props.size}, 1fr);
  grid-gap: 20px;
  color: aliceblue;
}

.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1f3540;
  border-radius: 5px;
  padding: 10px;
  font-size: ${props => props.side / 2}px;
  font-weight: 700;
  height: ${props => props.side}px ;
  width: ${props => props.side}px;
  cursor: pointer;
}

`;

