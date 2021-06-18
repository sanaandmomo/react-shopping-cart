import { useState, VFC } from 'react';
import useCart from '../../../service/hooks/useCart';
import Checkbox from '../../shared/Checkbox';
import ShoppingCartSection from './ShoppingCartSection';
import {
  ShoppingCartItemListContainer,
  SelectedItemDeleteButton,
  CartSelectContainer,
} from './style';

const ShoppingCartSectionList: VFC = () => {
  const [checked, setChecked] = useState(false);
  const { changeAllChecked, deleteCheckedItems, cartItems } = useCart();

  const onChangeCheckAll = () => {
    const negatedChecked = !checked;

    changeAllChecked(negatedChecked);
    setChecked(negatedChecked);
  };

  return (
    <ShoppingCartItemListContainer>
      <CartSelectContainer>
        <Checkbox
          description={checked ? '선택해제' : '전체선택'}
          checked={checked}
          onChange={onChangeCheckAll}
        />
        <SelectedItemDeleteButton type="button" onClick={() => deleteCheckedItems(cartItems)}>
          상품삭제
        </SelectedItemDeleteButton>
      </CartSelectContainer>
      <ShoppingCartSection title="든든배송" items={cartItems} />
    </ShoppingCartItemListContainer>
  );
};

export default ShoppingCartSectionList;