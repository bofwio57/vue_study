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
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useParams,
  useLocation,
  useHistory,
  useNavigate,
} from 'react-router-dom';
import CrudListItem from './CrudListItem';

const StyledCrudList = styled.div`
  /* styled 설정. https://styled-components.com/docs/basics#adapting-based-on-props */
`;
// items을 받는다
function CrudList({
  items,
  callbackDel,
  callbackUp,
  callbackDown,
  callbackSave,
}) {
  const arrs =
    items &&
    items.length > 0 &&
    items.map((item) => {
      return (
        <CrudListItem
          key={item.id}
          item={item}
          callbackDel={callbackDel}
          callbackUp={callbackUp}
          callbackDown={callbackDown}
          callbackSave={callbackSave}
        ></CrudListItem>
      );
    });
  // JSX로 화면 만들기. 조건부 렌더링: https://ko.reactjs.org/docs/conditional-rendering.html
  // item의 경우 앞에 있는 item을 다른곳에 적어야 한다 뒤에 item은 여기서 사용하는 아이템이다
  return (
    <StyledCrudList>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>POWER</th>
            <th>CRUD</th>
          </tr>
        </thead>
        <tbody>{arrs}</tbody>
      </table>
    </StyledCrudList>
  );
}

CrudList.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
  // 인자명: PropTypes.arrayOf(PropTypes.object),
  items: PropTypes.arrayOf(PropTypes.object),
  callbackDel: PropTypes.func.isRequired,
  callbackUp: PropTypes.func.isRequired,
  callbackDown: PropTypes.func.isRequired,
  callbackSave: PropTypes.func.isRequired,
};
CrudList.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  // 배열 인자명: [],
  items: [],
  callbackDel: () => {},
  callbackUp: () => {},
  callbackDown: () => {},
  callbackSave: () => {},
};

export default React.memo(CrudList); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
