import { FC } from 'react';
import { ItemInCart } from '../../../../types';
import Container from '../../../shared/Container';
import { OrderItemCard, ProductName } from './style';

interface Props {
  item: ItemInCart;
}

const OrderConfirmListItem: FC<Props> = ({ item: { image, name, quantity } }) => (
  <OrderItemCard type="horizontal" image={image}>
    <Container data-testid="order-confirm-list-item">
      <ProductName>{name}</ProductName>
      <p>수량: {quantity}</p>
    </Container>
  </OrderItemCard>
);

export default OrderConfirmListItem;