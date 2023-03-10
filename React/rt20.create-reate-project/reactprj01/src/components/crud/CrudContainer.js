import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import CrudInput from './CrudInput';
import CrudList from './CrudList';

const StyledCrudContainer = styled.div`
  /* styled 설정. https://styled-components.com/docs/basics#adapting-based-on-props */
  .strong {
    color: red;
    font-weight: bold;
    font-size: 1.2em;
  }
  label {
    display: inline-block;
    width: 80px;
  }
  #app > div {
    margin: 5px 0;
  }
`;

function CrudContainer({ ...props }) {
  // useState 를 사용한 컴포넌트의 상태값 설정
  // 배열 타입인 경우
  const [items, setItems] = useState([
    { id: 1, name: '슈퍼맨', power: 100 },
    { id: 2, name: '아쿠아맨', power: 300 },
    { id: 3, name: '스파이더맨', power: 500 },
    { id: 4, name: '배트맨', power: 30 },
  ]);

  // callback 메서드 작성. callback 메서드는 부모의 공유 상태값을 변경하기 위해서 사용된다.
  const callbackDel = useCallback(
    (item) => {
      // items 배열에서 삭제. Array.filter() 를 사용한다
      // ...생략
      const newItems =
        items &&
        items.length > 0 &&
        items.filter((obj) => {
          if (obj.id === item.id) {
            return false;
          }
          return true;
        });
      setItems(newItems); //삭제된 새로운 배열
    },
    [
      /* 메서드와 연관되는 상태(변수)명들을 기술 */
      items,
    ],
  );

  const callbackUp = useCallback(
    (item) => {
      //100씩 증가. Array.map() 을 사용한다
      // item.power = item.power + 100;
      const newItems =
        items &&
        items.length > 0 &&
        items.filter((obj) => {
          if (obj.id === item.id) {
            obj.power = obj.power + 100;
          }
          return obj;
        });
      setItems(newItems); //삭제된 새로운 배열
    },
    [
      /* 메서드와 연관되는 상태(변수)명들을 기술 */
      items,
    ],
  );

  const callbackDown = useCallback(
    (item) => {
      // 50씩 감소.  Array.map() 을 사용한다
      // item.power = item.power - 50;
      const newItems =
        items &&
        items.length > 0 &&
        items.filter((obj) => {
          if (obj.id === item.id) {
            obj.power = obj.power - 50;
          }
          return obj;
        });
      setItems(newItems); //삭제된 새로운 배열
    },
    [
      /* 메서드와 연관되는 상태(변수)명들을 기술 */
      items,
    ],
  );

  const callbackSave = useCallback(
    (newitem) => {
      debugger;
      // newitem 으로 바뀐 새로운 배열 만들기.
      // Array.map() 을 사용
      const newItems =
        items &&
        items.length > 0 &&
        items.map((item) => {
          if (item.id === newitem.id) {
            return newitem;
          }
          return item;
        });
      setItems(newItems); // items = newItems;
    },
    [
      /* 메서드와 연관되는 상태(변수)명들을 기술 */
      items,
    ],
  );

  const callbackAdd = useCallback(
    (newitem) => {
      // items에서 최대 id 값을 구하는 방법.
      // 방법1. items.map()과 items.reduce()를 사용하여 max id를 찾는 방법
      let maxid = 0;
      if (items.length > 0) {
        maxid = items
          .map((item) => item.id)
          .reduce((pvalue, cvalue) => (pvalue >= cvalue ? pvalue : cvalue), -1);
      } else {
        maxid = 0;
      }
      const newid = maxid + 1;

      // param 에  id값 추가
      newitem.id = newid;

      // items.push(newitem);
      setItems([...items, newitem]); //기존 +  새로운값 = 새로운 배열을 만든다
    },
    [
      /* 메서드와 연관되는 상태(변수)명들을 기술 */
      items,
    ],
  );

  // 이벤트 핸들러 작성.
  const handler = (e) => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(e.target);
  };

  // JSX로 화면 만들기. 조건부 렌더링: https://ko.reactjs.org/docs/conditional-rendering.html
  return (
    <StyledCrudContainer>
      <div id="app">
        <h1>Creat Read Update Delete</h1>
        <CrudInput callbackAdd={callbackAdd}></CrudInput>
        <hr />
        <CrudList
          items={items}
          callbackDel={callbackDel}
          callbackUp={callbackUp}
          callbackDown={callbackDown}
          callbackSave={callbackSave}
        ></CrudList>
      </div>
    </StyledCrudContainer>
  );
}

CrudContainer.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
  // 인자명: PropTypes.arrayOf(PropTypes.object),
  callbackDel: PropTypes.func.isRequired,
  callbackUp: PropTypes.func.isRequired,
  callbackDown: PropTypes.func.isRequired,
  callbackSave: PropTypes.func.isRequired,
};
CrudContainer.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  // 인자명: [],
  callbackDel: () => {},
  callbackUp: () => {},
  callbackDown: () => {},
  callbackSave: () => {},
};

export default React.memo(CrudContainer); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
