import styled from 'styled-components'

const Wrapper = styled.div`
  .pagination {
    display: flex;
    list-style: none;
  }
  .pagination-item {
    padding: 5px;
    margin: 2px;
    border: lightgray 1px solid;
    width: 35px;
    text-align: center;
    border-radius: 5px;
  }

  .pagination-item:hover {
    cursor: pointer;
    background-color: #E2E8F0;
  }

  .pagination-item-active {
    color: teal;
    font-weight: 500;
  }
`

export default Wrapper
