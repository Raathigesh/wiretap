import styled from "styled-components";
export const CardContainer = styled.div`
  border: 0px solid;
  border-bottom: 1px solid #e4e4e4;
  &:first-of-type {
    ${props => (props.isSnapshot ? `
      margin-top: 20px;
    ` : '')}
  }
`;
export const ToggleHandler = styled.button`
  float: right;
  font-size: 0.5rem;
  margin-left: 5px;
`;
export const CardHeader = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 12px;
  padding-left: 17px;
`;
export const CardTitle = styled.div`float: left;`;
export const Order = styled.mark`
  padding: 4px;
  margin-right: 5px;
`;
