import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useReducer,
  Fragment,
  forwardRef,
  useImperativeHandle,
} from 'react';

import CompStyle from '../containers/styled/CompStyle';
import CrudContainer from '../components/crud/CrudContainer';
import HomeContainer from '../containers/home/HomeContainer';
import { Routes } from 'react-router';

function PageHome({ ...props }) {
  // ref 만들기.
  // const refInput = useRef();

  // JSX로 화면 만들기. 조건부 렌더링: https://ko.reactjs.org/docs/conditional-rendering.html
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route path="/crud" element={<CrudContainer />} />
      </Routes>
    </div>
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
