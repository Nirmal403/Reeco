import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${props => props.primary ? 'blue' : 'gray'};
  color: white;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
`;


