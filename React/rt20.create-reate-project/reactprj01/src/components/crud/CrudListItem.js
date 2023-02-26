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

const StyledCrudListItem = styled.tr`
  /* styled 설정. https://styled-components.com/docs/basics#adapting-based-on-props */
`;

function CrudListItem({
  item,
  callbackDel,
  callbackUp,
  callbackDown,
  callbackSave,
}) {
  // useState 를 사용한 컴포넌트의 상태값 설정
  const [isEditMode, setIsEditMode] = useState(false);

  // refIsMounted는 생명주기의 마운트와 업데이트를 구분하기 위한 ref
  const refIsMounted = useRef(false);
  useEffect(
    () => {
      if (refIsMounted.current) {
        // 업데이트 될 때마다 실행됨. 여러번. state 가 변경될 때마다
        // console.log('CrudListItem >> componentDidUpdate');
      } else {
        // 마운트 완료 후에 실행됨. 한번만. focus 줄때
        // console.log('CrudListItem >> componentDidMount');
        refIsMounted.current = true;
      }
      return () => {
        // 언마운트 직전에 한번만 실행됨.
        // console.log('CrudListItem >> componentWillUmount');
      };
    },
    [
      /* 연관배열: 메서드와 연관되는 상태(변수)명들을 기술 */
    ],
  );

  // ref 만들기.
  const refInputName = useRef();
  const refInputPower = useRef();

  // 이벤트 핸들러 작성.
  const handlerDel = (event) => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(event.target);
    callbackDel(item);
  };
  const handlerUp = (event) => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(event.target);
    callbackUp(item);
  };
  const handlerDown = (event) => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(event.target);
    callbackDown(item);
  };
  const handlerEdit = (event) => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(event.target);
    setIsEditMode(!isEditMode); // true => false, false => true
  };
  const handlerSave = (e) => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(e.target);
    //name 입력 여부 유효성 검사
    const name = refInputName.current.value;
    if (!name || !name.trim()) {
      //name 값이 없거나 스페이스만 친 경우(공백을 지웠을때 빈 문자열이면)
      alert('파워에 이름을 입력하세요');
      refInputName.current.focus(); //포커스 주기
      e.stopPropagation(); //이벤트 취소
      return false;
    }

    //power 입력 여부 유효성 검사
    const power = refInputPower.current.value;
    if (!power || !power.trim()) {
      alert('파워에 값을 입력하세요');
      refInputPower.current.focus(); //포커스 주기
      e.stopPropagation(); //이벤트 취소
      return false;
    }
    //Power의 입력값이 숫자인지 유효성 검사
    if (isNaN(Number(power))) {
      alert('파워에 숫자를 입력하세요');
      refInputPower.current.focus(); //포커스 주기
      e.stopPropagation(); //이벤트 취소
    }

    //새롭게 추가될 정보
    const newitem = {
      id: item.id,
      name: name,
      power: Number(power),
    };
    callbackSave(newitem);
    setIsEditMode(!isEditMode); // true => false, false => true
  };

  // JSX로 화면 만들기. 조건부 렌더링: https://ko.reactjs.org/docs/conditional-rendering.html
  let strong = '';
  if (item.power >= 300) strong = 'strong';

  const formView = (
    <StyledCrudListItem className={strong}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.power}</td>
      <td>
        <button type="button" onClick={handlerDel}>
          Del
        </button>
        <button type="button" onClick={handlerUp}>
          Power Up
        </button>
        <button type="button" onClick={handlerDown}>
          Power Down
        </button>
        <button type="button" onClick={handlerEdit}>
          Edit
        </button>
      </td>
    </StyledCrudListItem>
  );
  const formEdit = (
    <StyledCrudListItem className={strong}>
      <td>{item.id}</td>
      <td>
        <input
          type="text"
          name="name"
          placeholder="이름을 입력하세요"
          defaultValue={item.name}
          ref={refInputName}
        />
      </td>
      <td>
        <input
          type="number"
          name="power"
          placeholder="숫자를 입력하세요"
          defaultValue={item.power}
          ref={refInputPower}
        />
      </td>
      <td>
        <button type="button" onClick={handlerUp}>
          Power Up
        </button>
        <button type="button" onClick={handlerDown}>
          Power Down
        </button>
        <button type="button" onClick={handlerSave}>
          Save
        </button>
      </td>
    </StyledCrudListItem>
  );
  //CrudListItem.isEditMode  === true 이면 formEdit 리턴하고
  //                                  아니면 formView 리턴한다.
  if (isEditMode) return formEdit;
  else return formView;
}

CrudListItem.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
  // 인자명: PropTypes.arrayOf(PropTypes.object),
  item: PropTypes.object.isRequired,
};
CrudListItem.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  // 인자명: [],
  // 빈 객체: {},
  item: {},
};

export default React.memo(CrudListItem); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
