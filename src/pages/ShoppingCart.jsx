import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Button, { BUTTON_TYPE } from '../components/button/Button';
import Checkbox from '../components/checkbox/Checkbox';
import PageTitle from '../components/pageTitle/PageTitle';
import PaymentAmount, { PAYMENT_AMOUNT_TYPE } from '../components/paymentAmount/PaymentAmount';
import SelectedProductList, { SELECTED_PRODUCT_LIST_TYPE } from '../components/selectedProductList/SelectedProductList';
import ShoppingCartItem from '../components/shoppingCartItem/ShoppingCartItem';
import { deleteCheckedShoppingCartList, toggleAllShoppingCartItem } from '../modules/shoppingCart';
import emptyCart from '../assets/empty-cart.png';
import { Link } from 'react-router-dom';

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  align-items: center;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
`;

const EmptyCartImage = styled.img`
  width: 50%;
`;

const EmptyCartText = styled.div`
  font-size: 20px;
  margin-top: 20px;
`;

const Content = styled.section`
  position: relative;
  display: flex;
  padding: 0 18px;
  gap: 100px;
`;

const ShoppingCartItemModification = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 26px;
`;

const PaymentAmountWrapper = styled.div`
  position: sticky;
  margin-top: 50px;
  top: 50px;
`;

const getExpectedPaymentAmount = (checkedShoppingCartList) =>
  checkedShoppingCartList.reduce((acc, cur) => acc + cur.price * cur.count, 0);

const ShoppingCart = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const isChecked = useSelector((state) => state.shoppingCart.isAllShoppingCartItemChecked);
  const shoppingCartList = useSelector((state) => state.shoppingCart.shoppingCartList);
  const checkedShoppingCartList = shoppingCartList.filter((item) => item.isChecked);

  const totalPrice = getExpectedPaymentAmount(checkedShoppingCartList);

  const handleAllShoppingCartItemToggle = () => {
    dispatch(toggleAllShoppingCartItem());
  };

  // TODO: custom confirm 다이얼로그 만들기
  const handleCheckedShoppingCartListDelete = () => {
    if (!window.confirm(`${checkedShoppingCartList.length}개의 상품을 삭제하시겠습니까?`)) return;

    checkedShoppingCartList.forEach(({ id }) =>
      fetch(`http://localhost:4000/shoppingCartList/${id}`, { method: 'DELETE' })
    );

    dispatch(deleteCheckedShoppingCartList());
  };

  const handleOrderPaymentPageRouter = () => {
    history.push('./orderPayment', {
      orderPaymentList: checkedShoppingCartList,
      totalPrice,
    });
  };

  if (!shoppingCartList.length) {
    return (
      <ImageWrapper>
        <EmptyCartImage src={emptyCart} alt="빈 장바구니" />
        <EmptyCartText>장바구니에 담긴 상품이 없습니다.</EmptyCartText>
        <Link to="./productList">
          <Button type={BUTTON_TYPE.MEDIUM} styles={{ fontWeight: 500, marginTop: '30px' }}>
            상품목록으로 가기
          </Button>
        </Link>
      </ImageWrapper>
    );
  }

  return (
    <>
      <PageTitle>장바구니</PageTitle>
      <Content>
        <>
          <div>
            <ShoppingCartItemModification>
              <Checkbox isChecked={isChecked} onChange={handleAllShoppingCartItemToggle}>
                {isChecked ? '선택해제' : '전체선택'}
              </Checkbox>
              <Button
                onClick={handleCheckedShoppingCartListDelete}
                type={BUTTON_TYPE.X_SMALL}
                disabled={!checkedShoppingCartList.length}
              >
                상품삭제
              </Button>
            </ShoppingCartItemModification>
            <SelectedProductList
              listType={SELECTED_PRODUCT_LIST_TYPE.SHOPPING_CART}
              productList={shoppingCartList}
              ListItem={ShoppingCartItem}
            />
          </div>
          <div>
            <PaymentAmountWrapper>
              <PaymentAmount
                type={PAYMENT_AMOUNT_TYPE.SHOPPING_CART}
                price={totalPrice}
                count={checkedShoppingCartList.length}
                onClick={handleOrderPaymentPageRouter}
              />
            </PaymentAmountWrapper>
          </div>
        </>
      </Content>
    </>
  );
};

export default ShoppingCart;
