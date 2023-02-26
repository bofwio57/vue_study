import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

import CompStyle from '../containers/styled/CompStyle';
import CrudContainer from '../components/crud/CrudContainer';
import HomeContainer from '../containers/home/HomeContainer';
import TodoContainer from '../containers/todo/TodoContainer';

const StyledPageHome = styled.div`
  /* styled 설정. https://styled-components.com/docs/basics#adapting-based-on-props */
  .active {
    background-color: aqua;
  }
  .inactive {
    background-color: none;
  }
`;

function PageHome({ ...props }) {
  // ref 만들기.
  // const refInput = useRef();
  // JSX로 화면 만들기. 조건부 렌더링: https://ko.reactjs.org/docs/conditional-rendering.html
  return (
    <StyledPageHome>
      <div>
        <ul>
          <li>
            <NavLink to={''}>Home</NavLink>
          </li>
          <li>
            <NavLink to={'/style'}>Style</NavLink>
          </li>
          <li>
            <NavLink to={'/crud'}>Crud</NavLink>
          </li>
          <li>
            <NavLink to={'/todo'}>todo</NavLink>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="/style" element={<CompStyle />} />
        <Route path="/crud" element={<CrudContainer />} />
        <Route path="/todo" element={<TodoContainer />} />
        <Route path="/" element={<HomeContainer />} />
        <Route path="*" to={'/'} />
      </Routes>
    </StyledPageHome>
  );
}

PageHome.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
  // 인자명: PropTypes.arrayOf(PropTypes.object),
};
PageHome.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  // 인자명: [],
};

export default React.memo(PageHome); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
