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

const StyledTodoList = styled.div`
  /* styled 설정. https://styled-components.com/docs/basics#adapting-based-on-props */

  ul {
    list-style-type: none;
    padding-left: 0px;
    margin-top: 0;
    text-align: left;
  }

  li {
    display: flex;
    min-height: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0.5rem 0;
    padding: 0 0.9rem;
    background: white;
    border-radius: 5px;
  }

  li.checked {
    background: #bbb;
    color: #fff;
    text-decoration: line-through;
  }

  .checkBtn {
    line-height: 45px;
    color: #62acde;
    margin-right: 5px;
  }

  .removeBtn {
    margin-left: auto;
    color: #de4343;
  }

  .list-enter-active,
  .list-leave-active {
    transition: all 1s;
  }

  .list-enter,
  .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
`;

function TodoList({ todoItems, callbackDoneToggle, callbackRemoveTodo }) {
  // useState 를 사용한 컴포넌트의 상태값 설정
  const [변수명, set변수명] = useState('기본값'); // 상태값이 기본타입인 경우
  const [state, setState] = useState({ id: 0, name: '', age: 0 }); // 상태값이 참조타입 경우

  // useReducer 를 사용한 컴포넌트의 상태값 설정. 리듀서는 현재 상태를 받아서 새 상태를 반환하는 함수다
  const [리듀서, set리듀서] = useReducer(
    (oldvalue, newvalue) => ({ ...oldvalue, ...newvalue }),
    { id: 0, name: '', age: 0 },
  ); // 리듀서(reducer) 방식의 상태값 설정

  // ref 만들기.
  // const refInput = useRef();

  // refIsMounted는 생명주기의 마운트와 업데이트를 구분하기 위한 ref
  const refIsMounted = useRef(false);
  useEffect(
    () => {
      if (refIsMounted.current) {
        // 업데이트 될 때마다 실행됨. 여러번. state 가 변경될 때마다
        // console.log('TodoList >> componentDidUpdate');
      } else {
        // 마운트 완료 후에 실행됨. 한번만. focus 줄때
        // console.log('TodoList >> componentDidMount');
        refIsMounted.current = true;
      }
      return () => {
        // 언마운트 직전에 한번만 실행됨.
        // console.log('TodoList >> componentWillUmount');
      };
    },
    [
      /* 연관배열: 메서드와 연관되는 상태(변수)명들을 기술 */
    ],
  );

  // callback 메서드 작성. callback 메서드는 부모의 공유 상태값을 변경하기 위해서 사용된다.
  const callback = useCallback(
    (param) => {
      // state 변경
    },
    [
      /* 연관배열: 콜백 메서드에서 변경하고자 하는 연관되는 상태(변수)명들을 기술 */
    ],
  );

  // 이벤트 핸들러 작성.
  const handlerDoneToggle = (e) => {
    // click 이벤트 취소. 버블링 방지
    const id = Number(e.target.dataset.id); // Number() : 문자열을 숫자로 변환
    const item = JSON.parse(e.target.dataset.item); // e.target.dataset.item 이 문자열이라서 JSON.parse를 사용해 객체로 변환해야함

    e.stopPropagation(); // click 이벤트 취소. 버블링 막기

    // 부모 컴포넌트의 콜백 메서드 callbackDoneToggle 호출
    callbackDoneToggle(id);
  };
  const handlerRemoveTodo = (e, id) => {
    // 부모 컴포넌트의 콜백 메서드 callbackRemoveTodo 호출
    callbackRemoveTodo(id);
  };
  // JSX로 화면 만들기. 조건부 렌더링: https://ko.reactjs.org/docs/conditional-rendering.html
  const lis =
    todoItems &&
    todoItems.length > 0 &&
    todoItems.map((item) => {
      // item === {id, todo, done}
      const checked = item.done ? 'checked' : null;
      return (
        <li
          className={checked}
          key={item.id}
          data-id={item.id}
          data-item={JSON.stringify(item)}
          onClick={handlerDoneToggle}
        >
          <i aria-hidden="true" className="checkBtn fas fa-check"></i>
          {item.todo}
          <span
            type="button"
            className="removeBtn"
            onClick={(e) => {
              e.stopPropagation(); // 이벤트 취소. 버블링 방지
              handlerRemoveTodo(e, item.id); // 부모 컴포넌트의 콜백 메서드 handlerRemoveTodo 호출 item.id는 숫자로 넘어감
              //인라인이벤트 핸들러는 형변환을 할 필요 없다 / 단, 자식들이 깊을때 로딩이 길어진다.
            }}
          >
            <i aria-hidden="true" className="far fa-trash-alt"></i>
          </span>
        </li>
      );
    });
  return (
    <StyledTodoList>
      <section>
        <ul>{lis}</ul>
      </section>
    </StyledTodoList>
  );
}

TodoList.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
  // 인자명: PropTypes.arrayOf(PropTypes.object),
  todoItems: PropTypes.arrayOf(PropTypes.object),
  callbackDoneToggle: PropTypes.func.isRequired,
  callbackRemoveTodo: PropTypes.func.isRequired,
};
TodoList.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  // 인자명: [],
  todoItems: [],
  callbackDoneToggle: () => {},
  callbackRemoveTodo: () => {},
};

export default React.memo(TodoList); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
